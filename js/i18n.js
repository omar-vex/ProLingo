/**
 * ProLingo: Bilingual Internationalization (i18n)
 * Default language: English ('en') with complete Arabic ('ar') RTL support.
 */

const I18N = {
  currentLang: 'en', // English by default

  translations: {
    en: {
      appName: 'ProLingo',
      appTagline: 'Learn to code like Duolingo',
      nav: {
        learn: 'Learn',
        leagues: 'Leaderboards',
        quests: 'Quests',
        shop: 'Shop',
        profile: 'Profile',
        practice: 'Practice',
        settings: 'Settings'
      },
      stats: {
        streak: 'Day Streak',
        gems: 'Gems',
        hearts: 'Hearts',
        unlimited: 'Unlimited',
        xp: 'Total XP',
        accuracy: 'Accuracy',
        league: 'Current League',
        completedLessons: 'Lessons Completed'
      },
      common: {
        continue: 'Continue',
        check: 'Check',
        skip: 'Skip',
        gotIt: 'Got it',
        cancel: 'Cancel',
        quit: 'Quit',
        quitConfirm: 'Are you sure you want to quit? All progress in this lesson will be lost!',
        stay: 'Keep Learning',
        leave: 'Quit Lesson',
        locked: 'Locked',
        start: 'START',
        review: 'REVIEW',
        practice: 'PRACTICE',
        completed: 'Completed',
        unit: 'Unit',
        guidebook: 'Guidebook',
        days: 'days',
        claim: 'Claim',
        claimed: 'Claimed',
        equip: 'Equip',
        equipped: 'Equipped',
        buy: 'Buy',
        free: 'Free',
        close: 'Close',
        back: 'Back',
        save: 'Save',
        search: 'Search...',
        endsIn: 'Ends in'
      },
      home: {
        changeLanguage: 'Switch Course',
        dailyQuests: 'Daily Quests',
        viewAllQuests: 'VIEW ALL',
        unlockLeaderboard: 'Unlock Leaderboards!',
        leaderboardTeaser: 'Complete 3 lessons to join the weekly competition!',
        streakCardTitle: 'Streak Protected!',
        streakCardDesc: 'You have a streak freeze active.',
        streakCardUnprotected: 'Practice today to keep your streak alive!'
      },
      lesson: {
        correctTitle: 'Amazing!',
        correctSub: 'Nicely done, coder!',
        incorrectTitle: 'Solution:',
        explanation: 'Explanation',
        outOfHeartsTitle: 'Out of Hearts!',
        outOfHeartsDesc: 'You ran out of hearts! Refill them in the shop or practice to earn more.',
        refillHearts: 'Refill Hearts (100 💎)',
        practiceForHearts: 'Practice to Earn ❤️',
        lessonCompleteTitle: 'Lesson Complete!',
        lessonCompleteSub: "You're making incredible progress!",
        earnedXp: 'XP Earned',
        accuracy: 'Accuracy',
        timeSpent: 'Time',
        comboBonus: 'Combo Bonus',
        runCode: 'Run Code ⚡',
        runningCode: 'Running...',
        expectedOutput: 'Expected Output:',
        yourOutput: 'Your Output:',
        passed: 'PASSED ✅',
        failed: 'FAILED ❌',
        dragHint: 'Click or drag code blocks to arrange them in order:',
        tapToFill: 'Tap tokens to fill the blanks:',
        quitModalTitle: 'Quit Lesson?'
      },
      shop: {
        title: 'ProLingo Store',
        subtitle: 'Boost your learning with power-ups, themes, and skins!',
        streakFreezeTitle: 'Streak Freeze',
        streakFreezeDesc: 'Protects your streak if you miss a day of practice.',
        heartRefillTitle: 'Full Heart Refill',
        heartRefillDesc: 'Instantly restore all 5 hearts to keep coding.',
        unlimitedHeartsTitle: 'Super ProLingo (Unlimited Hearts)',
        unlimitedHeartsDesc: 'Never run out of hearts and learn at your own pace.',
        doubleOrNothingTitle: 'Double or Nothing',
        doubleOrNothingDesc: 'Wager 50 gems. Maintain a 7-day streak to win 100 gems!',
        themesTitle: 'Code Editor & App Themes',
        skinsTitle: 'Mascot Outfits',
        cyberpunkTheme: 'Cyberpunk Neon',
        draculaTheme: 'Dracula Dark',
        monokaiTheme: 'Monokai Pro',
        synthwaveTheme: 'Synthwave 84',
        defaultTheme: 'Duolingo Classic',
        skins: {
          classic: 'Byte the Owl (Classic)',
          cyber: 'Cyberpunk Byte',
          wizard: 'Code Wizard Byte',
          hacker: 'Zero-Day Hacker Byte'
        }
      },
      leagues: {
        title: 'Weekly Leaderboards',
        subtitle: 'Earn XP from lessons to climb the leagues and win gems!',
        promotionZone: 'Promotion Zone (Top 3 Advance)',
        safeZone: 'Safe Zone',
        demotionZone: 'Demotion Zone (Drops to lower league)',
        tierNames: [
          'Bronze League',
          'Silver League',
          'Gold League',
          'Sapphire League',
          'Ruby League',
          'Emerald League',
          'Amethyst League',
          'Pearl League',
          'Obsidian League',
          'Diamond League'
        ]
      },
      quests: {
        title: 'Daily Quests',
        subtitle: 'Complete challenges every day to earn bonus XP and Gems!',
        monthlyTitle: 'Monthly Challenge',
        monthlyDesc: 'Earn 30 quest badges this month to unlock the exclusive Diamond Coder Badge!'
      },
      profile: {
        title: 'Coder Profile',
        memberSince: 'Member since',
        editProfile: 'Edit Profile',
        statsSection: 'Statistics',
        achievementsSection: 'Achievements',
        friendsSection: 'Friends & Rivals',
        addFriend: 'Add Friend',
        follow: 'Follow',
        following: 'Following',
        streakRecord: 'Longest Streak',
        totalQuestions: 'Challenges Solved',
        leagueFinishes: 'Top 3 Finishes',
        cropModalTitle: 'Crop Profile Picture',
        cropInstructions: 'Drag the image to position. Use the slider to zoom:',
        cropPreview: 'Avatar Preview:',
        cropAndSave: '✂️ Crop & Save'
      },
      achievements: {
        wildfire: { title: 'Wildfire', desc: 'Reach a {n} day streak' },
        sage: { title: 'Sage', desc: 'Earn {n} total XP' },
        polyglot: { title: 'Polyglot', desc: 'Study {n} different programming languages' },
        bugHunter: { title: 'Bug Hunter', desc: 'Find and fix {n} coding bugs' },
        overachiever: { title: 'Overachiever', desc: 'Finish {n} lessons with 100% accuracy' },
        nightOwl: { title: 'Night Owl', desc: 'Complete a coding lesson after 10 PM' }
      },
      practice: {
        title: 'Practice Hub',
        subtitle: 'Strengthen weak areas, review errors, or replenish hearts!',
        heartPracticeTitle: 'Heart Recovery Session',
        heartPracticeDesc: 'Solve 3 review questions to regain 1 heart ❤️',
        speedRunTitle: 'Speed Challenge',
        speedRunDesc: 'Race against the clock to test your syntax reflexes!',
        mistakesTitle: 'Mistakes Review',
        mistakesDesc: 'Revisit questions you answered incorrectly in past lessons.'
      },
      settings: {
        title: 'Settings & Preferences',
        general: 'General',
        appearance: 'Appearance',
        language: 'Interface Language',
        english: 'English (Default)',
        arabic: 'العربية (Arabic)',
        theme: 'Theme Mode',
        dark: 'Dark Mode',
        light: 'Light Mode',
        soundEffects: 'Sound Effects',
        soundDesc: 'Play pleasant audio chimes on correct answers and completions',
        haptics: 'Visual Haptics / Animations',
        hapticsDesc: 'Display confetti and bouncy animations',
        dangerZone: 'Data Management',
        resetData: 'Reset All Progress',
        resetConfirm: 'Are you sure you want to reset all your progress, XP, and streak? This cannot be undone!',
        exportData: 'Export Progress JSON',
        importData: 'Import Progress JSON'
      },
      auth: {
        googleTitle: 'Sign in with Google',
        continueApp: 'to continue to ProLingo',
        chooseAccount: 'Saved Accounts on this Device:',
        orUseAnother: 'Or Sign in with Another Google Account',
        emailLabel: 'Google Email:',
        nameLabel: 'Your Display Name:',
        photoLabel: 'Profile Picture (Optional):',
        choosePhoto: '📁 Choose Photo',
        submitGoogle: 'Continue with Google Account',
        activePill: 'ACTIVE',
        removeAccount: 'Remove',
        privacyNote: 'Your personal coding progress, streak, XP, and hearts are securely saved to your personal account.'
      }
    },

    ar: {
      appName: 'برو لينجو',
      appTagline: 'تعلم البرمجة بأسلوب دولينجو التفاعلي الممتع',
      nav: {
        learn: 'تعلم',
        leagues: 'المتصدرين',
        quests: 'المهام',
        shop: 'المتجر',
        profile: 'الملف الشخصي',
        practice: 'تدريب',
        settings: 'الإعدادات'
      },
      stats: {
        streak: 'أيام الحماسة',
        gems: 'الجواهر',
        hearts: 'القلوب',
        unlimited: 'غير محدود ⚡',
        xp: 'نقاط الخبرة',
        accuracy: 'الدقة',
        league: 'الدوري الحالي',
        completedLessons: 'الدروس المكتملة'
      },
      common: {
        continue: 'متابعة',
        check: 'تحقق',
        skip: 'تخطي',
        gotIt: 'فهمت ذلك',
        cancel: 'إلغاء',
        quit: 'خروج',
        quitConfirm: 'هل أنت متأكد من الخروج؟ ستفقد كل تقدمك في هذا الدرس!',
        stay: 'مواصلة التعلم',
        leave: 'مغادرة الدرس',
        locked: 'مغلق',
        start: 'ابدأ',
        review: 'مراجعة',
        practice: 'تدريب',
        completed: 'مكتمل',
        unit: 'الوحدة',
        guidebook: 'دليل الوحدة',
        days: 'أيام',
        claim: 'استلام',
        claimed: 'تم الاستلام',
        equip: 'تفعيل',
        equipped: 'مُفعل',
        buy: 'شراء',
        free: 'مجاني',
        close: 'إغلاق',
        back: 'رجوع',
        save: 'حفظ',
        search: 'بحث...',
        endsIn: 'ينتهي خلال'
      },
      home: {
        changeLanguage: 'تغيير المسار البرمجي',
        dailyQuests: 'مهام اليوم',
        viewAllQuests: 'عرض الكل',
        unlockLeaderboard: 'افتح دوري المتصدرين!',
        leaderboardTeaser: 'أكمل 3 دروس للمنافسة في الدوري الأسبوعي!',
        streakCardTitle: 'حماستك محمية!',
        streakCardDesc: 'لديك تجميد حماسة نشط لحمايتك.',
        streakCardUnprotected: 'تدرّب اليوم للحفاظ على سلسلة حماستك مشتعلة!'
      },
      lesson: {
        correctTitle: 'رائع جداً!',
        correctSub: 'إجابة عبقرية يا بطل الكود!',
        incorrectTitle: 'الحل الصحيح:',
        explanation: 'الشرح التوضيحي',
        outOfHeartsTitle: 'نفدت القلوب!',
        outOfHeartsDesc: 'لقد استنفدت جميع قلوبك! املأها من المتجر أو تدرب لاستعادتها.',
        refillHearts: 'ملء القلوب (100 💎)',
        practiceForHearts: 'تدرب لاستعادة ❤️',
        lessonCompleteTitle: 'اكتمل الدرس بنجاح!',
        lessonCompleteSub: 'تقدم مذهل! أنت تقترب من الاحتراف خطوة بخطوة.',
        earnedXp: 'نقاط الخبرة',
        accuracy: 'نسبة الدقة',
        timeSpent: 'الوقت المستغرق',
        comboBonus: 'مكافأة السلسلة',
        runCode: 'تشغيل الكود ⚡',
        runningCode: 'جاري التنفيذ...',
        expectedOutput: 'المخرجات المتوقعة:',
        yourOutput: 'مخرجاتك:',
        passed: 'نجح الاختبار ✅',
        failed: 'لم ينجح ❌',
        dragHint: 'انقر أو اسحب أجزاء الكود لترتيبها بشكل صحيح:',
        tapToFill: 'انقر على الكلمات لتعبئة الفراغات المناسبة:',
        quitModalTitle: 'هل تريد مغادرة الدرس؟'
      },
      shop: {
        title: 'متجر برو لينجو',
        subtitle: 'عزز رحلتك التعليمية بالمعززات والثيمات وأزياء التميمة!',
        streakFreezeTitle: 'تجميد الحماسة',
        streakFreezeDesc: 'يحمي سلسلة حماستك إذا فاتك التدريب يوماً واحداً.',
        heartRefillTitle: 'ملء القلوب بالكامل',
        heartRefillDesc: 'يستعيد جميع القلوب الخمسة فوراً لمواصلة التعلم.',
        unlimitedHeartsTitle: 'سوبر برو لينجو (قلوب لا نهائية)',
        unlimitedHeartsDesc: 'تعلم بدون حدود ودون القلق بشأن نفاد القلوب.',
        doubleOrNothingTitle: 'المضاعفة أو الخسارة',
        doubleOrNothingDesc: 'راهن بـ 50 جوهرة وحافظ على حماستك 7 أيام لتربح 100 جوهرة!',
        themesTitle: 'ثيمات الكود والمظهر',
        skinsTitle: 'أزياء تميمة بايت',
        cyberpunkTheme: 'سايبر بانك نيون',
        draculaTheme: 'دراكولا الليلي',
        monokaiTheme: 'مونوكاي برو',
        synthwaveTheme: 'سينثويف 84',
        defaultTheme: 'دولينجو الكلاسيكي',
        skins: {
          classic: 'بايت البومة (الكلاسيكي)',
          cyber: 'بايت السايبر بانك',
          wizard: 'بايت ساحر البرمجة',
          hacker: 'بايت الهاكر'
        }
      },
      leagues: {
        title: 'دوري المتصدرين الأسبوعي',
        subtitle: 'اجمع نقاط الخبرة XP من الدروس لتترقى في الدوريات وتربح الجواهر!',
        promotionZone: 'منطقة الترقية (أفضل 3 يصعدون)',
        safeZone: 'منطقة الأمان',
        demotionZone: 'منطقة الهبوط (يهبط للدوري الأدنى)',
        tierNames: [
          'الدوري البرونزي',
          'الدوري الفضي',
          'الدوري الذهبي',
          'دوري الياقوت الأزرق',
          'دوري الياقوت الأحمر',
          'دوري الزمرد',
          'دوري الجمشت',
          'دوري اللؤلؤ',
          'دوري السبج الأسود',
          'دوري الألماس'
        ]
      },
      quests: {
        title: 'المهام اليومية',
        subtitle: 'أكمل التحديات كل يوم لتحصل على مكافآت نقاط الخبرة والجواهر!',
        monthlyTitle: 'تحدي الشهر',
        monthlyDesc: 'أكمل 30 مهمة هذا الشهر لفتح وسام مبرمج الألماس الحصري!'
      },
      profile: {
        title: 'الملف الشخصي للمبرمج',
        memberSince: 'عضو منذ',
        editProfile: 'تعديل الملف',
        statsSection: 'الإحصائيات',
        achievementsSection: 'الأوسمة والإنجازات',
        friendsSection: 'الأصدقاء والمنافسين',
        addFriend: 'إضافة صديق',
        follow: 'متابعة',
        following: 'تتابعه',
        streakRecord: 'أطول سلسلة حماسة',
        totalQuestions: 'التحديات المحلولة',
        leagueFinishes: 'الوصول للمراكز الثلاثة الأولى',
        cropModalTitle: 'اقتصاص صورة الملف الشخصي',
        cropInstructions: 'اسحب الصورة لتحديد الموضع، واستخدم شريط التكبير لضبط الحجم:',
        cropPreview: 'معاينة الصورة:',
        cropAndSave: '✂️ قص وتطبيق الصورة'
      },
      achievements: {
        wildfire: { title: 'شعلة النار', desc: 'حافظ على حماستك لمدة {n} أيام' },
        sage: { title: 'الحكيم', desc: 'اجمع {n} نقطة خبرة إجمالية' },
        polyglot: { title: 'متعدد اللغات', desc: 'ادرس {n} لغات برمجة مختلفة' },
        bugHunter: { title: 'صياد الأخطاء', desc: 'اكتشف وأصلح {n} أخطاء برمجية' },
        overachiever: { title: 'المتفوق', desc: 'أنهِ {n} دروس بنسبة دقة 100%' },
        nightOwl: { title: 'بومة الليل', desc: 'أكمل درساً برمجياً بعد الساعة 10 مساءً' }
      },
      practice: {
        title: 'مركز التدريب',
        subtitle: 'قوِّ نقاط ضعفك، راجع أخطاءك، أو استعد قلوبك المفقودة!',
        heartPracticeTitle: 'جلسة استعادة القلوب',
        heartPracticeDesc: 'أجب عن 3 أسئلة تدريبية لاستعادة قلب واحد ❤️',
        speedRunTitle: 'تحدي السرعة',
        speedRunDesc: 'سابق الزمن واختبر سرعة بديهتك في قراءة الكود!',
        mistakesTitle: 'مراجعة الأخطاء',
        mistakesDesc: 'أعد حل الأسئلة التي أخطأت فيها في الدروس السابقة.'
      },
      settings: {
        title: 'الإعدادات والتفضيلات',
        general: 'عام',
        appearance: 'المظهر',
        language: 'لغة الواجهة',
        english: 'English (الافتراضية)',
        arabic: 'العربية (Arabic)',
        theme: 'نمط المظهر',
        dark: 'الوضع الليلي (Dark)',
        light: 'الوضع الفاتح (Light)',
        soundEffects: 'المؤثرات الصوتية',
        soundDesc: 'تشغيل نغمات موسيقية مبهجة عند الإجابة الصحيحة والإنجاز',
        haptics: 'المؤثرات البصرية والحركية',
        hapticsDesc: 'عرض قصاصات الاحتفال والرسوم المتحركة التفاعلية',
        dangerZone: 'إدارة البيانات',
        resetData: 'إعادة ضبط كافة البيانات',
        resetConfirm: 'هل أنت متأكد من تصفير تقدمك وسلسلة حماستك ونقاطك؟ لا يمكن التراجع عن هذا الإجراء!',
        exportData: 'تصدير البيانات بصيغة JSON',
        importData: 'استيراد البيانات'
      },
      auth: {
        googleTitle: 'تسجيل الدخول باستخدام Google',
        continueApp: 'للمتابعة في ProLingo',
        chooseAccount: 'الحسابات المحفوظة على هذا الجهاز:',
        orUseAnother: 'أو تسجيل الدخول بحساب Google آخر',
        emailLabel: 'البريد الإلكتروني لـ Google:',
        nameLabel: 'اسم العرض:',
        photoLabel: 'صورة الملف الشخصي (اختياري):',
        choosePhoto: '📁 اختيار صورة',
        submitGoogle: 'تسجيل الدخول بحساب Google',
        activePill: 'الحساب النشط',
        removeAccount: 'إزالة',
        privacyNote: 'يتم حفظ تقدمك البرمجي وسلسلة حماستك ونقاطك وقلوبك بأمان في حسابك الشخصي.'
      }
    }
  },

  get(keyPath, params = {}) {
    const keys = keyPath.split('.');
    let val = I18N.translations[I18N.currentLang];
    for (const k of keys) {
      if (!val || val[k] === undefined) {
        // Fallback to English if missing
        let fallback = I18N.translations.en;
        for (const fbKey of keys) {
          if (!fallback) break;
          fallback = fallback[fbKey];
        }
        val = fallback || keyPath;
        break;
      }
      val = val[k];
    }
    if (typeof val === 'string') {
      for (const p in params) {
        val = val.replace(`{${p}}`, params[p]);
      }
    }
    return val || keyPath;
  },

  setLanguage(lang) {
    if (I18N.translations[lang]) {
      I18N.currentLang = lang;
      document.documentElement.lang = lang;
      document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
      document.body.classList.toggle('rtl', lang === 'ar');
      localStorage.setItem('prolingo_ui_lang', lang);
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }
  },

  isRTL() {
    return I18N.currentLang === 'ar';
  }
};

if (typeof window !== 'undefined') {
  window.I18N = I18N;
}

