/**
 * ProLingo: Application State & Multi-User Manager
 * Handles multi-user accounts, Google sign-in, per-account progress persistence,
 * 100-unit progression, hearts, streak, gems, leagues, and server synchronization.
 */

const REGISTRY_KEY = 'prolingo_users_registry_v6';
const ACTIVE_USER_ID_KEY = 'prolingo_active_user_id_v6';
const STATE_PREFIX = 'prolingo_state_user_v6_';

function createFreshUserState(options = {}) {
  const userId = options.id || ('usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5));
  const isGoogle = Boolean(options.isGoogle);
  const isRegistered = Boolean(options.isRegistered !== undefined ? options.isRegistered : isGoogle);
  const name = options.name || (isGoogle ? 'Google User' : 'مستخدم جديد');
  const email = options.email || (isGoogle ? 'user@gmail.com' : '');
  const avatar = options.avatar || 'classic';
  const avatarImage = options.avatarImage || null;

  return {
    id: userId,
    profile: {
      id: userId,
      name: name,
      email: email,
      avatar: avatar, // classic, cyber, wizard, hacker
      avatarImage: avatarImage, // base64 Data URL for custom uploaded photos
      isGoogle: isGoogle,
      isRegistered: isRegistered,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      bio: options.bio || 'Mastering Python on ProLingo! 🚀',
      following: ['sarah_cpp', 'tariq_js', 'kareem_py', 'byte_owl'],
      followersCount: 0
    },
    settings: {
      uiLang: 'ar', // Arabic by default as requested
      theme: 'dark', // 'dark' | 'light'
      soundEnabled: true,
      hapticsEnabled: true,
      codeEditorTheme: 'dracula'
    },
    currentCourse: 'python',
    activeSection: 1, // Section 1: Units 1-20
    stats: {
      xp: 0, // Starts from 0
      streak: 0, // Starts from 0
      longestStreak: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
      streakDays: [false, false, false, false, false, false, false],
      gems: 50, // 50 welcome gems
      hearts: 5,
      maxHearts: 5,
      unlimitedHeartsUntil: null,
      lastHeartLostTime: null,
      questionsSolved: 0,
      totalLessonsCompleted: 0,
      accuracySum: 0,
      accuracyCount: 0,
      top3Finishes: 0
    },
    league: {
      tierIndex: 0, // Bronze League! Starts from zero!
      weeklyXp: 0,
      weekEndsTimestamp: Date.now() + 6 * 24 * 3600 * 1000,
      competitors: []
    },
    inventory: {
      streakFreeze: 0,
      streakFreezeActive: false,
      doubleOrNothing: false,
      doubleOrNothingDays: 0,
      unlimitedHearts: false,
      skins: ['classic'],
      activeSkin: 'classic',
      themes: ['default'],
      activeTheme: 'default'
    },
    completedLessons: {
      python: [] // Starts completely from scratch! Unit 1 Lesson 1 is the first unlocked!
    },
    dailyQuests: [
      { id: 'q1', titleKey: 'Earn 20 XP today', target: 20, current: 0, rewardGems: 15, claimed: false },
      { id: 'q2', titleKey: 'Complete your first lesson', target: 1, current: 0, rewardGems: 20, claimed: false },
      { id: 'q3', titleKey: 'Score 90%+ in 1 lesson', target: 1, current: 0, rewardGems: 25, claimed: false }
    ],
    monthlyQuest: {
      target: 30,
      current: 0,
      badgeName: 'Python Master'
    },
    mistakeQuestions: []
  };
}

const ProLingoState = {
  data: null,
  activeUserId: null,

  init() {
    this.cleanLegacyStorage();
    this.ensureActiveUser();
    this.load();
    this.ensureCompetitors();
    this.checkHeartRegen();
    this.checkStreak();
    this.save();
  },

  cleanLegacyStorage() {
    try {
      const legacyKeys = [
        'prolingo_users_registry_v4', 'prolingo_active_user_id_v4',
        'prolingo_users_registry_v5', 'prolingo_active_user_id_v5',
        'prolingo_state', 'prolingo_user'
      ];
      legacyKeys.forEach(k => localStorage.removeItem(k));
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith('prolingo_state_user_') && !k.startsWith(STATE_PREFIX)) {
          localStorage.removeItem(k);
        }
      });
      // Purge any example or legacy accounts (Alex, Pythonista, Learner) from registry
      const reg = this.getUsersRegistry();
      if (reg && reg.length > 0) {
        const cleanReg = reg.filter(u => u.name !== 'Learner' && u.name !== 'Alex' && u.name !== 'Pythonista' && u.name !== 'Omar');
        if (cleanReg.length !== reg.length) {
          this.saveUsersRegistry(cleanReg);
        }
      }
    } catch (e) {}
  },

  // Multi-user registry management
  getUsersRegistry() {
    try {
      const reg = localStorage.getItem(REGISTRY_KEY);
      return reg ? JSON.parse(reg) : [];
    } catch (e) {
      return [];
    }
  },

  saveUsersRegistry(registry) {
    try {
      localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
    } catch (e) {
      console.warn('Failed to save user registry', e);
    }
  },

  registerUserInIndex(userData) {
    if (!userData || !userData.profile || !userData.profile.isRegistered) {
      return; // Do NOT store unauthenticated guest as a saved/example account!
    }
    const registry = this.getUsersRegistry();
    const idx = registry.findIndex(u => u.id === userData.id);
    const summary = {
      id: userData.id,
      name: userData.profile.name,
      email: userData.profile.email,
      avatar: userData.profile.avatar,
      avatarImage: userData.profile.avatarImage,
      isGoogle: userData.profile.isGoogle,
      xp: userData.stats.xp,
      streak: userData.stats.streak,
      lastActive: new Date().toISOString()
    };

    if (idx >= 0) {
      registry[idx] = summary;
    } else {
      registry.push(summary);
    }
    this.saveUsersRegistry(registry);
  },

  removeUserFromRegistry(userId) {
    let registry = this.getUsersRegistry();
    registry = registry.filter(u => u.id !== userId);
    this.saveUsersRegistry(registry);
    try {
      localStorage.removeItem(STATE_PREFIX + userId);
    } catch (e) {}

    if (this.activeUserId === userId) {
      if (registry.length > 0) {
        this.switchAccount(registry[0].id);
      } else {
        const fresh = createFreshUserState({ isRegistered: false });
        this.activeUserId = fresh.id;
        localStorage.setItem(ACTIVE_USER_ID_KEY, fresh.id);
        localStorage.setItem(STATE_PREFIX + fresh.id, JSON.stringify(fresh));
        this.data = fresh;
        this.save();
        window.location.reload();
      }
    }
  },

  clearAllSavedAccounts() {
    try {
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith('prolingo_')) {
          localStorage.removeItem(k);
        }
      });
    } catch (e) {
      console.warn('Clear accounts error:', e);
    }
    this.ensureActiveUser();
    this.load();
    window.location.reload();
  },

  ensureActiveUser() {
    let currentId = localStorage.getItem(ACTIVE_USER_ID_KEY);
    const registry = this.getUsersRegistry();

    if (!currentId) {
      if (registry.length > 0) {
        currentId = registry[0].id;
      } else {
        // First time launch: local guest starting from 0, not stored in registry
        const freshUser = createFreshUserState({ isRegistered: false });
        currentId = freshUser.id;
        localStorage.setItem(ACTIVE_USER_ID_KEY, currentId);
        localStorage.setItem(STATE_PREFIX + currentId, JSON.stringify(freshUser));
      }
    }

    this.activeUserId = currentId;
  },

  load() {
    try {
      const stored = localStorage.getItem(STATE_PREFIX + this.activeUserId);
      if (stored) {
        const parsed = JSON.parse(stored);
        const template = createFreshUserState({ id: this.activeUserId });
        this.data = this.deepMerge(template, parsed);
      } else {
        this.data = createFreshUserState({ id: this.activeUserId });
      }
    } catch (e) {
      console.warn('Error loading active user, using fresh state:', e);
      this.data = createFreshUserState({ id: this.activeUserId });
    }

    this.registerUserInIndex(this.data);
    this.fetchFromServer();
  },

  save() {
    if (!this.data) return;
    try {
      localStorage.setItem(STATE_PREFIX + this.activeUserId, JSON.stringify(this.data));
      this.registerUserInIndex(this.data);
    } catch (e) {
      console.warn('Storage save error:', e);
    }
    this.saveToServer();
    window.dispatchEvent(new CustomEvent('stateUpdated', { detail: this.data }));
  },

  async fetchFromServer() {
    try {
      const res = await fetch(`/api/user?id=${encodeURIComponent(this.activeUserId)}`);
      if (res.ok) {
        const serverData = await res.json();
        if (serverData && serverData.stats && serverData.id === this.activeUserId) {
          this.data = this.deepMerge(this.data, serverData);
          localStorage.setItem(STATE_PREFIX + this.activeUserId, JSON.stringify(this.data));
          window.dispatchEvent(new CustomEvent('stateUpdated', { detail: this.data }));
        }
      }
    } catch (e) {
      // Offline mode - perfectly fine
    }
  },

  async saveToServer() {
    try {
      await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.data)
      });
    } catch (e) {
      // Offline mode - ignore
    }
  },

  // Switch to another account
  switchAccount(userId) {
    if (!userId || userId === this.activeUserId) return;
    this.save();
    this.activeUserId = userId;
    localStorage.setItem(ACTIVE_USER_ID_KEY, userId);
    this.load();
    this.ensureCompetitors();
    this.checkHeartRegen();
    this.checkStreak();
    window.App.renderHeaderStats();
    window.App.renderCurrentView();
  },

  // Create brand new account starting from zero
  createNewAccount(name = 'مستخدم جديد', isGoogle = false, email = '', avatarImage = null) {
    this.save();
    const freshUser = createFreshUserState({
      name: name,
      isGoogle: isGoogle,
      isRegistered: true,
      email: email,
      avatarImage: avatarImage
    });
    this.activeUserId = freshUser.id;
    localStorage.setItem(ACTIVE_USER_ID_KEY, freshUser.id);
    localStorage.setItem(STATE_PREFIX + freshUser.id, JSON.stringify(freshUser));
    this.registerUserInIndex(freshUser);
    this.data = freshUser;
    this.ensureCompetitors();
    this.save();

    window.App.renderHeaderStats();
    window.App.renderCurrentView();
    return freshUser;
  },

  // Google Sign-In handler
  loginWithGoogle(googleProfile) {
    const { name, email, avatarImage } = googleProfile;
    const registry = this.getUsersRegistry();
    
    // Check if user with this email already exists
    const existing = registry.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
    
    if (existing) {
      // Load existing account with all preserved progress!
      this.switchAccount(existing.id);
      if (avatarImage) {
        this.data.profile.avatarImage = avatarImage;
      }
      this.data.profile.isGoogle = true;
      this.data.profile.isRegistered = true;
      this.save();
    } else {
      // Brand new Google user starts from zero!
      this.createNewAccount(name || 'Google User', true, email, avatarImage);
    }

    if (window.SoundEngine) SoundEngine.playVictory();
  },

  ACCOUNTS_KEY: 'prolingo_accounts_db_v6',

  getStoredAccounts() {
    try {
      const data = localStorage.getItem(this.ACCOUNTS_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  saveStoredAccounts(accounts) {
    try {
      localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(accounts));
    } catch (e) {}
  },

  async hashPassword(password) {
    try {
      if (typeof crypto !== 'undefined' && crypto.subtle) {
        const msgBuffer = new TextEncoder().encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) {}
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      hash = ((hash << 5) - hash) + password.charCodeAt(i);
      hash |= 0;
    }
    return 'h_' + Math.abs(hash).toString(16);
  },

  // 1. Create account with password & send Gmail confirmation code
  async createAccountWithPassword({ name, email, password }) {
    name = (name || '').trim();
    email = (email || '').trim().toLowerCase();
    password = (password || '');

    if (!email || !password) {
      return { success: false, error: 'البريد الإلكتروني وكلمة المرور مطلوبان' };
    }
    if (password.length < 6) {
      return { success: false, error: 'كلمة المرور يجب ألا تقل عن 6 أحرف' };
    }

    const accounts = this.getStoredAccounts();
    if (accounts[email] && accounts[email].isVerified) {
      return { success: false, error: 'هذا الحساب مسجل ومؤكد بالفعل! يرجى تسجيل الدخول مباشرة.' };
    }

    // Try server first if available
    let serverCode = null;
    let userId = null;
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          serverCode = json.code;
          userId = json.userId;
        }
      }
    } catch (e) {}

    // Generate local 6-digit verification code
    const code = serverCode || (Math.floor(100000 + Math.random() * 900000).toString());
    const pwHash = await this.hashPassword(password);
    userId = userId || (accounts[email] && accounts[email].id) || ('usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5));

    accounts[email] = {
      id: userId,
      name: name || email.split('@')[0],
      email: email,
      passwordHash: pwHash,
      code: code,
      isVerified: false,
      createdAt: Date.now()
    };
    this.saveStoredAccounts(accounts);

    return {
      success: true,
      email: email,
      code: code,
      message: `تم إرسال رمز تأكيد فوري إلى بريدك في Gmail (${email})`
    };
  },

  // 2. Verify 6-digit confirmation code
  async verifyAccountCode(email, code) {
    email = (email || '').trim().toLowerCase();
    code = (code || '').trim().replace(/\s+/g, '');

    const accounts = this.getStoredAccounts();
    const localAcc = accounts[email];

    // Try server verification if available
    let serverSuccess = false;
    let serverUser = null;
    let serverState = null;
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          serverSuccess = true;
          serverUser = json.user;
          serverState = json.state;
        }
      }
    } catch (e) {}

    if (!serverSuccess) {
      if (!localAcc) {
        return { success: false, error: 'لم يتم العثور على حساب بهذا البريد' };
      }
      if (localAcc.code !== code) {
        return { success: false, error: 'رمز التأكيد غير صحيح! يرجى التحقق من رسالة Gmail' };
      }
    }

    // Mark as verified
    if (localAcc) {
      localAcc.isVerified = true;
      this.saveStoredAccounts(accounts);
    }

    const userId = (serverUser && serverUser.id) || (localAcc && localAcc.id) || ('usr_' + Date.now().toString(36));
    const userName = (serverUser && serverUser.name) || (localAcc && localAcc.name) || email.split('@')[0];

    // Check if user state already exists
    let existingState = null;
    try {
      const stored = localStorage.getItem(STATE_PREFIX + userId);
      if (stored) existingState = JSON.parse(stored);
    } catch (e) {}

    let userState = existingState || serverState;
    if (!userState) {
      // Check if current guest session has progress that can be claimed!
      if (this.data && this.data.stats && (this.data.stats.xp > 0 || (this.data.completedLessons && this.data.completedLessons.python && this.data.completedLessons.python.length > 0))) {
        userState = JSON.parse(JSON.stringify(this.data));
        userState.id = userId;
        userState.profile.id = userId;
      } else {
        userState = createFreshUserState({ id: userId });
      }
    }

    userState.profile.name = userName;
    userState.profile.email = email;
    userState.profile.isRegistered = true;
    userState.profile.isVerified = true;

    this.activeUserId = userId;
    localStorage.setItem(ACTIVE_USER_ID_KEY, userId);
    localStorage.setItem(STATE_PREFIX + userId, JSON.stringify(userState));
    this.data = userState;
    this.registerUserInIndex(userState);
    this.save();

    if (window.SoundEngine && SoundEngine.playVictory) SoundEngine.playVictory();

    return {
      success: true,
      user: {
        id: userId,
        name: userName,
        email: email
      }
    };
  },

  // 3. Log In with email & password
  async loginWithPassword({ email, password }) {
    email = (email || '').trim().toLowerCase();
    password = (password || '');

    if (!email || !password) {
      return { success: false, error: 'يرجى إدخال البريد الإلكتروني وكلمة المرور' };
    }

    const accounts = this.getStoredAccounts();
    const localAcc = accounts[email];
    const pwHash = await this.hashPassword(password);

    // Try server first
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.user) {
          const userId = json.user.id;
          if (localAcc) {
            localAcc.isVerified = true;
            this.saveStoredAccounts(accounts);
          }
          this.switchAccount(userId);
          this.data.profile.isRegistered = true;
          this.data.profile.isVerified = true;
          this.data.profile.email = email;
          this.save();
          if (window.SoundEngine && SoundEngine.playVictory) SoundEngine.playVictory();
          return { success: true, user: json.user };
        } else if (json.unverified) {
          return {
            success: false,
            unverified: true,
            email: email,
            code: json.code,
            error: 'الحساب غير مؤكد بعد. يرجى إدخال رمز التأكيد المرسل إلى Gmail.'
          };
        } else if (json.error) {
          return { success: false, error: json.error };
        }
      }
    } catch (e) {}

    // Fallback to local accounts
    if (!localAcc) {
      return { success: false, error: 'لا يوجد حساب مسجل بهذا البريد الإلكتروني. يرجى إنشاء حساب جديد.' };
    }

    if (localAcc.passwordHash !== pwHash) {
      return { success: false, error: 'كلمة المرور غير صحيحة! يرجى إعادة المحاولة.' };
    }

    if (!localAcc.isVerified) {
      return {
        success: false,
        unverified: true,
        email: email,
        code: localAcc.code,
        error: 'الحساب غير مؤكد بعد. يرجى إدخال رمز التأكيد المرسل إلى Gmail.'
      };
    }

    // Login success!
    this.switchAccount(localAcc.id);
    this.data.profile.isRegistered = true;
    this.data.profile.isVerified = true;
    this.data.profile.email = email;
    this.save();

    if (window.SoundEngine && SoundEngine.playVictory) SoundEngine.playVictory();

    return {
      success: true,
      user: {
        id: localAcc.id,
        name: localAcc.name,
        email: email
      }
    };
  },

  // 4. Resend confirmation code to Gmail
  async resendVerificationCode(email) {
    email = (email || '').trim().toLowerCase();
    const accounts = this.getStoredAccounts();

    let newCode = null;
    try {
      const res = await fetch('/api/auth/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) newCode = json.code;
      }
    } catch (e) {}

    newCode = newCode || Math.floor(100000 + Math.random() * 900000).toString();

    if (accounts[email]) {
      accounts[email].code = newCode;
      this.saveStoredAccounts(accounts);
    }

    return {
      success: true,
      email: email,
      code: newCode,
      message: `تم توليد رمز تأكيد جديد وإرساله إلى Gmail: ${email}`
    };
  },

  // 5. Logout current user
  logoutUser() {
    this.save();
    // Switch to clean guest account
    const freshGuest = createFreshUserState({ isRegistered: false, name: 'ضيف جديد' });
    this.activeUserId = freshGuest.id;
    localStorage.setItem(ACTIVE_USER_ID_KEY, freshGuest.id);
    localStorage.setItem(STATE_PREFIX + freshGuest.id, JSON.stringify(freshGuest));
    this.data = freshGuest;
    this.save();
    if (window.App) {
      if (window.App.renderHeaderStats) window.App.renderHeaderStats();
      if (window.App.renderCurrentView) window.App.renderCurrentView();
    }
  },

  // Update Profile fields (name, bio, avatar, custom avatar image)
  updateProfile({ name, bio, avatar, avatarImage }) {
    if (name) {
      this.data.profile.name = name.trim();
      this.data.profile.isRegistered = true;
    }
    if (typeof bio === 'string') this.data.profile.bio = bio.trim();
    if (avatar) this.data.profile.avatar = avatar;
    if (avatarImage !== undefined) this.data.profile.avatarImage = avatarImage;
    
    this.save();
    this.registerUserInIndex(this.data);
    this.updateUserInLeague();
    window.App.renderHeaderStats();
    window.App.renderCurrentView();
  },

  deepMerge(target, source) {
    const output = Object.assign({}, target);
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target)) Object.assign(output, { [key]: source[key] });
          else output[key] = this.deepMerge(target[key], source[key]);
        } else {
          output[key] = source[key];
        }
      });
    }
    return output;
  },

  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  },

  // Hearts Mechanics (1 Heart Regenerated Every 10 Minutes Until Full)
  checkHeartRegen() {
    if (this.hasUnlimitedHearts()) {
      this.data.stats.hearts = this.data.stats.maxHearts;
      this.data.stats.lastHeartLostTime = null;
      return false;
    }

    const { hearts, maxHearts, lastHeartLostTime } = this.data.stats;
    if (hearts >= maxHearts) {
      if (this.data.stats.lastHeartLostTime) {
        this.data.stats.lastHeartLostTime = null;
        this.save();
      }
      return false;
    }

    // If hearts are missing but timer hasn't started, start now
    if (!lastHeartLostTime) {
      this.data.stats.lastHeartLostTime = Date.now();
      this.save();
      return false;
    }

    const regenRateMinutes = 10; // Exactly 1 heart every 10 minutes!
    const regenIntervalMs = regenRateMinutes * 60 * 1000;
    const elapsedMs = Date.now() - lastHeartLostTime;
    const heartsToRegen = Math.floor(elapsedMs / regenIntervalMs);

    if (heartsToRegen > 0) {
      const newHearts = Math.min(maxHearts, hearts + heartsToRegen);
      this.data.stats.hearts = newHearts;
      if (newHearts >= maxHearts) {
        this.data.stats.lastHeartLostTime = null;
      } else {
        // Carry over remaining time towards the next heart
        this.data.stats.lastHeartLostTime = lastHeartLostTime + (heartsToRegen * regenIntervalMs);
      }
      this.save();
      return true; // Hearts changed!
    }
    return false;
  },

  getHeartRegenRemainingMs() {
    if (this.hasUnlimitedHearts()) return 0;
    const { hearts, maxHearts, lastHeartLostTime } = this.data.stats;
    if (hearts >= maxHearts) return 0;
    if (!lastHeartLostTime) return 10 * 60 * 1000;
    const regenIntervalMs = 10 * 60 * 1000;
    const elapsed = Date.now() - lastHeartLostTime;
    const remaining = Math.max(0, regenIntervalMs - (elapsed % regenIntervalMs));
    return remaining;
  },

  getHeartRegenCountdownText() {
    const ms = this.getHeartRegenRemainingMs();
    if (ms <= 0) return '';
    const totalSec = Math.ceil(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  },

  loseHeart() {
    if (this.hasUnlimitedHearts()) return false;
    if (this.data.stats.hearts > 0) {
      this.data.stats.hearts -= 1;
      // Start regen countdown if not already counting
      if (!this.data.stats.lastHeartLostTime) {
        this.data.stats.lastHeartLostTime = Date.now();
      }
      this.save();
      return true;
    }
    return false;
  },

  gainHeart(count = 1) {
    this.data.stats.hearts = Math.min(this.data.stats.maxHearts, this.data.stats.hearts + count);
    if (this.data.stats.hearts >= this.data.stats.maxHearts) {
      this.data.stats.lastHeartLostTime = null;
    }
    this.save();
  },

  refillHeartsFull() {
    this.data.stats.hearts = this.data.stats.maxHearts;
    this.data.stats.lastHeartLostTime = null;
    this.save();
  },

  hasUnlimitedHearts() {
    return Boolean(this.data.inventory.unlimitedHearts);
  },

  // Streak Mechanics
  checkStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = this.data.stats.lastActiveDate;

    if (!lastActive) {
      this.data.stats.lastActiveDate = today;
      return;
    }

    if (today === lastActive) {
      return;
    }

    const yesterday = new Date(Date.now() - 24 * 3600 * 1000).toISOString().split('T')[0];
    if (lastActive !== yesterday) {
      if (this.data.inventory.streakFreeze > 0) {
        this.data.inventory.streakFreeze -= 1;
        this.data.inventory.streakFreezeActive = true;
      } else {
        this.data.stats.streak = 0;
      }
    }
  },

  recordActiveToday() {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = this.data.stats.lastActiveDate;

    if (lastActive !== today) {
      this.data.stats.streak += 1;
      if (this.data.stats.streak > this.data.stats.longestStreak) {
        this.data.stats.longestStreak = this.data.stats.streak;
      }
      this.data.stats.lastActiveDate = today;

      const dayOfWeek = (new Date().getDay() + 6) % 7;
      this.data.stats.streakDays[dayOfWeek] = true;

      if (this.data.inventory.doubleOrNothing) {
        this.data.inventory.doubleOrNothingDays += 1;
        if (this.data.inventory.doubleOrNothingDays >= 7) {
          this.data.stats.gems += 100;
          this.data.inventory.doubleOrNothing = false;
          this.data.inventory.doubleOrNothingDays = 0;
          SoundEngine.playGem();
        }
      }

      if (window.SoundEngine) SoundEngine.playStreak();
    }
  },

  // Complete a lesson and record rewards
  completeLesson(lessonId, earnedXp = 20, earnedGems = 10, accuracy = 100) {
    const course = this.data.currentCourse || 'python';
    if (!this.data.completedLessons[course]) {
      this.data.completedLessons[course] = [];
    }

    if (!this.data.completedLessons[course].includes(lessonId)) {
      this.data.completedLessons[course].push(lessonId);
    }

    this.data.stats.xp += earnedXp;
    this.data.stats.gems += earnedGems;
    this.data.stats.totalLessonsCompleted += 1;
    this.data.stats.accuracySum += accuracy;
    this.data.stats.accuracyCount += 1;
    this.data.league.weeklyXp += earnedXp;

    this.recordActiveToday();

    // Progress Quests
    this.progressQuest('xp', earnedXp);
    this.progressQuest('lesson', 1);
    if (accuracy >= 90) {
      this.progressQuest('accuracy', 1);
    }

    this.updateUserInLeague();
    this.save();
    if (window.SoundEngine) SoundEngine.playVictory();
  },

  progressQuest(type, amount) {
    if (!this.data.dailyQuests) return;
    this.data.dailyQuests.forEach(q => {
      if (type === 'xp' && q.id === 'q1' && !q.claimed) {
        q.current = Math.min(q.target, q.current + amount);
      } else if (type === 'lesson' && q.id === 'q2' && !q.claimed) {
        q.current = Math.min(q.target, q.current + amount);
      } else if (type === 'accuracy' && q.id === 'q3' && !q.claimed) {
        q.current = Math.min(q.target, q.current + amount);
      }
    });
  },

  claimQuest(questId) {
    const q = this.data.dailyQuests.find(item => item.id === questId);
    if (q && q.current >= q.target && !q.claimed) {
      q.claimed = true;
      this.data.stats.gems += q.rewardGems;
      this.data.monthlyQuest.current += 1;
      this.save();
      if (window.SoundEngine) SoundEngine.playGem();
      return true;
    }
    return false;
  },

  ensureCompetitors() {
    if (this.data.league.competitors && this.data.league.competitors.length >= 25) {
      return;
    }

    const mockNames = [
      'Sarah_Dev', 'Python_Pro', 'Tariq_Cpp', 'Elena_R', 'Kenji_Go', 'Marcus_JS',
      'Fatima_Code', 'Lukas_Rust', 'Chloe_CSS', 'Dev_Ninja', 'PixelPioneer',
      'CodeValkyrie', 'Zack_Async', 'Mia_Query', 'Liam_Stack', 'Nora_Byte',
      'Kareem_Algo', 'Aya_FullStack', 'Hassan_Tech', 'Jordan_Code', 'Sven_Cpp',
      'Linus_Penguin', 'Grace_Compiler', 'Alan_Turing', 'Ada_Lovelace', 'Guido_Snake',
      'Brendan_Mocha', 'Dennis_R', 'Bjarne_Class', 'James_Java'
    ];

    const competitors = [];
    const baseWeekly = Math.max(10, this.data.league.weeklyXp);

    mockNames.forEach((name, idx) => {
      const scoreVariance = (Math.random() - 0.45) * 80;
      const score = Math.max(0, Math.round(baseWeekly + scoreVariance - (idx * 5)));
      competitors.push({
        id: 'comp_' + idx,
        name: name,
        avatar: ['classic', 'cyber', 'wizard', 'hacker'][idx % 4],
        xp: score,
        isUser: false
      });
    });

    this.data.league.competitors = competitors;
    this.updateUserInLeague();
  },

  updateUserInLeague() {
    if (!this.data.league.competitors) return;

    let comps = this.data.league.competitors.filter(c => !c.isUser);

    comps.push({
      id: 'current_user',
      name: this.data.profile.name,
      avatar: this.data.profile.avatar,
      avatarImage: this.data.profile.avatarImage,
      xp: this.data.league.weeklyXp,
      isUser: true
    });

    comps.sort((a, b) => b.xp - a.xp);
    this.data.league.competitors = comps;
  },

  // Reset Progress for current account to completely fresh zero state
  resetAll() {
    try {
      localStorage.removeItem(STATE_PREFIX + this.activeUserId);
      const userName = (this.data && this.data.profile && this.data.profile.name) || 'مستخدم جديد';
      this.data = createFreshUserState({ id: this.activeUserId, name: userName });
      this.save();
    } catch (e) {
      console.warn('Reset error:', e);
    }
    window.location.reload();
  },

  // Factory reset: wipes all local storage and restarts completely from scratch
  factoryReset() {
    try {
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith('prolingo_')) {
          localStorage.removeItem(k);
        }
      });
    } catch (e) {
      console.warn('Factory reset error:', e);
    }
    window.location.reload();
  }
};

if (typeof window !== 'undefined') {
  window.ProLingoState = ProLingoState;
}

