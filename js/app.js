/**
 * ProLingo: Main Application Controller (100-Unit Python Flagship)
 * Handles views, 100-unit path rendering, 5 section tabs, Google sign-in,
 * profile editing, custom avatars, coming soon modals, shop, leagues, and settings.
 */

/**
 * ProLingo: Interactive Profile Avatar Image Cropper
 * Mobile touch & desktop mouse drag, zoom slider, rotation, live preview,
 * circular canvas clipping, and high-res avatar export.
 */
window.ImageCropper = {
  img: null,
  canvas: null,
  ctx: null,
  previewCanvas: null,
  previewCtx: null,
  scale: 1,
  panX: 0,
  panY: 0,
  rotation: 0,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,
  targetPreviewId: null,
  initialized: false,

  init() {
    if (this.initialized) return;
    this.canvas = document.getElementById('crop-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.previewCanvas = document.getElementById('crop-preview-canvas');
    if (this.previewCanvas) {
      this.previewCtx = this.previewCanvas.getContext('2d');
    }

    // 1. Mouse Dragging
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.dragStartX = e.clientX - this.panX;
      this.dragStartY = e.clientY - this.panY;
      this.canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      this.panX = e.clientX - this.dragStartX;
      this.panY = e.clientY - this.dragStartY;
      this.render();
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        if (this.canvas) this.canvas.style.cursor = 'grab';
      }
    });

    // 2. Touch Dragging for Mobile Phone Support
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length === 1) {
        this.isDragging = true;
        this.dragStartX = e.touches[0].clientX - this.panX;
        this.dragStartY = e.touches[0].clientY - this.panY;
      }
    }, { passive: false });

    this.canvas.addEventListener('touchmove', (e) => {
      if (!this.isDragging || !e.touches || e.touches.length !== 1) return;
      e.preventDefault();
      this.panX = e.touches[0].clientX - this.dragStartX;
      this.panY = e.touches[0].clientY - this.dragStartY;
      this.render();
    }, { passive: false });

    this.canvas.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // 3. Mouse Wheel Zoom
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.08 : -0.08;
      const slider = document.getElementById('crop-zoom-slider');
      let newScale = Math.max(0.5, Math.min(3.5, this.scale + delta));
      this.scale = newScale;
      if (slider) slider.value = newScale;
      this.render();
    }, { passive: false });

    this.initialized = true;
  },

  open(file, targetPreviewId = 'edit-avatar-preview') {
    if (!file) return;
    this.init();
    this.targetPreviewId = targetPreviewId;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        this.img = img;
        this.reset();
        const modal = document.getElementById('image-crop-modal');
        if (modal) modal.classList.remove('hidden');
        this.render();
      };
      img.onerror = () => {
        if (window.App && window.App.showToast) {
          const isAr = (window.I18N && I18N.isRTL && I18N.isRTL());
          window.App.showToast(isAr ? 'فشل تحميل الصورة! تأكد من أنها بصيغة صالحة.' : 'Failed to load image. Please select a valid photo.');
        }
      };
      img.src = e.target.result;
    };
    reader.onerror = () => {
      if (window.App && window.App.showToast) {
        const isAr = (window.I18N && I18N.isRTL && I18N.isRTL());
        window.App.showToast(isAr ? 'فشل قراءة ملف الصورة!' : 'Failed to read image file.');
      }
    };
    reader.readAsDataURL(file);
  },

  reset() {
    if (!this.img || !this.canvas) return;
    this.rotation = 0;
    this.panX = 0;
    this.panY = 0;

    // Calculate initial scale to fill 210px circle target
    const targetSize = 210;
    const minDim = Math.min(this.img.width, this.img.height) || 1;
    this.scale = Math.max(1, targetSize / minDim);

    const slider = document.getElementById('crop-zoom-slider');
    if (slider) {
      slider.value = this.scale;
    }
    this.render();
  },

  setZoom(val) {
    this.scale = parseFloat(val) || 1;
    this.render();
  },

  rotate(deg) {
    this.rotation = (this.rotation + deg) % 360;
    this.render();
  },

  render() {
    if (!this.ctx || !this.img) return;

    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 105;

    this.ctx.clearRect(0, 0, width, height);

    // 1. Draw transformed image
    this.ctx.save();
    this.ctx.translate(centerX + this.panX, centerY + this.panY);
    this.ctx.rotate((this.rotation * Math.PI) / 180);
    this.ctx.scale(this.scale, this.scale);
    this.ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
    this.ctx.restore();

    // 2. Draw circular crop mask (dark outer overlay with clear hole)
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.58)';
    this.ctx.beginPath();
    this.ctx.rect(0, 0, width, height);
    this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    this.ctx.fill();

    // 3. Draw dashed guide border around the crop circle
    this.ctx.strokeStyle = '#58cc02';
    this.ctx.lineWidth = 3;
    this.ctx.setLineDash([6, 4]);
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.restore();

    // 4. Update small circular preview canvas
    if (this.previewCtx && this.previewCanvas) {
      const pW = this.previewCanvas.width;
      const pH = this.previewCanvas.height;
      this.previewCtx.clearRect(0, 0, pW, pH);

      this.previewCtx.save();
      this.previewCtx.beginPath();
      this.previewCtx.arc(pW / 2, pH / 2, pW / 2, 0, Math.PI * 2);
      this.previewCtx.clip();

      this.previewCtx.drawImage(
        this.canvas,
        centerX - radius, centerY - radius, radius * 2, radius * 2,
        0, 0, pW, pH
      );
      this.previewCtx.restore();
    }
  },

  applyCrop() {
    if (!this.img || !this.canvas) return;

    // Render cropped circle to high-res 256x256 off-screen canvas
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = 256;
    outputCanvas.height = 256;
    const outCtx = outputCanvas.getContext('2d');

    const srcRadius = 105;
    const scaleFactor = 256 / (srcRadius * 2);

    outCtx.save();
    outCtx.beginPath();
    outCtx.arc(128, 128, 128, 0, Math.PI * 2);
    outCtx.clip();

    outCtx.translate(128 + this.panX * scaleFactor, 128 + this.panY * scaleFactor);
    outCtx.rotate((this.rotation * Math.PI) / 180);
    outCtx.scale(this.scale * scaleFactor, this.scale * scaleFactor);
    outCtx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
    outCtx.restore();

    // Export as high-quality PNG with clean circle transparency
    const dataUrl = outputCanvas.toDataURL('image/png');

    // Apply to target preview element in DOM
    if (this.targetPreviewId) {
      const preview = document.getElementById(this.targetPreviewId);
      if (preview) {
        preview.innerHTML = `<img src="${dataUrl}" class="avatar-preview-img" alt="Avatar">`;
        preview.dataset.avatarImage = dataUrl;
        delete preview.dataset.presetAvatar;
      }
    }

    // Persist immediately if updating user's profile
    if (this.targetPreviewId === 'edit-avatar-preview') {
      if (window.ProLingoState && ProLingoState.data && ProLingoState.data.profile) {
        ProLingoState.data.profile.avatarImage = dataUrl;
        ProLingoState.save();
        if (window.App && window.App.renderHeaderStats) {
          window.App.renderHeaderStats();
          window.App.renderCurrentView();
        }
      }
    }

    if (window.SoundEngine) SoundEngine.playVictory();
    if (window.App && window.App.showToast) {
      const isAr = (window.I18N && I18N.isRTL && I18N.isRTL());
      window.App.showToast(isAr ? 'تم اقتصاص وتحديث صورة البروفايل بنجاح! 📸' : 'Profile picture cropped & updated! 📸');
    }

    this.close();
  },

  close() {
    const modal = document.getElementById('image-crop-modal');
    if (modal) modal.classList.add('hidden');
    const fileInput = document.getElementById('profile-photo-file');
    if (fileInput) fileInput.value = '';
    const googleInput = document.getElementById('google-file-upload');
    if (googleInput) googleInput.value = '';
  }
};

window.App = {
  currentView: 'learn',

  init() {
    // 1. Initialize State
    ProLingoState.init();

    // 2. Set UI Language from state
    const savedLang = localStorage.getItem('prolingo_ui_lang') || ProLingoState.data.settings.uiLang || 'en';
    I18N.setLanguage(savedLang);

    // 3. Set Theme
    const savedTheme = ProLingoState.data.settings.theme || 'dark';
    this.applyTheme(savedTheme);

    // 4. Setup Global Event Listeners
    this.bindEvents();
    if (window.LessonRunner && window.LessonRunner.init) {
      LessonRunner.init();
    }
    this.initGoogleIdentityServices();

    // 5. Hydrate Vector Icons
    if (typeof Icons !== 'undefined' && Icons.hydrate) {
      Icons.hydrate();
    }

    // 6. Render Header & Initial View
    this.renderHeaderStats();
    this.switchView('learn');
    this.startHeartTicker();

    // Close user dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const container = document.getElementById('user-header-container');
      if (container && !container.contains(e.target)) {
        this.toggleUserDropdown(false);
      }
    });
  },

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = `theme-${theme} ${I18N.isRTL() ? 'rtl' : ''}`;
    ProLingoState.data.settings.theme = theme;
    ProLingoState.save();
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = (current === 'dark') ? 'light' : 'dark';
    this.applyTheme(next);
    SoundEngine.playTap();
  },

  bindEvents() {
    // Navigation items
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const view = tab.dataset.view;
        this.switchView(view);
        SoundEngine.playTap();
      });
    });

    // Theme toggle button
    const themeBtn = document.getElementById('btn-toggle-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Language toggle button in top bar
    const langBtn = document.getElementById('btn-toggle-lang');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        const nextLang = (I18N.currentLang === 'en') ? 'ar' : 'en';
        I18N.setLanguage(nextLang);
        ProLingoState.data.settings.uiLang = nextLang;
        ProLingoState.save();
        this.renderHeaderStats();
        this.renderCurrentView();
        SoundEngine.playTap();
      });
    }

    // Course selector dropdown button
    const courseBtn = document.getElementById('btn-course-selector');
    if (courseBtn) {
      courseBtn.addEventListener('click', () => {
        this.openCourseSelectorModal();
        SoundEngine.playTap();
      });
    }

    // Hearts indicator click -> opens refill modal
    const heartsBadge = document.getElementById('stat-hearts-badge');
    if (heartsBadge) {
      heartsBadge.addEventListener('click', () => {
        this.openHeartsModal();
        SoundEngine.playTap();
      });
    }

    // Gems indicator click -> goes to shop
    const gemsBadge = document.getElementById('stat-gems-badge');
    if (gemsBadge) {
      gemsBadge.addEventListener('click', () => {
        this.switchView('shop');
        SoundEngine.playTap();
      });
    }

    // Streak badge click -> goes to profile
    const streakBadge = document.getElementById('stat-streak-badge');
    if (streakBadge) {
      streakBadge.addEventListener('click', () => {
        this.switchView('profile');
        SoundEngine.playTap();
      });
    }
  },

  switchView(viewName) {
    this.currentView = viewName;

    // Update Sidebar active tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
      if (tab.dataset.view === viewName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Hide all view panels
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.add('hidden');
    });

    // Show target view
    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.classList.remove('hidden');
    }

    this.renderCurrentView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  renderCurrentView() {
    switch (this.currentView) {
      case 'learn':
        this.renderLearnView();
        break;
      case 'leagues':
        this.renderLeaguesView();
        break;
      case 'quests':
        this.renderQuestsView();
        break;
      case 'shop':
        this.renderShopView();
        break;
      case 'profile':
        this.renderProfileView();
        break;
      case 'practice':
        this.renderPracticeView();
        break;
      case 'settings':
        this.renderSettingsView();
        break;
    }
  },

  renderAvatarElement(container, avatarType, avatarImage) {
    if (!container) return;
    if (avatarImage) {
      container.innerHTML = `<img src="${avatarImage}" alt="Avatar" class="avatar-round-image">`;
    } else {
      container.innerHTML = this.getAvatarIcon(avatarType);
    }
  },

  renderHeaderStats() {
    const { stats, currentCourse, profile } = ProLingoState.data;
    const course = CURRICULUM.getCourse(currentCourse);

    // Current Course button
    const courseBtn = document.getElementById('btn-course-selector');
    if (courseBtn) {
      const courseSvg = (typeof Icons !== 'undefined' && Icons.get) ? Icons.get('python', 22) : (course.icon || '🐍');
      courseBtn.innerHTML = `
        <span class="course-flag">${courseSvg}</span>
        <span class="course-name">${course.title.split(' ')[0]}</span>
        <span class="course-units-badge">100 UNITS</span>
        <span class="course-chevron">▼</span>
      `;
    }

    // Streak
    const streakEl = document.getElementById('header-streak-val');
    if (streakEl) streakEl.textContent = stats.streak;
    const streakBadge = document.getElementById('stat-streak-badge');
    if (streakBadge && typeof Icons !== 'undefined') {
      const sIconWrap = streakBadge.querySelector('.stat-icon-wrap, span:first-child');
      if (sIconWrap) sIconWrap.innerHTML = Icons.get('fire', 20);
    }

    // Gems
    const gemsEl = document.getElementById('header-gems-val');
    if (gemsEl) gemsEl.textContent = stats.gems;
    const gemsBadge = document.getElementById('stat-gems-badge');
    if (gemsBadge && typeof Icons !== 'undefined') {
      const gIconWrap = gemsBadge.querySelector('.stat-icon-wrap, span:first-child');
      if (gIconWrap) gIconWrap.innerHTML = Icons.get('gem', 20);
    }

    // Hearts or Unlimited Learning Indicator
    const heartsBadge = document.getElementById('stat-hearts-badge');
    const heartsEl = document.getElementById('header-hearts-val');
    if (heartsEl) {
      if (ProLingoState.hasUnlimitedHearts()) {
        heartsEl.textContent = I18N.get('stats.unlimited') || 'Unlimited';
        if (heartsBadge) {
          heartsBadge.className = 'stat-pill unlimited';
          const iconSpan = heartsBadge.querySelector('.stat-icon-wrap, span:first-child');
          if (iconSpan && typeof Icons !== 'undefined') {
            iconSpan.innerHTML = Icons.get('super', 20);
          }
          heartsBadge.title = 'Super ProLingo (Unlimited Hearts Active)';
        }
      } else {
        heartsEl.textContent = `${stats.hearts}`;
        if (heartsBadge) {
          heartsBadge.className = 'stat-pill hearts';
          const iconSpan = heartsBadge.querySelector('.stat-icon-wrap, span:first-child');
          if (iconSpan && typeof Icons !== 'undefined') {
            iconSpan.innerHTML = Icons.get('heart', 20);
          }
          const cd = ProLingoState.getHeartRegenCountdownText();
          const isAr = I18N.isRTL();
          if (stats.hearts < (stats.maxHearts || 5) && cd) {
            heartsBadge.title = isAr 
              ? `القلوب: ${stats.hearts}/${stats.maxHearts || 5} • القلب القادم خلال ${cd} (قلب كل 10 دقائق)`
              : `Hearts: ${stats.hearts}/${stats.maxHearts || 5} • Next heart in ${cd} (1 heart / 10m)`;
          } else {
            heartsBadge.title = isAr 
              ? `القلوب: ${stats.hearts}/${stats.maxHearts || 5} (ممتلئة بالكامل)`
              : `Hearts: ${stats.hearts}/${stats.maxHearts || 5} (Full)`;
          }
        }
      }
    }

    // User Profile Header Info
    const headerAvatar = document.getElementById('header-user-avatar');
    const headerName = document.getElementById('header-user-name');
    const dropAvatar = document.getElementById('dropdown-user-avatar');
    const dropName = document.getElementById('dropdown-user-name');
    const dropEmail = document.getElementById('dropdown-user-email');
    const sideAvatar = document.getElementById('sidebar-user-avatar');
    const sideName = document.getElementById('sidebar-user-name');

    if (headerName) headerName.textContent = profile.name;
    if (dropName) dropName.textContent = profile.name;
    if (dropEmail) dropEmail.textContent = profile.email || (profile.isGoogle ? 'Google Account' : 'Guest Account');
    if (sideName) sideName.textContent = profile.name;

    this.renderAvatarElement(headerAvatar, profile.avatar, profile.avatarImage);
    this.renderAvatarElement(dropAvatar, profile.avatar, profile.avatarImage);
    this.renderAvatarElement(sideAvatar, profile.avatar, profile.avatarImage);

    // Language toggle indicator
    const langBtn = document.getElementById('btn-toggle-lang');
    if (langBtn) {
      langBtn.innerHTML = I18N.currentLang === 'en' ? '🌐 <b>EN</b>' : '🌐 <b>عربي</b>';
    }

    // Update Nav labels
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = I18N.get(key);
    });
  },

  // ==========================================
  // VIEW: LEARN (100 Python Units Path)
  // ==========================================
  renderLearnView() {
    const courseId = ProLingoState.data.currentCourse || 'python';
    const course = CURRICULUM.getCourse(courseId);
    const completedList = ProLingoState.data.completedLessons[courseId] || [];
    const isAr = I18N.isRTL();

    // 1. Render Section Selector Bar
    this.renderSectionSelector();

    // 2. Filter units for current active section (e.g. section 1 = units 1 to 20)
    const activeSectionNum = ProLingoState.data.activeSection || 1;
    const allUnits = course.units || [];
    
    // Find section bounds
    const secObj = (CURRICULUM.sections || []).find(s => s.number === activeSectionNum) || { startUnit: 1, endUnit: 20 };
    const unitsToRender = allUnits.filter(u => u.number >= secObj.startUnit && u.number <= secObj.endUnit);

    // Update section progress counter
    const counterEl = document.getElementById('section-progress-counter');
    if (counterEl) {
      let completedUnitsCount = 0;
      allUnits.forEach(u => {
        const allDone = u.lessons.every(l => completedList.includes(l.id));
        if (allDone) completedUnitsCount++;
      });
      counterEl.textContent = `${completedUnitsCount} / ${allUnits.length} Units Mastered`;
    }

    const container = document.getElementById('learn-path-container');
    if (!container) return;

    let pathHtml = '';

    // Determine first active lesson across the whole course!
    let activeLessonId = null;
    for (const unit of allUnits) {
      for (const lesson of unit.lessons) {
        if (!completedList.includes(lesson.id)) {
          activeLessonId = lesson.id;
          break;
        }
      }
      if (activeLessonId) break;
    }

    // If all completed, active is null (course completed!)
    unitsToRender.forEach((unit) => {
      const uTitle = (isAr && unit.title_ar) ? unit.title_ar : unit.title;
      const uDesc = (isAr && unit.description_ar) ? unit.description_ar : unit.description;

      let lessonsHtml = '';

      unit.lessons.forEach((lesson, lIdx) => {
        const isCompleted = completedList.includes(lesson.id);
        const isActive = (lesson.id === activeLessonId);
        const isLocked = !isCompleted && !isActive;

        // Stepping stone zigzag layout offsets
        const offsetClasses = ['pos-center', 'pos-right', 'pos-center', 'pos-left'];
        const posClass = offsetClasses[lIdx % 4];

        let stateClass = 'node-locked';
        let badgeIcon = (typeof Icons !== 'undefined') ? Icons.get('lock', 14) : '🔒';
        let clickAttr = '';

        if (isCompleted) {
          stateClass = 'node-completed';
          badgeIcon = (typeof Icons !== 'undefined') ? Icons.get('crown', 16) : '👑';
          clickAttr = `onclick="App.openLessonModal('${courseId}', '${unit.id}', '${lesson.id}')"`;
        } else if (isActive) {
          stateClass = 'node-active pulse-bounce';
          badgeIcon = (typeof Icons !== 'undefined') ? Icons.get('star', 16) : '⭐';
          clickAttr = `onclick="App.openLessonModal('${courseId}', '${unit.id}', '${lesson.id}')"`;
        }

        const lessonTitle = (isAr && lesson.title_ar) ? lesson.title_ar : lesson.title;
        const rawIcon = lesson.icon || unit.icon || 'box';
        const stoneIcon = (typeof Icons !== 'undefined' && Icons.getLevelIcon)
          ? Icons.getLevelIcon(rawIcon, 44, `${unit.title || ''} ${lesson.title || ''}`)
          : (typeof Icons !== 'undefined' ? Icons.get('box', 44) : '📦');

        lessonsHtml += `
          <div class="stepping-stone-row ${posClass}">
            <div class="stepping-stone ${stateClass}" ${clickAttr} title="${lessonTitle}">
              <div class="stone-circle">
                <span class="stone-icon">${stoneIcon}</span>
                <span class="stone-badge">${badgeIcon}</span>
              </div>
              <span class="stone-label">${lessonTitle}</span>
              ${isActive ? `<div class="speech-bubble-start">${I18N.get('common.start')}!</div>` : ''}
            </div>
          </div>
        `;
      });

      const gbIcon = (typeof Icons !== 'undefined') ? Icons.get('book', 20) : '📖';

      pathHtml += `
        <div class="unit-section" style="--unit-accent: ${unit.bannerColor};">
          <div class="unit-banner">
            <div class="unit-banner-info">
              <span class="unit-badge">${I18N.get('common.unit')} ${unit.number} of 100</span>
              <h2 class="unit-title">${uTitle}</h2>
              <p class="unit-desc">${uDesc}</p>
            </div>
            <button class="btn-guidebook" onclick="App.openGuidebookModal('${courseId}', '${unit.id}')">
              ${gbIcon} ${I18N.get('common.guidebook')}
            </button>
          </div>
          <div class="unit-path-stones">
            ${lessonsHtml}
          </div>
        </div>
      `;
    });

    container.innerHTML = pathHtml;
    this.renderHomeSideWidgets();
  },

  renderSectionSelector() {
    const bar = document.getElementById('section-pills-bar');
    if (!bar) return;

    const sections = CURRICULUM.getSections() || [];
    const activeSec = ProLingoState.data.activeSection || 1;
    const isAr = I18N.isRTL();

    let html = '';
    sections.forEach(sec => {
      const isCurrent = sec.number === activeSec;
      const title = isAr ? sec.title_ar : sec.title;
      html += `
        <button class="section-pill-btn ${isCurrent ? 'active' : ''}" onclick="App.selectSection(${sec.number})">
          <span class="sec-icon">${sec.icon}</span>
          <span class="sec-text">${title} (${sec.startUnit}-${sec.endUnit})</span>
        </button>
      `;
    });

    bar.innerHTML = html;
  },

  selectSection(secNum) {
    ProLingoState.data.activeSection = secNum;
    ProLingoState.save();
    this.renderLearnView();
    SoundEngine.playTap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  renderHomeSideWidgets() {
    const sideQuests = document.getElementById('home-side-quests');
    if (sideQuests) {
      const qList = ProLingoState.data.dailyQuests || [];
      let qHtml = '';
      qList.forEach(q => {
        const pct = Math.min(100, Math.round((q.current / q.target) * 100));
        qHtml += `
          <div class="widget-quest-item">
            <div class="quest-item-head">
              <span class="quest-name">${q.titleKey}</span>
              <span class="quest-gem-reward">💎 +${q.rewardGems}</span>
            </div>
            <div class="quest-progress-track">
              <div class="quest-progress-fill" style="width: ${pct}%"></div>
            </div>
          </div>
        `;
      });
      sideQuests.innerHTML = qHtml;
    }

    // Weekly League Preview
    const sideLeague = document.getElementById('home-side-league');
    if (sideLeague) {
      const tierNames = I18N.translations[I18N.currentLang].leagues.tierNames;
      const currentTier = tierNames[ProLingoState.data.league.tierIndex] || 'Bronze';
      sideLeague.innerHTML = `
        <div class="widget-league-card">
          <div class="league-card-icon">🏆</div>
          <div class="league-card-text">
            <h4>${currentTier} League</h4>
            <p>${ProLingoState.data.league.weeklyXp} XP earned this week</p>
          </div>
        </div>
      `;
    }
  },

  openLessonModal(courseId, unitId, lessonId) {
    const course = CURRICULUM.getCourse(courseId);
    const unit = course.units.find(u => u.id === unitId);
    if (!unit) return;
    const lesson = unit.lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    LessonRunner.start(lesson);
  },

  openGuidebookModal(courseId, unitId) {
    const course = CURRICULUM.getCourse(courseId);
    const unit = course.units.find(u => u.id === unitId);
    if (!unit || !unit.guidebook) return;

    const modal = document.getElementById('guidebook-modal');
    const isAr = I18N.isRTL();
    const gTitle = (isAr && unit.guidebook.title_ar) ? unit.guidebook.title_ar : unit.guidebook.title;

    document.getElementById('guidebook-modal-title').textContent = gTitle;
    document.getElementById('guidebook-modal-content').innerHTML = `
      <div class="guidebook-markdown">
        ${unit.guidebook.content.replace(/\n/g, '<br>')}
      </div>
    `;

    modal.classList.remove('hidden');
  },

  // ==========================================
  // VIEW: LEAGUES (Leaderboard)
  // ==========================================
  renderLeaguesView() {
    const container = document.getElementById('leagues-container');
    if (!container) return;

    const { league } = ProLingoState.data;
    const tierNames = I18N.translations[I18N.currentLang].leagues.tierNames;
    const currentTier = tierNames[league.tierIndex];

    const msRemaining = Math.max(0, league.weekEndsTimestamp - Date.now());
    const daysRemaining = Math.floor(msRemaining / (24 * 3600 * 1000));
    const hoursRemaining = Math.floor((msRemaining % (24 * 3600 * 1000)) / (3600 * 1000));

    const comps = [...league.competitors].sort((a, b) => b.xp - a.xp);

    let rowsHtml = '';
    comps.forEach((comp, idx) => {
      const rank = idx + 1;
      const isTop3 = rank <= 3;
      const isPromo = rank <= 7;
      const isDemo = rank > comps.length - 5;
      const isSelf = comp.isUser;

      let zoneBadge = '';
      if (isPromo) {
        const upIcon = (typeof Icons !== 'undefined') ? Icons.get('arrow_up', 12) : '🔼';
        zoneBadge = `<span class="zone-tag promo">${upIcon} Advance</span>`;
      } else if (isDemo) {
        const downIcon = (typeof Icons !== 'undefined') ? Icons.get('arrow_down', 12) : '🔽';
        zoneBadge = `<span class="zone-tag demo">${downIcon} Demotion</span>`;
      }

      const avatarHtml = comp.avatarImage
        ? `<img src="${comp.avatarImage}" class="avatar-round-image mini" alt="Avatar">`
        : `<span class="row-avatar">${this.getAvatarIcon(comp.avatar)}</span>`;

      let rankHtml = rank;
      if (typeof Icons !== 'undefined') {
        if (rank === 1) rankHtml = Icons.get('medal_gold', 24);
        else if (rank === 2) rankHtml = Icons.get('medal_silver', 24);
        else if (rank === 3) rankHtml = Icons.get('medal_bronze', 24);
      } else {
        if (rank === 1) rankHtml = '🥇';
        else if (rank === 2) rankHtml = '🥈';
        else if (rank === 3) rankHtml = '🥉';
      }

      rowsHtml += `
        <div class="leaderboard-row ${isSelf ? 'current-user-row' : ''} ${isTop3 ? 'top-three' : ''}">
          <span class="row-rank">${rankHtml}</span>
          <div class="row-user-info">
            ${avatarHtml}
            <span class="row-name">${comp.name}</span>
            ${isSelf ? '<span class="badge-you">YOU</span>' : ''}
          </div>
          <div class="row-right">
            ${zoneBadge}
            <span class="row-xp">${comp.xp} XP</span>
          </div>
        </div>
      `;
    });

    const trophyIcon = (typeof Icons !== 'undefined') ? Icons.get('trophy', 64) : '🏆';
    const timerIcon = (typeof Icons !== 'undefined') ? Icons.get('timer', 18) : '⏱️';
    const upHeaderIcon = (typeof Icons !== 'undefined') ? Icons.get('arrow_up', 16) : '🔼';
    const downHeaderIcon = (typeof Icons !== 'undefined') ? Icons.get('arrow_down', 16) : '🔽';

    container.innerHTML = `
      <div class="leagues-hero-header">
        <div class="league-trophy-large">${trophyIcon}</div>
        <h1 class="page-title">${currentTier} League</h1>
        <p class="page-subtitle">${I18N.get('leagues.subtitle')}</p>
        <div class="league-timer-pill">
          ${timerIcon} ${I18N.get('common.endsIn')} ${daysRemaining}d ${hoursRemaining}h
        </div>
      </div>

      <div class="leaderboard-table-card">
        <div class="lb-zone-header promo-zone">
          <span>${upHeaderIcon} ${I18N.get('leagues.promotionZone')}</span>
        </div>
        ${rowsHtml}
        <div class="lb-zone-header demo-zone">
          <span>${downHeaderIcon} ${I18N.get('leagues.demotionZone')}</span>
        </div>
      </div>
    `;
  },

  // ==========================================
  // VIEW: SHOP (Duolingo Store)
  // ==========================================
  renderShopView() {
    const container = document.getElementById('shop-container');
    if (!container) return;

    const { gems, hearts, maxHearts } = ProLingoState.data.stats;
    const inv = ProLingoState.data.inventory;

    const gemIcon = (typeof Icons !== 'undefined') ? Icons.get('gem', 20) : '💎';
    const freezeIcon = (typeof Icons !== 'undefined') ? Icons.get('freeze', 38) : '🧊';
    const heartIcon = (typeof Icons !== 'undefined') ? Icons.get('heart', 38) : '❤️';
    const superIcon = (typeof Icons !== 'undefined') ? Icons.get('super', 38) : '✨';
    const doubleIcon = (typeof Icons !== 'undefined') ? Icons.get('double', 38) : '🎲';
    const fireBtnIcon = (typeof Icons !== 'undefined') ? Icons.get('fire', 16) : '🔥';

    container.innerHTML = `
      <div class="shop-header">
        <div class="shop-gem-pill">${gemIcon} <span>${gems}</span></div>
        <h1 class="page-title">${I18N.get('shop.title')}</h1>
        <p class="page-subtitle">${I18N.get('shop.subtitle')}</p>
      </div>

      <div class="shop-grid">
        <!-- Streak Freeze -->
        <div class="shop-card">
          <div class="shop-card-icon">${freezeIcon}</div>
          <div class="shop-card-info">
            <h3 class="shop-card-title">${I18N.get('shop.streakFreezeTitle')}</h3>
            <p class="shop-card-desc">${I18N.get('shop.streakFreezeDesc')}</p>
          </div>
          <button class="btn-3d btn-buy" onclick="App.buyStreakFreeze()" ${gems < 200 ? 'disabled' : ''}>
            ${gemIcon} 200
          </button>
        </div>

        <!-- Heart Refill -->
        <div class="shop-card">
          <div class="shop-card-icon">${heartIcon}</div>
          <div class="shop-card-info">
            <h3 class="shop-card-title">${I18N.get('shop.heartRefillTitle')}</h3>
            <p class="shop-card-desc">${I18N.get('shop.heartRefillDesc')}</p>
          </div>
          <button class="btn-3d btn-buy" onclick="App.buyHeartRefill()" ${hearts >= maxHearts || gems < 100 ? 'disabled' : ''}>
            ${hearts >= maxHearts ? I18N.get('common.equipped') : `${gemIcon} 100`}
          </button>
        </div>

        <!-- Unlimited Hearts -->
        <div class="shop-card highlight-card">
          <div class="shop-card-icon">${superIcon}</div>
          <div class="shop-card-info">
            <h3 class="shop-card-title">${I18N.get('shop.unlimitedHeartsTitle')}</h3>
            <p class="shop-card-desc">${I18N.get('shop.unlimitedHeartsDesc')}</p>
          </div>
          <button class="btn-3d btn-buy btn-super" onclick="App.buyUnlimitedHearts()" ${inv.unlimitedHearts || gems < 1000 ? 'disabled' : ''}>
            ${inv.unlimitedHearts ? I18N.get('common.equipped') : `${gemIcon} 1,000`}
          </button>
        </div>

        <!-- Double or Nothing -->
        <div class="shop-card">
          <div class="shop-card-icon">${doubleIcon}</div>
          <div class="shop-card-info">
            <h3 class="shop-card-title">${I18N.get('shop.doubleOrNothingTitle')}</h3>
            <p class="shop-card-desc">${I18N.get('shop.doubleOrNothingDesc')}</p>
          </div>
          <button class="btn-3d btn-buy" onclick="App.buyDoubleOrNothing()" ${inv.doubleOrNothing || gems < 50 ? 'disabled' : ''}>
            ${inv.doubleOrNothing ? `${fireBtnIcon} ${inv.doubleOrNothingDays}/7 Days` : `${gemIcon} 50`}
          </button>
        </div>
      </div>

      <!-- Mascot Outfits -->
      <h2 class="section-title mt-4">${I18N.get('shop.skinsTitle')}</h2>
      <div class="shop-grid">
        <div class="shop-card">
          <div class="shop-card-icon">🦉</div>
          <div class="shop-card-info">
            <h3>Byte (Classic)</h3>
            <p>Original friendly green coding mentor.</p>
          </div>
          <button class="btn-3d btn-equip" onclick="App.equipSkin('classic')">
            ${inv.activeSkin === 'classic' ? I18N.get('common.equipped') : I18N.get('common.equip')}
          </button>
        </div>

        <div class="shop-card">
          <div class="shop-card-icon">🤖</div>
          <div class="shop-card-info">
            <h3>Cyberpunk Byte</h3>
            <p>Futuristic neon-illuminated cyborg owl.</p>
          </div>
          <button class="btn-3d btn-equip" onclick="App.equipSkin('cyber')">
            ${inv.activeSkin === 'cyber' ? I18N.get('common.equipped') : (inv.skins.includes('cyber') ? I18N.get('common.equip') : '💎 300')}
          </button>
        </div>

        <div class="shop-card">
          <div class="shop-card-icon">🧙‍♂️</div>
          <div class="shop-card-info">
            <h3>Code Wizard Byte</h3>
            <p>Weaver of spells and master of algorithms.</p>
          </div>
          <button class="btn-3d btn-equip" onclick="App.equipSkin('wizard')">
            ${inv.activeSkin === 'wizard' ? I18N.get('common.equipped') : (inv.skins.includes('wizard') ? I18N.get('common.equip') : '💎 400')}
          </button>
        </div>
      </div>
    `;
  },

  buyStreakFreeze() {
    if (ProLingoState.data.stats.gems >= 200) {
      ProLingoState.data.stats.gems -= 200;
      ProLingoState.data.inventory.streakFreeze += 1;
      ProLingoState.save();
      SoundEngine.playGem();
      this.renderShopView();
      this.showToast('Streak Freeze purchased! Your streak is protected. 🧊');
    }
  },

  buyHeartRefill() {
    if (ProLingoState.data.stats.gems >= 100) {
      ProLingoState.data.stats.gems -= 100;
      ProLingoState.refillHeartsFull();
      SoundEngine.playGem();
      this.renderShopView();
      this.renderHeaderStats();
      this.showToast('Hearts fully restored to 5 ❤️!');
    }
  },

  buyUnlimitedHearts() {
    if (ProLingoState.data.stats.gems >= 1000) {
      ProLingoState.data.stats.gems -= 1000;
      ProLingoState.data.inventory.unlimitedHearts = true;
      ProLingoState.save();
      SoundEngine.playGem();
      this.renderShopView();
      this.renderHeaderStats();
      this.showToast('Super ProLingo unlocked! Enjoy Unlimited Hearts! ✨');
    }
  },

  buyDoubleOrNothing() {
    if (ProLingoState.data.stats.gems >= 50) {
      ProLingoState.data.stats.gems -= 50;
      ProLingoState.data.inventory.doubleOrNothing = true;
      ProLingoState.data.inventory.doubleOrNothingDays = 0;
      ProLingoState.save();
      SoundEngine.playGem();
      this.renderShopView();
      this.showToast('Double or Nothing active! Maintain a 7-day streak to win 100 gems! 🎲');
    }
  },

  equipSkin(skinName) {
    const inv = ProLingoState.data.inventory;
    if (inv.skins.includes(skinName)) {
      inv.activeSkin = skinName;
      ProLingoState.data.profile.avatar = skinName;
      ProLingoState.save();
      SoundEngine.playTap();
      this.renderShopView();
      this.renderHeaderStats();
    } else {
      const price = skinName === 'cyber' ? 300 : 400;
      if (ProLingoState.data.stats.gems >= price) {
        ProLingoState.data.stats.gems -= price;
        inv.skins.push(skinName);
        inv.activeSkin = skinName;
        ProLingoState.data.profile.avatar = skinName;
        ProLingoState.save();
        SoundEngine.playGem();
        this.renderShopView();
        this.renderHeaderStats();
        this.showToast('New Outfit unlocked! 🦉');
      } else {
        alert('Not enough gems!');
      }
    }
  },

  // ==========================================
  // VIEW: QUESTS
  // ==========================================
  getQuestTitle(q) {
    const isAr = I18N.isRTL();
    if (!isAr) return q.titleKey;
    const arMap = {
      'Earn 20 XP today': 'احصل على 20 نقطة خبرة اليوم',
      'Complete your first lesson': 'أكمل درسك الأول',
      'Score 90%+ in 1 lesson': 'حقق نسبة دقة 90%+ في درس واحد'
    };
    return arMap[q.titleKey] || q.titleKey;
  },

  renderQuestsView() {
    const container = document.getElementById('quests-container');
    if (!container) return;

    const quests = ProLingoState.data.dailyQuests || [];
    const isAr = I18N.isRTL();
    let qHtml = '';

    quests.forEach(q => {
      const pct = Math.min(100, Math.round((q.current / q.target) * 100));
      const isComplete = q.current >= q.target;
      const title = this.getQuestTitle(q);

      let actionHtml = '';
      const gemRewardIcon = (typeof Icons !== 'undefined') ? Icons.get('gem', 14) : '💎';

      if (q.claimed) {
        actionHtml = `<span class="quest-status-badge claimed">✓ ${I18N.get('common.claimed') || 'Claimed'}</span>`;
      } else if (isComplete) {
        actionHtml = `<button class="btn-3d btn-primary btn-claim animate-pulse" onclick="App.claimQuestReward('${q.id}')">${I18N.get('common.claim') || 'Claim'} ${gemRewardIcon} +${q.rewardGems}</button>`;
      } else {
        actionHtml = `
          <div class="quest-status-pill in-progress">
            <span class="quest-reward-preview">${gemRewardIcon} +${q.rewardGems}</span>
            <span class="quest-progress-text">${q.current} / ${q.target}</span>
          </div>
        `;
      }

      let chestIconHtml = '📦';
      if (typeof Icons !== 'undefined') {
        chestIconHtml = q.claimed ? Icons.get('gem', 36) : (isComplete ? Icons.get('chest', 36) : Icons.get('target', 36));
      } else {
        chestIconHtml = q.claimed ? '✨' : (isComplete ? '🎁' : '📦');
      }

      qHtml += `
        <div class="quest-card ${isComplete ? 'complete' : ''} ${q.claimed ? 'claimed-card' : ''}">
          <div class="quest-chest-icon">${chestIconHtml}</div>
          <div class="quest-content-col">
            <div class="quest-title-row">
              <h3 class="quest-title">${title}</h3>
              <span class="quest-reward-chip">${gemRewardIcon} +${q.rewardGems}</span>
            </div>
            <div class="quest-track">
              <div class="quest-fill" style="width: ${pct}%"></div>
            </div>
            <div class="quest-meta-row">
              <span class="quest-ratio-text">${q.current} / ${q.target} ${isAr ? 'مكتمل' : 'completed'}</span>
              <span class="quest-pct-text">${pct}%</span>
            </div>
          </div>
          <div class="quest-action-col">
            ${actionHtml}
          </div>
        </div>
      `;
    });

    const mq = ProLingoState.data.monthlyQuest;
    const mPct = Math.min(100, Math.round((mq.current / mq.target) * 100));

    const pageTargetIcon = (typeof Icons !== 'undefined') ? Icons.get('target', 28) : '🎯';
    const bigGemIcon = (typeof Icons !== 'undefined') ? Icons.get('gem', 48) : '💎';
    const trophyRewardIcon = (typeof Icons !== 'undefined') ? Icons.get('trophy', 16) : '🏆';
    const lightningSectionIcon = (typeof Icons !== 'undefined') ? Icons.get('lightning', 22) : '⚡';
    const timerResetIcon = (typeof Icons !== 'undefined') ? Icons.get('timer', 16) : '⏱️';

    container.innerHTML = `
      <div class="page-header-box">
        <h1 class="page-title">${pageTargetIcon} ${I18N.get('quests.title')}</h1>
        <p class="page-subtitle">${I18N.get('quests.subtitle')}</p>
      </div>

      <div class="monthly-badge-challenge">
        <div class="badge-big-icon-wrap">
          <div class="badge-big-icon">${bigGemIcon}</div>
        </div>
        <div class="challenge-text">
          <div class="challenge-badge-tag">${isAr ? 'وسام التحدي الشهري الحصري' : 'EXCLUSIVE MONTHLY BADGE'}</div>
          <h3>${I18N.get('quests.monthlyTitle')}</h3>
          <p>${I18N.get('quests.monthlyDesc')}</p>
          <div class="quest-track mt-2">
            <div class="quest-fill monthly-fill" style="width: ${mPct}%"></div>
          </div>
          <div class="challenge-meta-row">
            <span class="quest-ratio-text"><strong>${mq.current}</strong> / ${mq.target} ${isAr ? 'مهام مكتملة' : 'Quests Completed'}</span>
            <span class="challenge-reward-label">${trophyRewardIcon} ${isAr ? 'وسام خبير بايثون الألماسي' : 'Diamond Python Badge'}</span>
          </div>
        </div>
      </div>

      <div class="quests-section-head mt-4">
        <h2 class="section-title">${lightningSectionIcon} ${isAr ? 'تحديات اليوم' : "Today's Challenges"}</h2>
        <span class="reset-timer-tag">${timerResetIcon} ${isAr ? 'تتجدد يومياً' : 'Resets Daily'}</span>
      </div>
      <div class="quests-list mt-2">
        ${qHtml}
      </div>
    `;
  },

  claimQuestReward(questId) {
    if (ProLingoState.claimQuest(questId)) {
      this.renderQuestsView();
      this.renderHeaderStats();
      this.showToast('Quest claimed! 💎');
    }
  },

  // ==========================================
  // VIEW: PROFILE
  // ==========================================
  renderProfileView() {
    const container = document.getElementById('profile-container');
    if (!container) return;

    const { profile, stats, league, completedLessons } = ProLingoState.data;
    const tierNames = I18N.translations[I18N.currentLang].leagues.tierNames;
    const currentTier = tierNames[league.tierIndex] || 'Bronze';

    // Calculate completed Python units
    const pythonCompleted = completedLessons.python || [];
    const pyCourse = CURRICULUM.getCourse('python');
    let completedUnitsCount = 0;
    (pyCourse.units || []).forEach(u => {
      if (u.lessons.every(l => pythonCompleted.includes(l.id))) {
        completedUnitsCount++;
      }
    });

    const avgAccuracy = stats.accuracyCount > 0 ? Math.round(stats.accuracySum / stats.accuracyCount) : 100;

    const avatarDisplay = profile.avatarImage
      ? `<img src="${profile.avatarImage}" class="profile-avatar-large-img" alt="Avatar">`
      : `<span class="profile-avatar-large">${this.getAvatarIcon(profile.avatar)}</span>`;

    container.innerHTML = `
      <div class="profile-header-card">
        <div class="profile-avatar-wrap clickable-avatar" onclick="App.openEditProfileModal()" title="Click to edit profile & avatar">
          ${avatarDisplay}
        </div>
        <div class="profile-user-info">
          <div class="profile-name-row">
            <h1 class="profile-display-name">${profile.name}</h1>
            ${profile.isGoogle ? '<span class="google-badge">✓ Google Verified</span>' : ''}
          </div>
          <span class="profile-handle">@${profile.name.toLowerCase().replace(/\\s+/g, '_')}</span>
          <p class="profile-bio">${profile.bio}</p>
          <span class="profile-date">📅 ${I18N.get('profile.memberSince')} ${profile.joinedDate}</span>

          <div class="profile-actions-bar mt-3">
            <button class="btn-3d btn-secondary btn-sm" onclick="App.openEditProfileModal()">✏️ Edit Profile</button>
            <button class="btn-3d btn-outline btn-sm" onclick="App.openGoogleSignInModal()">
              <svg width="14" height="14" viewBox="0 0 24 24" style="vertical-align: middle; margin-right: 4px;"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
              Google Account
            </button>
            <button class="btn-3d btn-outline btn-sm" onclick="App.openSwitchAccountModal()">🔄 Switch User</button>
          </div>
        </div>
      </div>

      <!-- 100 Python Units Progress Banner -->
      <div class="profile-curriculum-card mt-3">
        <div class="curr-card-head">
          <span>🐍 Python 100-Unit Mastery</span>
          <strong>${completedUnitsCount} / 100 Units (${completedUnitsCount}%)</strong>
        </div>
        <div class="curr-progress-track">
          <div class="curr-progress-fill" style="width: ${completedUnitsCount}%;"></div>
        </div>
      </div>

      <h2 class="section-title mt-4">${I18N.get('profile.statsSection')}</h2>
      <div class="profile-stats-grid">
        <div class="stat-card">
          <span class="stat-icon">${(typeof Icons !== 'undefined') ? Icons.get('fire', 26) : '🔥'}</span>
          <span class="stat-val">${stats.streak}</span>
          <span class="stat-label">${I18N.get('stats.streak')}</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">${(typeof Icons !== 'undefined') ? Icons.get('lightning', 26) : '⚡'}</span>
          <span class="stat-val">${stats.xp}</span>
          <span class="stat-label">${I18N.get('stats.xp')}</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">${(typeof Icons !== 'undefined') ? Icons.get('trophy', 26) : '🏆'}</span>
          <span class="stat-val">${currentTier}</span>
          <span class="stat-label">${I18N.get('stats.league')}</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">${(typeof Icons !== 'undefined') ? Icons.get('target', 26) : '🎯'}</span>
          <span class="stat-val">${avgAccuracy}%</span>
          <span class="stat-label">${I18N.get('stats.accuracy')}</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">${(typeof Icons !== 'undefined') ? Icons.get('gem', 26) : '💎'}</span>
          <span class="stat-val">${stats.gems}</span>
          <span class="stat-label">${I18N.get('stats.gems')}</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">${(typeof Icons !== 'undefined') ? Icons.get('book', 26) : '📜'}</span>
          <span class="stat-val">${stats.totalLessonsCompleted}</span>
          <span class="stat-label">${I18N.get('stats.completedLessons')}</span>
        </div>
      </div>

      <!-- Achievements -->
      <h2 class="section-title mt-4">${I18N.get('profile.achievementsSection')}</h2>
      <div class="achievements-shelf">
        <div class="achievement-card">
          <div class="ach-icon">${(typeof Icons !== 'undefined') ? Icons.get('fire', 34) : '🔥'}</div>
          <div class="ach-info">
            <h4>${I18N.get('achievements.wildfire.title')}</h4>
            <p>${I18N.get('achievements.wildfire.desc', { n: 7 })}</p>
            <div class="ach-bar"><div class="ach-fill" style="width: ${Math.min(100, (stats.streak / 7) * 100)}%"></div></div>
          </div>
        </div>

        <div class="achievement-card">
          <div class="ach-icon">${(typeof Icons !== 'undefined') ? Icons.get('lightning', 34) : '⚡'}</div>
          <div class="ach-info">
            <h4>${I18N.get('achievements.sage.title')}</h4>
            <p>${I18N.get('achievements.sage.desc', { n: 500 })}</p>
            <div class="ach-bar"><div class="ach-fill" style="width: ${Math.min(100, (stats.xp / 500) * 100)}%"></div></div>
          </div>
        </div>

        <div class="achievement-card">
          <div class="ach-icon">${(typeof Icons !== 'undefined') ? Icons.get('python', 34) : '🐍'}</div>
          <div class="ach-info">
            <h4>Python Pioneer</h4>
            <p>Complete 20 Python Units</p>
            <div class="ach-bar"><div class="ach-fill" style="width: ${Math.min(100, (completedUnitsCount / 20) * 100)}%"></div></div>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================
  // VIEW: PRACTICE
  // ==========================================
  renderPracticeView() {
    const container = document.getElementById('practice-container');
    if (!container) return;

    const heartPractIcon = (typeof Icons !== 'undefined') ? Icons.get('heart_practice', 44) : '❤️';
    const lightningIcon = (typeof Icons !== 'undefined') ? Icons.get('lightning', 44) : '⚡';

    container.innerHTML = `
      <h1 class="page-title">${I18N.get('practice.title')}</h1>
      <p class="page-subtitle">${I18N.get('practice.subtitle')}</p>

      <div class="practice-cards-grid mt-4">
        <div class="practice-card" onclick="LessonRunner.startPractice()">
          <div class="p-icon">${heartPractIcon}</div>
          <div class="p-info">
            <h3>${I18N.get('practice.heartPracticeTitle')}</h3>
            <p>${I18N.get('practice.heartPracticeDesc')}</p>
          </div>
          <button class="btn-3d btn-primary">${I18N.get('common.practice')}</button>
        </div>

        <div class="practice-card" onclick="LessonRunner.startPractice()">
          <div class="p-icon">${lightningIcon}</div>
          <div class="p-info">
            <h3>${I18N.get('practice.speedRunTitle')}</h3>
            <p>${I18N.get('practice.speedRunDesc')}</p>
          </div>
          <button class="btn-3d btn-secondary">${I18N.get('common.start')}</button>
        </div>
      </div>
    `;
  },

  // ==========================================
  // VIEW: SETTINGS
  // ==========================================
  renderSettingsView() {
    const container = document.getElementById('settings-container');
    if (!container) return;

    const currentTheme = ProLingoState.data.settings.theme;
    const isEn = I18N.currentLang === 'en';

    container.innerHTML = `
      <h1 class="page-title">${I18N.get('settings.title')}</h1>

      <div class="settings-group">
        <h3>Account & Profile</h3>
        <div class="setting-row">
          <div>
            <strong>${ProLingoState.data.profile.name}</strong>
            <p>${ProLingoState.data.profile.email || 'Local Account'}</p>
          </div>
          <button class="btn-3d btn-secondary btn-sm" onclick="App.openEditProfileModal()">Edit Profile</button>
        </div>
      </div>

      <div class="settings-group">
        <h3>${I18N.get('settings.appearance')}</h3>
        
        <div class="setting-row">
          <div>
            <strong>${I18N.get('settings.language')}</strong>
            <p>${isEn ? 'English (Default)' : 'العربية'}</p>
          </div>
          <div class="toggle-buttons-group">
            <button class="btn-toggle ${isEn ? 'active' : ''}" onclick="App.setLanguage('en')">English</button>
            <button class="btn-toggle ${!isEn ? 'active' : ''}" onclick="App.setLanguage('ar')">العربية</button>
          </div>
        </div>

        <div class="setting-row">
          <div>
            <strong>${I18N.get('settings.theme')}</strong>
            <p>${currentTheme === 'dark' ? I18N.get('settings.dark') : I18N.get('settings.light')}</p>
          </div>
          <div class="toggle-buttons-group">
            <button class="btn-toggle ${currentTheme === 'dark' ? 'active' : ''}" onclick="App.applyTheme('dark'); App.renderSettingsView();">Dark</button>
            <button class="btn-toggle ${currentTheme === 'light' ? 'active' : ''}" onclick="App.applyTheme('light'); App.renderSettingsView();">Light</button>
          </div>
        </div>

        <div class="setting-row">
          <div>
            <strong>${I18N.get('settings.soundEffects')}</strong>
            <p>${I18N.get('settings.soundDesc')}</p>
          </div>
          <input type="checkbox" id="check-sound" ${SoundEngine.enabled ? 'checked' : ''} onchange="App.toggleSound(this.checked)">
        </div>

        <div class="setting-row">
          <div>
            <strong>⚡ Super ProLingo (Unlimited Hearts)</strong>
            <p>Practice without losing hearts on mistakes</p>
          </div>
          <input type="checkbox" id="check-unlimited" ${ProLingoState.hasUnlimitedHearts() ? 'checked' : ''} onchange="App.toggleUnlimitedHearts(this.checked)">
        </div>
      </div>

      <div class="settings-group danger-zone">
        <h3>${I18N.get('settings.dangerZone')}</h3>
        <div class="setting-row">
          <div>
            <strong>${I18N.get('settings.resetData')}</strong>
            <p>Start fresh from Unit 1 Lesson 1</p>
          </div>
          <button class="btn-3d btn-danger" onclick="App.confirmResetAll()">${I18N.get('settings.resetData')}</button>
        </div>
      </div>
    `;
  },

  toggleUnlimitedHearts(enabled) {
    ProLingoState.data.inventory.unlimitedHearts = enabled;
    ProLingoState.save();
    this.renderHeaderStats();
    SoundEngine.playTap();
  },

  setLanguage(lang) {
    I18N.setLanguage(lang);
    ProLingoState.data.settings.uiLang = lang;
    ProLingoState.save();
    this.renderHeaderStats();
    this.renderCurrentView();
  },

  toggleSound(enabled) {
    SoundEngine.enabled = enabled;
    ProLingoState.data.settings.soundEnabled = enabled;
    ProLingoState.save();
  },

  confirmResetAll() {
    if (confirm('Are you sure you want to reset all progress for this user? You will start fresh at 0 XP.')) {
      ProLingoState.resetAll();
    }
  },

  // ==========================================
  // MODALS & USER ACCOUNTS LOGIC
  // ==========================================
  toggleUserDropdown(forceState) {
    const menu = document.getElementById('user-dropdown-menu');
    if (!menu) return;
    if (forceState !== undefined) {
      if (forceState) menu.classList.remove('hidden');
      else menu.classList.add('hidden');
    } else {
      menu.classList.toggle('hidden');
    }
  },

  openGoogleSignInModal() {
    document.getElementById('google-signin-modal').classList.remove('hidden');
    this.renderOfficialGoogleButton();
  },

  initGoogleIdentityServices() {
    const setupGIS = () => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: '1064297072044-prolingo.apps.googleusercontent.com',
            callback: (res) => this.handleGoogleCredentialResponse(res),
            auto_select: false,
            cancel_on_tap_outside: true
          });
          this.renderOfficialGoogleButton();
        } catch (err) {
          console.warn('Google Identity Services notice:', err);
        }
      }
    };

    if (window.google && window.google.accounts && window.google.accounts.id) {
      setupGIS();
    } else {
      window.addEventListener('load', () => setTimeout(setupGIS, 600));
    }
  },

  renderOfficialGoogleButton() {
    const slot = document.getElementById('official-google-btn-slot');
    if (!slot || slot.children.length > 0) return;
    if (window.google && window.google.accounts && window.google.accounts.id) {
      try {
        window.google.accounts.id.renderButton(slot, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'pill',
          text: 'signin_with',
          logo_alignment: 'left',
          width: 320
        });
      } catch (e) {
        console.warn('GIS renderButton error:', e);
      }
    }
  },

  handleGoogleCredentialResponse(response) {
    if (!response || !response.credential) return;
    try {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const profile = JSON.parse(jsonPayload);

      ProLingoState.loginWithGoogle({
        name: profile.name || profile.given_name || 'Google Learner',
        email: profile.email || '',
        avatarImage: profile.picture || null
      });

      const modal = document.getElementById('google-signin-modal');
      if (modal) modal.classList.add('hidden');
      this.showToast(`Official Google Sign-In: Welcome, ${profile.name}! 🚀`);
    } catch (e) {
      console.error('Error parsing Google credential JWT:', e);
      this.showToast('Signed in with Google Account.');
    }
  },

  loginWithPreset(name, email) {
    ProLingoState.loginWithGoogle({
      name: name,
      email: email,
      avatarImage: null
    });
    document.getElementById('google-signin-modal').classList.add('hidden');
    this.showToast(`Welcome, ${name}! Signed in with Google. 🚀`);
  },

  handleAvatarFileSelect(input, previewElementId) {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    if (window.ImageCropper) {
      ImageCropper.open(file, previewElementId);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const preview = document.getElementById(previewElementId);
        if (preview) {
          preview.innerHTML = `<img src="${dataUrl}" class="avatar-preview-img" alt="Preview">`;
          preview.dataset.avatarImage = dataUrl;
          delete preview.dataset.presetAvatar;
        }
        if (previewElementId === 'edit-avatar-preview') {
          if (window.ProLingoState && ProLingoState.data && ProLingoState.data.profile) {
            ProLingoState.data.profile.avatarImage = dataUrl;
            ProLingoState.save();
            if (window.App && window.App.renderHeaderStats) {
              window.App.renderHeaderStats();
              window.App.renderCurrentView();
            }
          }
        }
      };
      reader.readAsDataURL(file);
    }
  },

  submitGoogleSignIn() {
    const nameInput = document.getElementById('google-input-name');
    const emailInput = document.getElementById('google-input-email');
    const preview = document.getElementById('google-avatar-preview');

    const name = (nameInput && nameInput.value.trim()) || 'Google Coder';
    const email = (emailInput && emailInput.value.trim()) || 'coder@gmail.com';
    const avatarImage = (preview && preview.dataset.avatarImage) || null;

    ProLingoState.loginWithGoogle({
      name: name,
      email: email,
      avatarImage: avatarImage
    });

    document.getElementById('google-signin-modal').classList.add('hidden');
    this.showToast(`Signed in successfully as ${name}! 🎉`);
  },

  openEditProfileModal() {
    const prof = ProLingoState.data.profile;
    const nameInput = document.getElementById('edit-profile-name');
    const bioInput = document.getElementById('edit-profile-bio');
    const preview = document.getElementById('edit-avatar-preview');

    if (nameInput) nameInput.value = prof.name;
    if (bioInput) bioInput.value = prof.bio;
    if (preview) {
      delete preview.dataset.presetAvatar;
      if (prof.avatarImage) {
        preview.innerHTML = `<img src="${prof.avatarImage}" class="avatar-preview-img" alt="Profile">`;
        preview.dataset.avatarImage = prof.avatarImage;
      } else {
        preview.innerHTML = this.getAvatarIcon(prof.avatar);
        delete preview.dataset.avatarImage;
      }
    }

    document.getElementById('edit-profile-modal').classList.remove('hidden');
  },

  setEditPresetAvatar(avatarKey) {
    const preview = document.getElementById('edit-avatar-preview');
    if (preview) {
      preview.innerHTML = this.getAvatarIcon(avatarKey);
      preview.dataset.avatarImage = '';
      preview.dataset.presetAvatar = avatarKey;
    }
  },

  saveProfileEdits() {
    const nameInput = document.getElementById('edit-profile-name');
    const bioInput = document.getElementById('edit-profile-bio');
    const preview = document.getElementById('edit-avatar-preview');

    const name = nameInput ? nameInput.value.trim() : '';
    const bio = bioInput ? bioInput.value.trim() : '';
    const presetAvatar = preview ? preview.dataset.presetAvatar : undefined;
    const rawAvatarImage = preview ? preview.dataset.avatarImage : undefined;

    let avatarImage = undefined;
    if (presetAvatar) {
      avatarImage = null;
    } else if (rawAvatarImage) {
      avatarImage = rawAvatarImage;
    }

    ProLingoState.updateProfile({
      name: name || undefined,
      bio: bio,
      avatar: presetAvatar || undefined,
      avatarImage: avatarImage
    });

    document.getElementById('edit-profile-modal').classList.add('hidden');
    const isAr = (window.I18N && I18N.isRTL && I18N.isRTL());
    this.showToast(isAr ? 'تم تحديث الملف الشخصي بنجاح! ✨' : 'Profile updated successfully! ✨');
  },

  openSwitchAccountModal() {
    const container = document.getElementById('switch-accounts-list');
    if (!container) return;

    const registry = ProLingoState.getUsersRegistry();
    const activeId = ProLingoState.activeUserId;

    let html = '';
    registry.forEach(user => {
      const isCurrent = user.id === activeId;
      const avatarHtml = user.avatarImage 
        ? `<img src="${user.avatarImage}" class="avatar-round-image mini" alt="Avatar">`
        : `<span class="avatar-emoji">${this.getAvatarIcon(user.avatar)}</span>`;

      html += `
        <div class="account-switch-card ${isCurrent ? 'active' : ''}" onclick="App.handleSwitchUser('${user.id}')">
          <div class="switch-card-avatar">${avatarHtml}</div>
          <div class="switch-card-meta">
            <strong>${user.name}</strong>
            <span>${user.email || 'Local User'} • ${user.xp} XP</span>
          </div>
          ${isCurrent ? '<span class="active-acc-pill">ACTIVE</span>' : ''}
        </div>
      `;
    });

    container.innerHTML = html;
    document.getElementById('switch-user-modal').classList.remove('hidden');
  },

  handleSwitchUser(userId) {
    ProLingoState.switchAccount(userId);
    document.getElementById('switch-user-modal').classList.add('hidden');
    this.showToast(`Switched account to ${ProLingoState.data.profile.name}! 🔄`);
  },

  handleCreateNewUser() {
    const fresh = ProLingoState.createNewAccount('New Pythonista', false, '', null);
    this.showToast(`Started fresh as ${fresh.profile.name}! All 100 units reset to zero.`);
  },

  showToast(message, duration = 3000) {
    const toast = document.getElementById('app-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.classList.add('hidden'), 300);
    }, duration);
  },

  // Course Selector Modal (Python Active + 9 Coming Soon)
  openCourseSelectorModal() {
    const modal = document.getElementById('course-selector-modal');
    const container = document.getElementById('course-grid-container');

    let html = '';
    CURRICULUM.languages.forEach(lang => {
      const isSelected = ProLingoState.data.currentCourse === lang.id;
      const isComingSoon = Boolean(lang.comingSoon);

      let badgeHtml = '';
      if (lang.badge === '100 UNITS') {
        badgeHtml = '<span class="course-badge active-badge">🔥 100 UNITS</span>';
      } else if (isComingSoon) {
        badgeHtml = '<span class="course-badge coming-soon-badge">🚀 COMING SOON</span>';
      }

      html += `
        <div class="course-card-modal ${isSelected ? 'selected' : ''} ${isComingSoon ? 'course-coming-soon' : ''}" 
             onclick="${isComingSoon ? `App.showComingSoon('${lang.name}')` : `App.selectCourse('${lang.id}')`}">
          <span class="course-modal-icon">${lang.icon}</span>
          <div class="course-modal-text">
            <h4>${lang.name} ${badgeHtml}</h4>
            <span>${lang.tag}</span>
          </div>
          ${isSelected ? '<span class="course-selected-checkmark">✓</span>' : ''}
        </div>
      `;
    });

    container.innerHTML = html;
    modal.classList.remove('hidden');
  },

  showComingSoon(langName) {
    alert(`🚀 ${langName} is Coming Soon!\n\nOur curriculum team is currently laser-focused on Python to deliver the #1 Python learning journey with 100 in-depth Units!\n\nStay tuned for the next major release! 🐍`);
  },

  selectCourse(courseId) {
    ProLingoState.data.currentCourse = courseId;
    ProLingoState.save();
    document.getElementById('course-selector-modal').classList.add('hidden');
    this.renderHeaderStats();
    this.renderLearnView();
    SoundEngine.playTap();
  },

  // Heart Regeneration Ticker (1 heart every 10 minutes)
  startHeartTicker() {
    if (this.heartTickerInterval) return;
    this.heartTickerInterval = setInterval(() => {
      this.tickHeartRegen();
    }, 1000);
  },

  tickHeartRegen() {
    if (!window.ProLingoState || !ProLingoState.data) return;
    const changed = ProLingoState.checkHeartRegen();
    if (changed) {
      this.renderHeaderStats();
      if (this.currentView === 'shop') this.renderShopView();
      const lr = window.LessonRunner || (typeof LessonRunner !== 'undefined' ? LessonRunner : null);
      if (lr && lr.currentLesson && typeof lr.updateHeartsUI === 'function') {
        lr.updateHeartsUI();
      }
    }
    this.updateHeartsModalCountdown();
  },

  updateHeartsModalCountdown() {
    if (!window.ProLingoState || !ProLingoState.data) return;
    const cdText = ProLingoState.getHeartRegenCountdownText();
    const isAr = I18N.isRTL();
    const isFull = ProLingoState.hasUnlimitedHearts() || ProLingoState.data.stats.hearts >= ProLingoState.data.stats.maxHearts;

    const timerSpan = document.getElementById('hearts-countdown-timer');
    if (timerSpan) {
      timerSpan.textContent = isFull ? (isAr ? 'ممتلئة بالكامل' : 'Full') : (cdText || '10:00');
    }

    const modalBadge = document.getElementById('hearts-modal-countdown');
    if (modalBadge) {
      modalBadge.style.display = isFull ? 'none' : 'inline-flex';
    }

    const heartsBadge = document.getElementById('stat-hearts-badge');
    if (heartsBadge && !isFull && cdText) {
      heartsBadge.title = isAr 
        ? `القلوب: ${ProLingoState.data.stats.hearts}/5 • القلب القادم خلال ${cdText} (قلب كل 10 دقائق)`
        : `Hearts: ${ProLingoState.data.stats.hearts}/5 • Next heart in ${cdText} (1 heart / 10m)`;
    }
  },

  openHeartsModal() {
    const modal = document.getElementById('hearts-refill-modal');
    if (!modal) return;

    const { hearts, maxHearts, gems } = ProLingoState.data.stats;
    const hasUnlimited = ProLingoState.hasUnlimitedHearts();
    const isAr = I18N.isRTL();
    const cdText = ProLingoState.getHeartRegenCountdownText();
    const isFull = hasUnlimited || hearts >= maxHearts;

    let heartsSvgRow = '';
    for (let i = 0; i < maxHearts; i++) {
      if (i < hearts) {
        heartsSvgRow += (typeof Icons !== 'undefined') ? Icons.get('heart', 30) : '❤️ ';
      } else {
        heartsSvgRow += (typeof Icons !== 'undefined') ? Icons.get('heart_empty', 30) : '🖤 ';
      }
    }

    const heroIcon = hasUnlimited 
      ? ((typeof Icons !== 'undefined') ? Icons.get('super', 56) : '⚡')
      : ((typeof Icons !== 'undefined') ? (hearts === 0 ? Icons.get('heart_empty', 56) : Icons.get('heart', 56)) : (hearts === 0 ? '💔' : '❤️'));

    const gemBtnIcon = (typeof Icons !== 'undefined') ? Icons.get('gem', 18) : '💎';
    const practBtnIcon = (typeof Icons !== 'undefined') ? Icons.get('heart_practice', 20) : '🎯';
    const timerTagIcon = (typeof Icons !== 'undefined') ? Icons.get('timer', 16) : '⏱️';

    modal.innerHTML = `
      <div class="modal-dialog hearts-refill-dialog" style="text-align: center; max-width: 440px;">
        <div class="modal-header" style="justify-content: flex-end; padding: 0 0 10px;">
          <button class="modal-close-btn" onclick="document.getElementById('hearts-refill-modal').classList.add('hidden')">✕</button>
        </div>
        <div style="margin-bottom: 12px; display: flex; justify-content: center;">${heroIcon}</div>
        <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 6px;">
          ${hasUnlimited ? (isAr ? 'قلوب غير محدودة نشطة! ⚡' : 'Unlimited Hearts Active! ⚡') : (hearts === 0 ? I18N.get('lesson.outOfHeartsTitle') : (isAr ? 'حالة القلوب' : 'Hearts Status'))}
        </h2>

        <div style="display: flex; justify-content: center; gap: 8px; margin: 12px 0 6px;">
          ${hasUnlimited ? ((typeof Icons !== 'undefined') ? Icons.get('super', 28) : '⚡') : heartsSvgRow}
        </div>
        <p style="font-weight: 700; color: var(--text-main); margin-bottom: 12px;">
          ${hasUnlimited ? (isAr ? 'سوبر برو لينجو' : 'Super ProLingo') : `${hearts} / ${maxHearts} ${isAr ? 'قلوب متوفرة' : 'Hearts Available'}`}
        </p>

        <!-- Regeneration Timer Tag (1 heart every 10 min) -->
        <div id="hearts-modal-countdown" class="hearts-countdown-badge" style="display: ${isFull ? 'none' : 'inline-flex'};">
          <span>${timerTagIcon} ${isAr ? 'القلب القادم خلال:' : 'Next heart in:'}</span>
          <strong id="hearts-countdown-timer">${cdText || '10:00'}</strong>
          <span class="regen-rate-sub">(${isAr ? 'قلب جديد كل 10 دقائق' : '1 heart every 10 min'})</span>
        </div>

        <p style="color: var(--text-muted); font-size: 14px; margin: 12px 0 20px; line-height: 1.5;">
          ${isAr 
            ? 'تتجدد القلوب تلقائياً بمعدل قلب جديد كل 10 دقائق حتى تكتمل، أو يمكنك ملؤها فوراً بالجواهر أو التدريب المجاني بدون خسارة أي قلوب!' 
            : 'Hearts regenerate automatically at 1 heart every 10 minutes until full, or you can refill instantly with gems or safe practice without losing hearts!'}
        </p>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button class="btn-3d btn-primary" onclick="App.buyHeartRefill();" ${gems < 100 || isFull ? 'disabled' : ''}>
            ${gemBtnIcon} ${isAr ? 'ملء القلوب فوراً (100 جوهرة)' : 'Refill Hearts Full (100 Gems)'}
          </button>
          <button class="btn-3d btn-secondary" onclick="document.getElementById('hearts-refill-modal').classList.add('hidden'); App.startPracticeSession();">
            ${practBtnIcon} ${isAr ? 'تدرب لاستعادة قلوب مجاناً (بدون خصم)' : 'Practice to Earn Hearts (Safe)'}
          </button>
          <button class="btn-3d btn-sheet" style="background: none; border: 2px solid var(--border-color); color: var(--text-muted); padding: 10px;" onclick="document.getElementById('hearts-refill-modal').classList.add('hidden')">
            ${I18N.get('common.close')}
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    SoundEngine.playTap();
  },

  buyHeartRefill() {
    if (ProLingoState.data.stats.gems >= 100) {
      ProLingoState.data.stats.gems -= 100;
      ProLingoState.refillHeartsFull();
      this.renderHeaderStats();
      this.openHeartsModal();
      this.showToast(I18N.isRTL() ? 'تم ملء جميع القلوب بنجاح! ❤️' : 'Hearts refilled to full! ❤️');
      if (window.SoundEngine) SoundEngine.playVictory();
    } else {
      this.showToast(I18N.isRTL() ? 'لا توجد جواهر كافية! تدرب لكسب المزيد' : 'Not enough gems! Practice to earn more.');
    }
  },

  startPracticeSession() {
    const lr = window.LessonRunner || (typeof LessonRunner !== 'undefined' ? LessonRunner : null);
    if (lr && typeof lr.startPractice === 'function') {
      lr.startPractice();
    } else {
      this.switchView('learn');
    }
  },

  // Unit Guidebook & Learning Outcomes Modal (Duolingo Style)
  openGuidebookModal(courseId, unitId) {
    const course = CURRICULUM.getCourse(courseId || 'python');
    const unit = (course.units || []).find(u => u.id === unitId);
    if (!unit) return;

    const modal = document.getElementById('guidebook-modal');
    if (!modal) return;
    const titleEl = document.getElementById('guidebook-modal-title');
    const contentEl = document.getElementById('guidebook-modal-content');
    const isAr = I18N.isRTL();

    const gb = unit.guidebook || {};
    const unitTitle = (isAr && unit.title_ar) ? unit.title_ar : unit.title;
    const unitDesc = (isAr && unit.description_ar) ? unit.description_ar : unit.description;

    if (titleEl) {
      titleEl.textContent = `${isAr ? 'دليل وقواعد الوحدة' : 'Unit Guidebook'} ${unit.number}`;
    }

    const outcomes = (isAr && gb.outcomes_ar) ? gb.outcomes_ar : (gb.outcomes || [
      `Master the core rules and syntax of ${unitTitle}.`,
      `Understand how Python evaluates ${unitTitle} in memory.`,
      `Apply clean idiomatic PEP 8 practices in ${unitTitle}.`
    ]);

    const rules = (isAr && gb.rules_ar) ? gb.rules_ar : (gb.rules || [
      {
        title: `1. Core Rule: ${unitTitle}`,
        explanation: unitDesc,
        syntax: `# Python syntax for ${unitTitle}`
      }
    ]);

    const codeSnippet = gb.code_example || `# Python Demo for Unit ${unit.number}\nprint("Learning ${unitTitle}!")`;
    const proTip = (isAr && gb.pro_tip_ar) ? gb.pro_tip_ar : (gb.pro_tip || (isAr ? 'احرص دائماً على وضوح الكود واتباع أفضل الممارسات.' : 'Always prioritize clear, readable code and follow PEP 8 standards.'));

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    const outcomesHtml = outcomes.map(o => `
      <li class="outcome-item">
        <span class="outcome-icon">✓</span>
        <span class="outcome-text">${escapeHtml(o)}</span>
      </li>
    `).join('');

    const rulesHtml = rules.map((r, idx) => `
      <div class="rule-card">
        <div class="rule-card-header">
          <span class="rule-card-num">${idx + 1}</span>
          <h4 class="rule-card-title">${escapeHtml(r.title)}</h4>
        </div>
        <p class="rule-card-desc">${escapeHtml(r.explanation)}</p>
        ${r.syntax ? `<div class="rule-card-syntax"><code>${escapeHtml(r.syntax)}</code></div>` : ''}
      </div>
    `).join('');

    const gbOutcomesIcon = (typeof Icons !== 'undefined') ? Icons.get('target', 22) : '🎯';
    const gbRulesIcon = (typeof Icons !== 'undefined') ? Icons.get('rules', 22) : '📐';
    const gbCodeIcon = (typeof Icons !== 'undefined') ? Icons.get('code', 22) : '💻';
    const gbBulbIcon = (typeof Icons !== 'undefined') ? Icons.get('bulb', 26) : '💡';
    const gbHeroIcon = (typeof Icons !== 'undefined') ? Icons.get('python', 36) : (unit.icon || '🐍');

    if (contentEl) {
      contentEl.innerHTML = `
        <div class="guidebook-dialog-body">
          <div class="guidebook-hero" style="--gb-accent: ${unit.bannerColor || 'var(--green)'};">
            <div class="gb-badge">${isAr ? 'الوحدة' : 'UNIT'} ${unit.number} / 100</div>
            <h2 class="gb-hero-title">${gbHeroIcon} ${escapeHtml(unitTitle)}</h2>
            <p class="gb-hero-desc">${escapeHtml(unitDesc)}</p>
          </div>

          <!-- Section 1: Learning Outcomes -->
          <div class="gb-section-block">
            <h3 class="gb-section-title">
              <span class="gb-title-icon">${gbOutcomesIcon}</span>
              ${isAr ? 'مخرجات التعلم (Learning Outcomes)' : 'Learning Outcomes'}
            </h3>
            <ul class="gb-outcomes-list">
              ${outcomesHtml}
            </ul>
          </div>

          <!-- Section 2: Unit Rules & Syntax -->
          <div class="gb-section-block">
            <h3 class="gb-section-title">
              <span class="gb-title-icon">${gbRulesIcon}</span>
              ${isAr ? 'القواعد النحوية والاصطلاحية للوحدة' : 'Key Rules & Syntax'}
            </h3>
            <div class="gb-rules-stack">
              ${rulesHtml}
            </div>
          </div>

          <!-- Section 3: Practical Code Example -->
          <div class="gb-section-block">
            <h3 class="gb-section-title">
              <span class="gb-title-icon">${gbCodeIcon}</span>
              ${isAr ? 'كود توضيحي للقواعد' : 'Practical Code Example'}
            </h3>
            <div class="gb-terminal-box">
              <div class="editor-header">
                <span class="editor-dot red"></span>
                <span class="editor-dot yellow"></span>
                <span class="editor-dot green"></span>
                <span class="editor-lang-tag">python • unit_${unit.number}.py</span>
              </div>
              <pre class="gb-code-pre"><code>${escapeHtml(codeSnippet)}</code></pre>
            </div>
          </div>

          <!-- Section 4: Pro Tip -->
          <div class="gb-protip-box">
            <span class="gb-protip-icon">${gbBulbIcon}</span>
            <div class="gb-protip-body">
              <strong>${isAr ? 'نصيحة الخبراء (Pythonic Pro Tip)' : 'Pythonic Pro Tip'}</strong>
              <p>${escapeHtml(proTip)}</p>
            </div>
          </div>

          <!-- Footer Button -->
          <div class="gb-footer-action mt-4">
            <button class="btn-3d btn-primary btn-block" onclick="document.getElementById('guidebook-modal').classList.add('hidden')">
              ${isAr ? 'فهمت القواعد! لنبدأ التدريب' : "Got it! Let's Practice"}
            </button>
          </div>
        </div>
      `;
    }

    modal.classList.remove('hidden');
    if (window.SoundEngine) SoundEngine.playTap();
  },

  getAvatarIcon(avatarType) {
    switch (avatarType) {
      case 'cyber': return '🤖';
      case 'wizard': return '🧙‍♂️';
      case 'hacker': return '🥷';
      case 'snake': return '🐍';
      case 'star': return '⭐';
      default: return '🦉';
    }
  }
};

// Auto-boot when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
