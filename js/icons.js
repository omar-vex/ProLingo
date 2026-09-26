/**
 * ProLingo Custom Vector Icons System
 * Handcrafted Duolingo-style 3D vector icons (zero external font/image dependencies)
 */

const Icons = {
  svgs: {
    // ==========================================
    // PROLINGO SLEEK TECH BRAND LOGO (Modern, Professional Developer Identity)
    // ==========================================
    logo: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="proLogoBg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#1E293B"/>
          <stop offset="100%" stop-color="#0F172A"/>
        </linearGradient>
        <linearGradient id="proLogoGrad" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#58CC02"/>
          <stop offset="50%" stop-color="#10B981"/>
          <stop offset="100%" stop-color="#00F0FF"/>
        </linearGradient>
        <linearGradient id="proLogoBevel" x1="0" y1="0" x2="0" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#475569" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#0F172A" stop-opacity="0.8"/>
        </linearGradient>
      </defs>
      <!-- Sleek Tech Tile with Beveled Border -->
      <rect x="2" y="2" width="32" height="32" rx="9" fill="url(#proLogoBg)" stroke="url(#proLogoBevel)" stroke-width="1.5"/>
      <rect x="3" y="3" width="30" height="30" rx="8" stroke="url(#proLogoGrad)" stroke-width="1" stroke-opacity="0.35"/>
      <!-- Aerodynamic Monogram P intertwined with Code Angle -->
      <path d="M10 8C10 7.45 10.45 7 11 7H18C23.25 7 26.5 10 26.5 14.5C26.5 19 23.25 22 18 22H15V28C15 28.55 14.55 29 14 29H11C10.45 29 10 28.55 10 28V8Z" fill="url(#proLogoGrad)"/>
      <!-- Inner Loop Cutout -->
      <path d="M15 11.5H18C20.5 11.5 21.8 12.8 21.8 14.5C21.8 16.2 20.5 17.5 18 17.5H15V11.5Z" fill="#0F172A"/>
      <!-- Terminal Chevron > inside the loop -->
      <path d="M16.8 13.2L19 14.5L16.8 15.8" stroke="#58CC02" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Cyan Code Execution Accent Dot -->
      <circle cx="25.5" cy="25.5" r="2.2" fill="#00F0FF"/>
      <circle cx="25.5" cy="25.5" r="3.5" stroke="#00F0FF" stroke-width="0.8" stroke-opacity="0.5"/>
    </svg>`,

    owl: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="proLogoBg2" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#1E293B"/>
          <stop offset="100%" stop-color="#0F172A"/>
        </linearGradient>
        <linearGradient id="proLogoGrad2" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#58CC02"/>
          <stop offset="50%" stop-color="#10B981"/>
          <stop offset="100%" stop-color="#00F0FF"/>
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="32" height="32" rx="9" fill="url(#proLogoBg2)" stroke="#334155" stroke-width="1.5"/>
      <rect x="3" y="3" width="30" height="30" rx="8" stroke="url(#proLogoGrad2)" stroke-width="1" stroke-opacity="0.35"/>
      <path d="M10 8C10 7.45 10.45 7 11 7H18C23.25 7 26.5 10 26.5 14.5C26.5 19 23.25 22 18 22H15V28C15 28.55 14.55 29 14 29H11C10.45 29 10 28.55 10 28V8Z" fill="url(#proLogoGrad2)"/>
      <path d="M15 11.5H18C20.5 11.5 21.8 12.8 21.8 14.5C21.8 16.2 20.5 17.5 18 17.5H15V11.5Z" fill="#0F172A"/>
      <path d="M16.8 13.2L19 14.5L16.8 15.8" stroke="#58CC02" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="25.5" cy="25.5" r="2.2" fill="#00F0FF"/>
      <circle cx="25.5" cy="25.5" r="3.5" stroke="#00F0FF" stroke-width="0.8" stroke-opacity="0.5"/>
    </svg>`,

    fire: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2.5C16 2.5 24.5 9 24.5 18.5C24.5 24.5 19.8 29.5 16 29.5C12.2 29.5 7.5 24.5 7.5 18.5C7.5 12 12.5 7.5 13.5 6C13.5 6 12 10.5 13 13C14 10.5 16 7 16 2.5Z" fill="#D35400"/>
      <path d="M16 2C16 2 24.5 8.5 24.5 18C24.5 24 19.8 28.5 16 28.5C12.2 28.5 7.5 24 7.5 18C7.5 11.5 12.5 7 13.5 5.5C13.5 5.5 12 10 13 12.5C14 10 16 6.5 16 2Z" fill="#FF9600"/>
      <path d="M16 10C16 10 20.5 14.5 20.5 19.5C20.5 23 18.5 25.5 16 25.5C13.5 25.5 11.5 23 11.5 19.5C11.5 16.5 13.5 13.5 16 10Z" fill="#FFC800"/>
      <path d="M16 16C16 16 18.5 18.5 18.5 21.5C18.5 23.5 17.5 24.5 16 24.5C14.5 24.5 13.5 23.5 13.5 21.5C13.5 19.5 15 17.5 16 16Z" fill="#FFFBE6"/>
    </svg>`,

    gem: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="16,3 27,11 22,28 10,28 5,11" fill="#0369A1"/>
      <polygon points="5,11 11,11 10,28" fill="#0284C7"/>
      <polygon points="27,11 21,11 22,28" fill="#0369A1"/>
      <polygon points="11,11 21,11 16,28" fill="#0EA5E9"/>
      <polygon points="16,3 5,11 11,11" fill="#7DD3FC"/>
      <polygon points="16,3 11,11 21,11" fill="#BAE6FD"/>
      <polygon points="16,3 21,11 27,11" fill="#38BDF8"/>
      <polygon points="13,5 16,4 14,8 11,9" fill="#FFFFFF" fill-opacity="0.8"/>
    </svg>`,

    heart: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 28.5C16 28.5 4 21 4 11.5C4 6.5 7.8 3.5 12.2 3.5C14.6 3.5 15.6 4.7 16 5.5C16.4 4.7 17.4 3.5 19.8 3.5C24.2 3.5 28 6.5 28 11.5C28 21 16 28.5 16 28.5Z" fill="#D32F2F" transform="translate(0, 1.8)"/>
      <path d="M16 28.5C16 28.5 4 21 4 11.5C4 6.5 7.8 3.5 12.2 3.5C14.6 3.5 15.6 4.7 16 5.5C16.4 4.7 17.4 3.5 19.8 3.5C24.2 3.5 28 6.5 28 11.5C28 21 16 28.5 16 28.5Z" fill="#FF4B4B"/>
      <path d="M8 8C9.5 6 12 5.5 13.5 6C11 7 9 9.5 9 12C9 13.5 8.5 13 8 12C7.5 10.5 7.5 9 8 8Z" fill="#FFFFFF" fill-opacity="0.6"/>
    </svg>`,

    heart_empty: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 27C16 27 5 19.8 5 11.5C5 7 8.2 4.2 12 4.2C14.2 4.2 15.4 5.2 16 6.2C16.6 5.2 17.8 4.2 20 4.2C23.8 4.2 27 7 27 11.5C27 19.8 16 27 16 27Z" fill="rgba(255, 255, 255, 0.08)" stroke="#6B7280" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    heart_practice: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 28.5C16 28.5 4 21 4 11.5C4 6.5 7.8 3.5 12.2 3.5C14.6 3.5 15.6 4.7 16 5.5C16.4 4.7 17.4 3.5 19.8 3.5C24.2 3.5 28 6.5 28 11.5C28 21 16 28.5 16 28.5Z" fill="#0088CC" transform="translate(0, 1.8)"/>
      <path d="M16 28.5C16 28.5 4 21 4 11.5C4 6.5 7.8 3.5 12.2 3.5C14.6 3.5 15.6 4.7 16 5.5C16.4 4.7 17.4 3.5 19.8 3.5C24.2 3.5 28 6.5 28 11.5C28 21 16 28.5 16 28.5Z" fill="#1CB0F6"/>
      <path d="M16 10V18M12 14H20" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      <path d="M8 8C9.5 6 12 5.5 13.5 6C11 7 9 9.5 9 12C9 13.5 8.5 13 8 12C7.5 10.5 7.5 9 8 8Z" fill="#FFFFFF" fill-opacity="0.6"/>
    </svg>`,

    learn: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="26" height="22" rx="5" fill="#46A302"/>
      <rect x="3" y="4" width="26" height="22" rx="5" fill="#58CC02"/>
      <path d="M3 9C3 6.2 5.2 4 8 4H24C26.8 4 29 6.2 29 9V10H3V9Z" fill="#3D8E02"/>
      <circle cx="7" cy="7" r="1.3" fill="#FF5F56"/>
      <circle cx="11" cy="7" r="1.3" fill="#FFBD2E"/>
      <circle cx="15" cy="7" r="1.3" fill="#27C93F"/>
      <rect x="5.5" y="12" width="21" height="11.5" rx="2.5" fill="#182B14"/>
      <path d="M9 15L12.5 17.5L9 20" stroke="#79D727" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="14.5" y1="20" x2="19.5" y2="20" stroke="#FFDF00" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    leagues: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 9C5 13.5 8.5 16.5 12 16.5M27 9C27 13.5 23.5 16.5 20 16.5" stroke="#E5A500" stroke-width="3" stroke-linecap="round"/>
      <path d="M5 9C5 13 8.5 15.5 12 15.5M27 9C27 13 23.5 15.5 20 15.5" stroke="#FFC800" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="9" y="26" width="14" height="4" rx="2" fill="#B27B00"/>
      <rect x="10" y="24" width="12" height="4" rx="1.5" fill="#E5A500"/>
      <path d="M14 20H18L19 24H13L14 20Z" fill="#FFC800"/>
      <path d="M8 5H24V13C24 17.5 20.5 21 16 21C11.5 21 8 17.5 8 13V5Z" fill="#E5A500"/>
      <path d="M8 5H24V12C24 16.5 20.5 20 16 20C11.5 20 8 16.5 8 12V5Z" fill="#FFC800"/>
      <path d="M16 8.5L17.2 11.2L20 11.5L17.9 13.3L18.5 16L16 14.6L13.5 16L14.1 13.3L12 11.5L14.8 11.2L16 8.5Z" fill="#FFFFFF"/>
    </svg>`,

    quests: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="17.5" r="13.5" fill="#C0392B"/>
      <circle cx="16" cy="16" r="13.5" fill="#E74C3C"/>
      <circle cx="16" cy="16" r="10" fill="#FFFFFF"/>
      <circle cx="16" cy="16" r="6.5" fill="#1CB0F6"/>
      <circle cx="16" cy="16" r="3.2" fill="#FFC800"/>
      <line x1="28" y1="4" x2="16.5" y2="15.5" stroke="#4B4B4B" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M26 3L29 3L29 6M24 5L27 5L27 8" stroke="#FF9600" stroke-width="2" stroke-linecap="round"/>
      <circle cx="16" cy="16" r="1.5" fill="#D32F2F"/>
    </svg>`,

    shop: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="16" width="24" height="13" rx="3" fill="#6D4C41"/>
      <rect x="4" y="14" width="24" height="13" rx="3" fill="#8D6E63"/>
      <rect x="4" y="14" width="4.5" height="13" rx="2" fill="#E5A500"/>
      <rect x="23.5" y="14" width="4.5" height="13" rx="2" fill="#E5A500"/>
      <path d="M3 13C3 8.5 7 5 16 5C25 5 29 8.5 29 13H3Z" fill="#6D4C41" transform="translate(0, 1.5)"/>
      <path d="M3 13C3 8.5 7 5 16 5C25 5 29 8.5 29 13H3Z" fill="#A1887F"/>
      <path d="M7 6.5C8 5.8 10 5.2 11 5.1V13H7V6.5Z" fill="#FFC800"/>
      <path d="M25 6.5C24 5.8 22 5.2 21 5.1V13H25V6.5Z" fill="#FFC800"/>
      <rect x="13.5" y="12" width="5" height="6" rx="1.5" fill="#FFC800"/>
      <circle cx="16" cy="14.5" r="1" fill="#6D4C41"/>
      <polygon points="16,1 18,3 16,5 14,3" fill="#1CB0F6"/>
    </svg>`,

    profile: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="17.5" r="13.5" fill="#7E57C2"/>
      <circle cx="16" cy="16" r="13.5" fill="#9575CD"/>
      <circle cx="16" cy="16" r="11.5" fill="#B39DDB"/>
      <circle cx="16" cy="12.5" r="4.5" fill="#FFFFFF"/>
      <path d="M9 25C9 20.5 12 18 16 18C20 18 23 20.5 23 25" fill="#FFFFFF"/>
      <rect x="12.5" y="11" width="7" height="2" rx="1" fill="#FFC800"/>
    </svg>`,

    practice: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="14.5" width="24" height="3" rx="1.5" fill="#CBD5E1"/>
      <rect x="12" y="13.8" width="8" height="4.4" rx="1.2" fill="#E2E8F0"/>
      <line x1="14" y1="14" x2="14" y2="18" stroke="#94A3B8" stroke-width="1"/>
      <line x1="16" y1="14" x2="16" y2="18" stroke="#94A3B8" stroke-width="1"/>
      <line x1="18" y1="14" x2="18" y2="18" stroke="#94A3B8" stroke-width="1"/>
      <rect x="8" y="7" width="3.5" height="18" rx="1.8" fill="#D35400" transform="translate(0, 1)"/>
      <rect x="8" y="7" width="3.5" height="18" rx="1.8" fill="#FF9600"/>
      <rect x="5.5" y="9.5" width="3" height="13" rx="1.5" fill="#FF9600"/>
      <rect x="20.5" y="7" width="3.5" height="18" rx="1.8" fill="#D35400" transform="translate(0, 1)"/>
      <rect x="20.5" y="7" width="3.5" height="18" rx="1.8" fill="#FF9600"/>
      <rect x="23.5" y="9.5" width="3" height="13" rx="1.5" fill="#FF9600"/>
      <path d="M16 4L14 9H18L16 13" stroke="#FFC800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    settings: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 3C14.8 3 13.8 4 13.8 5.2V5.8C12.8 6.2 11.9 6.8 11.1 7.4L10.7 7L10.6 6.9C9.8 6.1 8.5 6.1 7.6 6.9C6.8 7.8 6.8 9.1 7.6 9.9L8.1 10.4C7.5 11.2 6.9 12.1 6.5 13.1H5.8C4.6 13.1 3.6 14.1 3.6 15.3C3.6 16.5 4.6 17.5 5.8 17.5H6.5C6.9 18.5 7.5 19.4 8.1 20.2L7.6 20.7C6.8 21.5 6.8 22.8 7.6 23.7C8.5 24.5 9.8 24.5 10.6 23.7L11.1 23.2C11.9 23.8 12.8 24.4 13.8 24.8V25.4C13.8 26.6 14.8 27.6 16 27.6C17.2 27.6 18.2 26.6 18.2 25.4V24.8C19.2 24.4 20.1 23.8 20.9 23.2L21.4 23.7C22.2 24.5 23.5 24.5 24.4 23.7C25.2 22.8 25.2 21.5 24.4 20.7L23.9 20.2C24.5 19.4 25.1 18.5 25.5 17.5H26.2C27.4 17.5 28.4 16.5 28.4 15.3C28.4 14.1 27.4 13.1 26.2 13.1H25.5C25.1 12.1 24.5 11.2 23.9 10.4L24.4 9.9C25.2 9.1 25.2 7.8 24.4 6.9C23.5 6.1 22.2 6.1 21.4 6.9L20.9 7.4C20.1 6.8 19.2 6.2 18.2 5.8V5.2C18.2 4 17.2 3 16 3Z" fill="#64748B" transform="translate(0, 1.8)"/>
      <path d="M16 3C14.8 3 13.8 4 13.8 5.2V5.8C12.8 6.2 11.9 6.8 11.1 7.4L10.7 7L10.6 6.9C9.8 6.1 8.5 6.1 7.6 6.9C6.8 7.8 6.8 9.1 7.6 9.9L8.1 10.4C7.5 11.2 6.9 12.1 6.5 13.1H5.8C4.6 13.1 3.6 14.1 3.6 15.3C3.6 16.5 4.6 17.5 5.8 17.5H6.5C6.9 18.5 7.5 19.4 8.1 20.2L7.6 20.7C6.8 21.5 6.8 22.8 7.6 23.7C8.5 24.5 9.8 24.5 10.6 23.7L11.1 23.2C11.9 23.8 12.8 24.4 13.8 24.8V25.4C13.8 26.6 14.8 27.6 16 27.6C17.2 27.6 18.2 26.6 18.2 25.4V24.8C19.2 24.4 20.1 23.8 20.9 23.2L21.4 23.7C22.2 24.5 23.5 24.5 24.4 23.7C25.2 22.8 25.2 21.5 24.4 20.7L23.9 20.2C24.5 19.4 25.1 18.5 25.5 17.5H26.2C27.4 17.5 28.4 16.5 28.4 15.3C28.4 14.1 27.4 13.1 26.2 13.1H25.5C25.1 12.1 24.5 11.2 23.9 10.4L24.4 9.9C25.2 9.1 25.2 7.8 24.4 6.9C23.5 6.1 22.2 6.1 21.4 6.9L20.9 7.4C20.1 6.8 19.2 6.2 18.2 5.8V5.2C18.2 4 17.2 3 16 3Z" fill="#94A3B8"/>
      <circle cx="16" cy="15.3" r="5" fill="#1E293B"/>
      <circle cx="16" cy="15.3" r="3" fill="#64748B"/>
    </svg>`,

    crown: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 22L7 10L12 16L16 6L20 16L25 10L28 22H4Z" fill="#B27B00" transform="translate(0, 2)"/>
      <path d="M4 22L7 10L12 16L16 6L20 16L25 10L28 22H4Z" fill="#FFC800"/>
      <circle cx="7" cy="9.5" r="2.2" fill="#FF4B4B"/>
      <circle cx="16" cy="5.5" r="2.8" fill="#1CB0F6"/>
      <circle cx="25" cy="9.5" r="2.2" fill="#FF4B4B"/>
      <rect x="4" y="21" width="24" height="5" rx="2.5" fill="#E5A500"/>
      <circle cx="9" cy="23.5" r="1.5" fill="#58CC02"/>
      <circle cx="16" cy="23.5" r="1.8" fill="#FF4B4B"/>
      <circle cx="23" cy="23.5" r="1.5" fill="#1CB0F6"/>
    </svg>`,

    star: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2.5L20.2 11L29.5 12.3L22.8 18.8L24.4 28.1L16 23.7L7.6 28.1L9.2 18.8L2.5 12.3L11.8 11L16 2.5Z" fill="#B27B00" transform="translate(0, 2)"/>
      <path d="M16 2.5L20.2 11L29.5 12.3L22.8 18.8L24.4 28.1L16 23.7L7.6 28.1L9.2 18.8L2.5 12.3L11.8 11L16 2.5Z" fill="#FFC800"/>
      <path d="M16 2.5L20.2 11L16 15L11.8 11L16 2.5Z" fill="#FFE57F"/>
    </svg>`,

    lock: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 14V9.5C10 6.2 12.7 3.5 16 3.5C19.3 3.5 22 6.2 22 9.5V14" stroke="#94A3B8" stroke-width="3.5" stroke-linecap="round"/>
      <rect x="6" y="15" width="20" height="15" rx="4" fill="#334155"/>
      <rect x="6" y="13" width="20" height="15" rx="4" fill="#64748B"/>
      <circle cx="16" cy="19.5" r="2" fill="#1E293B"/>
      <polygon points="15,19.5 17,19.5 17.5,24 14.5,24" fill="#1E293B"/>
    </svg>`,

    lightning: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="18,2 6,17 15,17 13,30 26,14 17,14" fill="#B27B00" transform="translate(0, 1.8)"/>
      <polygon points="18,2 6,17 15,17 13,30 26,14 17,14" fill="#FFC800"/>
      <polygon points="18,2 11,15 15,15 13,26 17,14 17,14" fill="#FFE57F"/>
    </svg>`,

    check: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="17.5" r="13.5" fill="#46A302"/>
      <circle cx="16" cy="16" r="13.5" fill="#58CC02"/>
      <path d="M10 16.5L14 20.5L22 12" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    cross: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="17.5" r="13.5" fill="#D32F2F"/>
      <circle cx="16" cy="16" r="13.5" fill="#FF4B4B"/>
      <path d="M11.5 11.5L20.5 20.5M20.5 11.5L11.5 20.5" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
    </svg>`,

    book: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7C4 5.5 5.5 4.5 7 4.5H25C26.5 4.5 28 5.5 28 7V25C28 26.5 26.5 27.5 25 27.5H7C5.5 27.5 4 26.5 4 25V7Z" fill="#0284C7"/>
      <path d="M4 6C4 4.5 5.5 3.5 7 3.5H25C26.5 3.5 28 4.5 28 6V24C28 25.5 26.5 26.5 25 26.5H7C5.5 26.5 4 25.5 4 24V6Z" fill="#1CB0F6"/>
      <rect x="7" y="5.5" width="18" height="19" rx="1.5" fill="#FFFFFF"/>
      <line x1="16" y1="5.5" x2="16" y2="24.5" stroke="#CBD5E1" stroke-width="1.5"/>
      <line x1="9.5" y1="9" x2="14" y2="9" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="9.5" y1="13" x2="14" y2="13" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="9.5" y1="17" x2="13" y2="17" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="18" y1="9" x2="23" y2="9" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="18" y1="13" x2="22.5" y2="13" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M15 5.5V15L16.5 13.5L18 15V5.5H15Z" fill="#FFC800"/>
    </svg>`,

    bulb: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 3C11 3 7 7 7 12C7 15.5 9 18.5 12 20.2V23.5C12 24.3 12.7 25 13.5 25H18.5C19.3 25 20 24.3 20 23.5V20.2C23 18.5 25 15.5 25 12C25 7 21 3 16 3Z" fill="#E5A500" transform="translate(0, 1.5)"/>
      <path d="M16 3C11 3 7 7 7 12C7 15.5 9 18.5 12 20.2V23.5C12 24.3 12.7 25 13.5 25H18.5C19.3 25 20 24.3 20 23.5V20.2C23 18.5 25 15.5 25 12C25 7 21 3 16 3Z" fill="#FFC800"/>
      <rect x="13" y="26" width="6" height="2" rx="1" fill="#94A3B8"/>
      <rect x="14" y="28.5" width="4" height="1.8" rx="0.9" fill="#64748B"/>
      <path d="M14 13L15 10L17 10L18 13" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="16" y1="0.5" x2="16" y2="2" stroke="#FFC800" stroke-width="2" stroke-linecap="round"/>
      <line x1="4.5" y1="5.5" x2="6" y2="7" stroke="#FFC800" stroke-width="2" stroke-linecap="round"/>
      <line x1="27.5" y1="5.5" x2="26" y2="7" stroke="#FFC800" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    timer: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="1.5" width="4" height="3" rx="1" fill="#94A3B8"/>
      <circle cx="16" cy="18" r="12.5" fill="#334155"/>
      <circle cx="16" cy="16.5" r="12.5" fill="#64748B"/>
      <circle cx="16" cy="16.5" r="9.5" fill="#FFFFFF"/>
      <line x1="16" y1="16.5" x2="16" y2="10.5" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="16.5" x2="20.5" y2="16.5" stroke="#FF4B4B" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="16" cy="16.5" r="1.5" fill="#FF4B4B"/>
    </svg>`,

    freeze: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="3.5" fill="#00D2FF"/>
      <path d="M16 3V29M3 16H29M6.8 6.8L25.2 25.2M6.8 25.2L25.2 6.8" stroke="#00D2FF" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M13 7L16 4L19 7M13 25L16 28L19 25M7 13L4 16L7 19M25 13L28 16L25 19" stroke="#E0F7FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    double: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="13" r="8" fill="#B27B00"/>
      <circle cx="20" cy="12" r="8" fill="#FFC800"/>
      <circle cx="12" cy="19.5" r="9" fill="#B27B00"/>
      <circle cx="12" cy="18" r="9" fill="#FFD700"/>
      <circle cx="12" cy="18" r="7" fill="#FFC800"/>
      <path d="M9 16C9 14.5 10 13.5 11.5 13.5C13 13.5 14 14.5 14 16C14 18 9 20 9 22H14.5" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    super: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2L27 6V15C27 22.5 22 28.5 16 30C10 28.5 5 22.5 5 15V6L16 2Z" fill="#581C87"/>
      <path d="M16 3.5L25.5 7.2V15C25.5 21.5 21.2 27 16 28.3C10.8 27 6.5 21.5 6.5 15V7.2L16 3.5Z" fill="#7E22CE"/>
      <polygon points="18,6 10,17 16,17 14,26 23,14 17,14" fill="#00F0FF"/>
      <polygon points="17,8 12,17 16,17 14,24 21,15 17,15" fill="#FFFFFF"/>
    </svg>`,

    python: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8 3C10.5 3 10.8 5.3 10.8 5.3L10.8 7.7H16V8.5H8.7C6.4 8.5 4.5 10.2 4.5 12.8C4.5 15.5 6 16.2 7.7 16.2H9.2V14.1C9.2 11.7 11.2 9.7 13.6 9.7H18.7C20.6 9.7 22.1 8.2 22.1 6.3V3H15.8ZM13 5C13.6 5 14 5.4 14 6C14 6.6 13.6 7 13 7C12.4 7 12 6.6 12 6C12 5.4 12.4 5 13 5Z" fill="#3B82F6"/>
      <path d="M16.2 29C21.5 29 21.2 26.7 21.2 26.7L21.2 24.3H16V23.5H23.3C25.6 23.5 27.5 21.8 27.5 19.2C27.5 16.5 26 15.8 24.3 15.8H22.8V17.9C22.8 20.3 20.8 22.3 18.4 22.3H13.3C11.4 22.3 9.9 23.8 9.9 25.7V29H16.2ZM19 27C18.4 27 18 26.6 18 26C18 25.4 18.4 25 19 25C19.6 25 20 25.4 20 26C20 26.6 19.6 27 19 27Z" fill="#FACC15"/>
    </svg>`,

    medal_gold: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 2L8 14L16 12L24 14L21 2H11Z" fill="#3B82F6"/>
      <path d="M13 2L11 13L16 12L21 13L19 2H13Z" fill="#1D4ED8"/>
      <circle cx="16" cy="20.5" r="9.5" fill="#B27B00"/>
      <circle cx="16" cy="19" r="9.5" fill="#FFD700"/>
      <circle cx="16" cy="19" r="7.5" fill="#FFC800"/>
      <path d="M14 16L16.5 14V23M13.5 23H19.5" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    medal_silver: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 2L8 14L16 12L24 14L21 2H11Z" fill="#10B981"/>
      <circle cx="16" cy="20.5" r="9.5" fill="#64748B"/>
      <circle cx="16" cy="19" r="9.5" fill="#E2E8F0"/>
      <circle cx="16" cy="19" r="7.5" fill="#CBD5E1"/>
      <path d="M13.5 16C13.5 14.5 14.5 13.5 16 13.5C17.5 13.5 18.5 14.5 18.5 16C18.5 18 13.5 20.5 13.5 23H19" stroke="#334155" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    medal_bronze: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 2L8 14L16 12L24 14L21 2H11Z" fill="#EF4444"/>
      <circle cx="16" cy="20.5" r="9.5" fill="#78350F"/>
      <circle cx="16" cy="19" r="9.5" fill="#CD7F32"/>
      <circle cx="16" cy="19" r="7.5" fill="#B45309"/>
      <path d="M14 14H18.5L16 17.5C17.5 17.5 18.8 18.5 18.8 20.2C18.8 22 17.2 23 15.5 23C14 23 13 22 13 22" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`,

    arrow_up: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 6L6 18H12V26H20V18H26L16 6Z" fill="#58CC02"/>
    </svg>`,

    arrow_down: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 26L26 14H20V6H12V14H6L16 26Z" fill="#FF4B4B"/>
    </svg>`,

    code: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 10L4 16L10 22M22 10L28 16L22 22M19 7L13 25" stroke="#CE82FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    rules: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 27V5L27 27H5Z" fill="#E5A500" transform="translate(0, 1)"/>
      <path d="M5 27V5L27 27H5Z" fill="#FFC800"/>
      <path d="M9 23V13L19 23H9Z" fill="#1E293B"/>
      <line x1="5" y1="8" x2="8" y2="8" stroke="#B27B00" stroke-width="1.5"/>
      <line x1="5" y1="12" x2="8" y2="12" stroke="#B27B00" stroke-width="1.5"/>
      <line x1="5" y1="16" x2="8" y2="16" stroke="#B27B00" stroke-width="1.5"/>
      <line x1="5" y1="20" x2="8" y2="20" stroke="#B27B00" stroke-width="1.5"/>
    </svg>`,

    google: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.5 16.3C29.5 15.2 29.4 14.1 29.2 13.1H16V18.7H23.6C23.3 20.3 22.3 21.8 20.8 22.7V26.1H25.3C27.9 23.7 29.5 20.2 29.5 16.3Z" fill="#4285F4"/>
      <path d="M16 30C19.8 30 23 28.7 25.3 26.1L20.8 22.7C19.6 23.5 18 24 16 24C12.3 24 9.1 21.5 8 18.2H3.4V21.7C5.7 26.4 10.5 30 16 30Z" fill="#34A853"/>
      <path d="M8 18.2C7.7 17.3 7.5 16.4 7.5 15.5C7.5 14.6 7.7 13.7 8 12.8V9.3H3.4C2.5 11.2 2 13.3 2 15.5C2 17.7 2.5 19.8 3.4 21.7L8 18.2Z" fill="#FBBC05"/>
      <path d="M16 7C18.1 7 19.9 7.7 21.4 9.1L25.4 5.1C22.9 2.8 19.7 1.5 16 1.5C10.5 1.5 5.7 5.1 3.4 9.8L8 13.3C9.1 10 12.3 7 16 7Z" fill="#EA4335"/>
    </svg>`,

    edit: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 23L4 28L9 27L24 12L19 7L5 23Z" fill="#FFC800"/>
      <polygon points="4,28 8,27 5,24" fill="#334155"/>
      <path d="M22 4L26 8L24 10L20 6L22 4Z" fill="#FF9600"/>
    </svg>`,

    trophy: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 9C5 13.5 8.5 16.5 12 16.5M27 9C27 13.5 23.5 16.5 20 16.5" stroke="#E5A500" stroke-width="3" stroke-linecap="round"/>
      <path d="M5 9C5 13 8.5 15.5 12 15.5M27 9C27 13 23.5 15.5 20 15.5" stroke="#FFC800" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="9" y="26" width="14" height="4" rx="2" fill="#B27B00"/>
      <rect x="10" y="24" width="12" height="4" rx="1.5" fill="#E5A500"/>
      <path d="M14 20H18L19 24H13L14 20Z" fill="#FFC800"/>
      <path d="M8 5H24V13C24 17.5 20.5 21 16 21C11.5 21 8 17.5 8 13V5Z" fill="#E5A500"/>
      <path d="M8 5H24V12C24 16.5 20.5 20 16 20C11.5 20 8 16.5 8 12V5Z" fill="#FFC800"/>
      <path d="M16 8.5L17.2 11.2L20 11.5L17.9 13.3L18.5 16L16 14.6L13.5 16L14.1 13.3L12 11.5L14.8 11.2L16 8.5Z" fill="#FFFFFF"/>
    </svg>`,

    target: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="17.5" r="13.5" fill="#C0392B"/>
      <circle cx="16" cy="16" r="13.5" fill="#E74C3C"/>
      <circle cx="16" cy="16" r="10" fill="#FFFFFF"/>
      <circle cx="16" cy="16" r="6.5" fill="#1CB0F6"/>
      <circle cx="16" cy="16" r="3.2" fill="#FFC800"/>
      <line x1="28" y1="4" x2="16.5" y2="15.5" stroke="#4B4B4B" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M26 3L29 3L29 6M24 5L27 5L27 8" stroke="#FF9600" stroke-width="2" stroke-linecap="round"/>
      <circle cx="16" cy="16" r="1.5" fill="#D32F2F"/>
    </svg>`,

    chest: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="16" width="24" height="13" rx="3" fill="#6D4C41"/>
      <rect x="4" y="14" width="24" height="13" rx="3" fill="#8D6E63"/>
      <rect x="4" y="14" width="4.5" height="13" rx="2" fill="#E5A500"/>
      <rect x="23.5" y="14" width="4.5" height="13" rx="2" fill="#E5A500"/>
      <path d="M3 13C3 8.5 7 5 16 5C25 5 29 8.5 29 13H3Z" fill="#6D4C41" transform="translate(0, 1.5)"/>
      <path d="M3 13C3 8.5 7 5 16 5C25 5 29 8.5 29 13H3Z" fill="#A1887F"/>
      <path d="M7 6.5C8 5.8 10 5.2 11 5.1V13H7V6.5Z" fill="#FFC800"/>
      <path d="M25 6.5C24 5.8 22 5.2 21 5.1V13H25V6.5Z" fill="#FFC800"/>
      <rect x="13.5" y="12" width="5" height="6" rx="1.5" fill="#FFC800"/>
      <circle cx="16" cy="14.5" r="1" fill="#6D4C41"/>
      <polygon points="16,1 18,3 16,5 14,3" fill="#1CB0F6"/>
    </svg>`,

    // ==========================================
    // THEMATIC 3D LEVEL ICONS (Unique per topic)
    // ==========================================
    // 1. Exact cardboard shipping box matching user photo for Variables & Dynamic Typing
    box: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="18,5 31,12 18,19 5,12" fill="#DEB088" stroke="#111827" stroke-width="2.2" stroke-linejoin="round"/>
      <polygon points="5,12 18,19 18,31 5,24" fill="#BF8758" stroke="#111827" stroke-width="2.2" stroke-linejoin="round"/>
      <polygon points="31,12 18,19 18,31 31,24" fill="#9C6B40" stroke="#111827" stroke-width="2.2" stroke-linejoin="round"/>
      <!-- Packaging Tape across top & front -->
      <polygon points="15.5,6.5 20.5,9.2 20.5,17.6 15.5,14.8" fill="#94A3B8"/>
      <polygon points="15.5,14.8 20.5,17.6 20.5,21.5 15.5,18.8" fill="#64748B"/>
      <!-- Red Fragile Sticker on left face -->
      <polygon points="8,17 13.5,19.8 13.5,25.2 8,22.4" fill="#EF4444" stroke="#B91C1C" stroke-width="0.8"/>
      <rect x="9.5" y="19.5" width="2.5" height="2.5" rx="0.5" fill="#FFFFFF"/>
      <!-- Dark staples/markings on right face -->
      <line x1="22" y1="23.5" x2="27" y2="21" stroke="#374151" stroke-width="1.6" stroke-linecap="round"/>
      <line x1="22" y1="26.5" x2="27" y2="24" stroke="#374151" stroke-width="1.6" stroke-linecap="round"/>
    </svg>`,

    // 2. Integers, Floats & Numbers
    numbers: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="12" width="13" height="18" rx="3" fill="#1E40AF"/>
      <rect x="3" y="10" width="13" height="18" rx="3" fill="#3B82F6" stroke="#111827" stroke-width="1.8"/>
      <text x="9.5" y="23" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">1</text>
      <rect x="20" y="12" width="13" height="18" rx="3" fill="#C2410C"/>
      <rect x="20" y="10" width="13" height="18" rx="3" fill="#F97316" stroke="#111827" stroke-width="1.8"/>
      <text x="26.5" y="23" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">2</text>
      <circle cx="18" cy="27" r="2.5" fill="#EAB308" stroke="#111827" stroke-width="1.2"/>
    </svg>`,

    // 3. Math & Arithmetic Cube
    math: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="28" height="26" rx="6" fill="#D97706"/>
      <rect x="4" y="4" width="28" height="26" rx="6" fill="#F59E0B" stroke="#111827" stroke-width="2"/>
      <path d="M11 11H17M14 8V14" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
      <line x1="21" y1="11" x2="27" y2="11" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M11 20L17 26M17 20L11 26" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
      <line x1="21" y1="21.5" x2="27" y2="21.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      <line x1="21" y1="24.5" x2="27" y2="24.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    // 4. Strings & Text Quotes
    string: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="28" height="24" rx="6" fill="#047857"/>
      <rect x="4" y="4" width="28" height="24" rx="6" fill="#10B981" stroke="#111827" stroke-width="2"/>
      <text x="13" y="21" font-size="14" font-weight="900" fill="#FFFFFF" font-family="sans-serif">A</text>
      <text x="21" y="21" font-size="11" font-weight="800" fill="#D1FAE5" font-family="sans-serif">a</text>
      <path d="M7 11C7 9.5 8 9 9 9V12" stroke="#FEF08A" stroke-width="2" stroke-linecap="round"/>
      <path d="M28 22C28 20.5 29 20 30 20V23" stroke="#FEF08A" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    // 5. Slicing & Strides (Scissors)
    scissors: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="26" r="4.5" fill="#3B82F6" stroke="#111827" stroke-width="2"/>
      <circle cx="26" cy="26" r="4.5" fill="#3B82F6" stroke="#111827" stroke-width="2"/>
      <path d="M13 23L27 7M23 23L9 7" stroke="#E2E8F0" stroke-width="3" stroke-linecap="round"/>
      <path d="M13 23L27 7M23 23L9 7" stroke="#111827" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="18" cy="15" r="2.5" fill="#EF4444" stroke="#111827" stroke-width="1.2"/>
    </svg>`,

    // 6. Methods & Memo Clean-up
    memo: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7" y="6" width="22" height="26" rx="4" fill="#0284C7"/>
      <rect x="7" y="4" width="22" height="26" rx="4" fill="#38BDF8" stroke="#111827" stroke-width="2"/>
      <line x1="12" y1="10" x2="20" y2="10" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="15" x2="24" y2="15" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="20" x2="22" y2="20" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      <circle cx="25" cy="24" r="5" fill="#F59E0B" stroke="#111827" stroke-width="1.5"/>
      <path d="M23 24L24.5 25.5L27.5 22.5" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    // 7. F-Strings & Formatting (Lightning Bracket)
    lightning_fstring: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2L8 18H18L15 34L28 15H17L20 2Z" fill="#D97706" transform="translate(0, 1)"/>
      <path d="M20 2L8 18H18L15 34L28 15H17L20 2Z" fill="#FBBF24" stroke="#111827" stroke-width="2" stroke-linejoin="round"/>
      <text x="14" y="19" font-size="9" font-weight="900" fill="#111827" font-family="sans-serif">{f}</text>
    </svg>`,

    // 8. Operators & Comparison Scales
    scales: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 5V29M11 29H25" stroke="#111827" stroke-width="2.6" stroke-linecap="round"/>
      <line x1="6" y1="10" x2="30" y2="10" stroke="#111827" stroke-width="2.6" stroke-linecap="round"/>
      <!-- Left Pan -->
      <path d="M6 10L3 18H13L10 10" stroke="#F59E0B" stroke-width="1.8"/>
      <path d="M3 18C3 20.5 5.5 22 8 22C10.5 22 13 20.5 13 18H3Z" fill="#F59E0B" stroke="#111827" stroke-width="1.5"/>
      <!-- Right Pan -->
      <path d="M26 10L23 18H33L30 10" stroke="#3B82F6" stroke-width="1.8"/>
      <path d="M23 18C23 20.5 25.5 22 28 22C30.5 22 33 20.5 33 18H23Z" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>
    </svg>`,

    // 9. Boolean Logic & Short-Circuit
    logic_branch: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="18" r="4" fill="#3B82F6" stroke="#111827" stroke-width="1.8"/>
      <path d="M12 18H18M18 18V9H24M18 18V27H24" stroke="#111827" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="28" cy="9" r="4.5" fill="#22C55E" stroke="#111827" stroke-width="1.8"/>
      <text x="28" y="12" font-size="7" font-weight="900" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">T</text>
      <circle cx="28" cy="27" r="4.5" fill="#EF4444" stroke="#111827" stroke-width="1.8"/>
      <text x="28" y="30" font-size="7" font-weight="900" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">F</text>
    </svg>`,

    // 10. Conditionals: If/Else Tree Branch
    tree_branch: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 31V17M18 17C18 11 9 12 9 6M18 17C18 11 27 12 27 6" stroke="#111827" stroke-width="3" stroke-linecap="round"/>
      <path d="M18 31V17M18 17C18 11 9 12 9 6M18 17C18 11 27 12 27 6" stroke="#4ADE80" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="9" cy="6" r="4" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>
      <circle cx="27" cy="6" r="4" fill="#EAB308" stroke="#111827" stroke-width="1.5"/>
    </svg>`,

    // 11. While Loops
    loop_while: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6C11.4 6 6 11.4 6 18C6 24.6 11.4 30 18 30C23 30 27.2 26.8 28.9 22.5" stroke="#111827" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M18 6C11.4 6 6 11.4 6 18C6 24.6 11.4 30 18 30C23 30 27.2 26.8 28.9 22.5" stroke="#06B6D4" stroke-width="2.8" stroke-linecap="round"/>
      <polygon points="26,17 32,23 24,25" fill="#06B6D4" stroke="#111827" stroke-width="1.5"/>
    </svg>`,

    // 12. For Loops & Range
    loop_for: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="9" width="28" height="18" rx="9" fill="#4338CA"/>
      <rect x="4" y="7" width="28" height="18" rx="9" fill="#6366F1" stroke="#111827" stroke-width="2"/>
      <circle cx="12" cy="16" r="3" fill="#FDE047" stroke="#111827" stroke-width="1"/>
      <circle cx="24" cy="16" r="3" fill="#A7F3D0" stroke="#111827" stroke-width="1"/>
      <path d="M15 16H21" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="2 2"/>
    </svg>`,

    // 13. Stop / Break Sign
    stop_sign: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12,4 24,4 32,12 32,24 24,32 12,32 4,24 4,12" fill="#B91C1C"/>
      <polygon points="12,3 24,3 32,11 32,23 24,31 12,31 4,23 4,11" fill="#EF4444" stroke="#111827" stroke-width="2"/>
      <rect x="9" y="15" width="18" height="4.5" rx="1.5" fill="#FFFFFF"/>
    </svg>`,

    // 14. Search & Inspection Lens
    search_lens: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="9.5" fill="#0284C7"/>
      <circle cx="15" cy="15" r="9.5" fill="#38BDF8" stroke="#111827" stroke-width="2.2"/>
      <circle cx="15" cy="15" r="6" fill="#BAE6FD" fill-opacity="0.6"/>
      <line x1="22.5" y1="22.5" x2="31" y2="31" stroke="#111827" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="22.5" y1="22.5" x2="31" y2="31" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,

    // 15. Lists & Arrays Stack
    list_stack: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="6" width="26" height="6.5" rx="2.5" fill="#3B82F6" stroke="#111827" stroke-width="1.8"/>
      <rect x="5" y="15" width="26" height="6.5" rx="2.5" fill="#10B981" stroke="#111827" stroke-width="1.8"/>
      <rect x="5" y="24" width="26" height="6.5" rx="2.5" fill="#F59E0B" stroke="#111827" stroke-width="1.8"/>
      <text x="8.5" y="11" font-size="5.5" font-weight="900" fill="#FFFFFF" font-family="monospace">[0]</text>
      <text x="8.5" y="20" font-size="5.5" font-weight="900" fill="#FFFFFF" font-family="monospace">[1]</text>
      <text x="8.5" y="29" font-size="5.5" font-weight="900" fill="#FFFFFF" font-family="monospace">[2]</text>
    </svg>`,

    // 16. Dictionaries & Keys
    dictionary_key: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="15" r="7.5" fill="#B45309"/>
      <circle cx="12" cy="14" r="7.5" fill="#F59E0B" stroke="#111827" stroke-width="2"/>
      <circle cx="12" cy="14" r="3.2" fill="#FEF3C7"/>
      <path d="M19 14H31V19H27V22H24V19H19" fill="#F59E0B" stroke="#111827" stroke-width="2" stroke-linejoin="round"/>
    </svg>`,

    // 17. Functions & Gears
    gear_module: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="12" fill="#0D9488"/>
      <path d="M18 3V7M18 29V33M3 18H7M29 18H33M7.4 7.4L10.2 10.2M25.8 25.8L28.6 28.6M7.4 28.6L10.2 25.8M25.8 10.2L28.6 7.4" stroke="#111827" stroke-width="3" stroke-linecap="round"/>
      <circle cx="18" cy="18" r="10" fill="#14B8A6" stroke="#111827" stroke-width="2"/>
      <circle cx="18" cy="18" r="4.5" fill="#CCFBF1" stroke="#111827" stroke-width="1.8"/>
    </svg>`,

    // 18. OOP & Classes (Temple)
    temple_oop: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="18,4 32,11 4,11" fill="#7C3AED" stroke="#111827" stroke-width="2"/>
      <rect x="4" y="27" width="28" height="5" rx="1.5" fill="#6D28D9" stroke="#111827" stroke-width="2"/>
      <rect x="7" y="11" width="4.5" height="16" fill="#A78BFA" stroke="#111827" stroke-width="1.5"/>
      <rect x="15.8" y="11" width="4.5" height="16" fill="#A78BFA" stroke="#111827" stroke-width="1.5"/>
      <rect x="24.5" y="11" width="4.5" height="16" fill="#A78BFA" stroke="#111827" stroke-width="1.5"/>
    </svg>`,

    // 19. Errors & Shield
    shield_error: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 4L31 8V18C31 25.5 25.5 30.5 18 32C10.5 30.5 5 25.5 5 18V8L18 4Z" fill="#BE123C"/>
      <path d="M18 4L31 8V18C31 25.5 25.5 30.5 18 32C10.5 30.5 5 25.5 5 18V8L18 4Z" fill="#F43F5E" stroke="#111827" stroke-width="2"/>
      <line x1="18" y1="11" x2="18" y2="20" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      <circle cx="18" cy="24.5" r="1.8" fill="#FFFFFF"/>
    </svg>`,

    // 20. Advanced Python Rocket
    rocket_advanced: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 3C18 3 27 7 27 20H9C9 7 18 3 18 3Z" fill="#EF4444" stroke="#111827" stroke-width="2"/>
      <circle cx="18" cy="12" r="3.5" fill="#38BDF8" stroke="#111827" stroke-width="1.5"/>
      <path d="M9 20L4 26H9L12 20M27 20L32 26H27L24 20" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>
      <path d="M14 26L18 33L22 26" fill="#F59E0B" stroke="#111827" stroke-width="1.5"/>
    </svg>`,

    // 21. Lambda & Functional
    lambda_func: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="18,3 31,10.5 31,25.5 18,33 5,25.5 5,10.5" fill="#1E293B" stroke="#111827" stroke-width="2"/>
      <polygon points="18,5 29,11.5 29,24.5 18,31 7,24.5 7,11.5" fill="#8B5CF6"/>
      <text x="18" y="23" font-size="16" font-weight="900" fill="#FFFFFF" text-anchor="middle" font-family="serif">λ</text>
    </svg>`,

    // 22. File I/O (Floppy Disk)
    floppy_disk: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="6" width="26" height="26" rx="4" fill="#1D4ED8"/>
      <rect x="5" y="4" width="26" height="26" rx="4" fill="#2563EB" stroke="#111827" stroke-width="2"/>
      <rect x="10" y="5" width="16" height="10" rx="1.5" fill="#E2E8F0"/>
      <rect x="9" y="19" width="18" height="11" rx="2" fill="#FFFFFF"/>
      <line x1="12" y1="23" x2="24" y2="23" stroke="#94A3B8" stroke-width="1.5"/>
      <line x1="12" y1="26" x2="20" y2="26" stroke="#94A3B8" stroke-width="1.5"/>
    </svg>`,

    // 23. Review Questions Mode (Duolingo Mistake Review Loop)
    review: `<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="13" fill="#F59E0B" stroke="#111827" stroke-width="2"/>
      <path d="M12 18C12 14.7 14.7 12 18 12C20.5 12 22.7 13.5 23.5 15.8" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      <path d="M24 18C24 21.3 21.3 24 18 24C15.5 24 13.3 22.5 12.5 20.2" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      <polygon points="21,16 26,16 24,11" fill="#FFFFFF"/>
      <polygon points="15,20 10,20 12,25" fill="#FFFFFF"/>
    </svg>`
  },

  /**
   * Retrieves an SVG icon string sized and decorated with prolingo styles.
   * @param {string} name - Name of the icon
   * @param {number} size - Desired width/height in px (default: 24)
   * @param {string} extraClass - Optional extra CSS class
   * @returns {string} Raw SVG HTML
   */
  get(name, size = 24, extraClass = '') {
    // Map aliases
    const aliases = {
      streak: 'fire',
      gems: 'gem',
      hearts: 'heart',
      leaderboard: 'leagues',
      trophy: 'leagues',
      user: 'profile',
      dumbbell: 'practice',
      gear: 'settings',
      unlimited: 'super',
      xp: 'lightning',
      checkmark: 'check',
      guidebook: 'book',
      tip: 'bulb',
      clock: 'timer',
      snowflake: 'freeze',
      wager: 'double',
      mascot: 'logo',
      brand: 'logo'
    };

    const key = aliases[name] || name;
    let svg = this.svgs[key];
    if (!svg) {
      // Fallback
      return `<span class="icon-fallback">${name}</span>`;
    }

    const cls = `prolingo-svg-icon icon-${key} ${extraClass}`.trim();
    // Inject custom width, height, and class into the svg tag
    svg = svg.replace('<svg ', `<svg class="${cls}" style="width: ${size}px; height: ${size}px;" `);
    return svg;
  },

  has(name) {
    const aliases = {
      streak: 'fire',
      gems: 'gem',
      hearts: 'heart',
      leaderboard: 'leagues',
      trophy: 'leagues',
      user: 'profile',
      dumbbell: 'practice',
      gear: 'settings',
      unlimited: 'super',
      xp: 'lightning',
      checkmark: 'check',
      guidebook: 'book',
      tip: 'bulb',
      clock: 'timer',
      snowflake: 'freeze',
      wager: 'double',
      mascot: 'logo',
      brand: 'logo'
    };
    const key = aliases[name] || name;
    return Boolean(this.svgs[key]);
  },

  /**
   * Intelligently resolves and renders bespoke 3D level icons for units & lessons
   * @param {string} rawKey - Emoji, icon name, or keyword
   * @param {number} size - Desired icon size in px (default: 38)
   * @param {string} contextTitle - Optional lesson/unit title to infer domain icon
   * @returns {string} Raw 3D SVG icon
   */
  getLevelIcon(rawKey, size = 38, contextTitle = '') {
    // If it's already an existing SVG key
    if (rawKey && this.svgs[rawKey]) {
      return this.get(rawKey, size);
    }

    const str = `${rawKey || ''} ${contextTitle || ''}`.toLowerCase();

    // Thematic Mapping
    if (rawKey === '📦' || str.includes('variable') || str.includes('dynamic') || str.includes('package') || str.includes('box')) {
      return this.get('box', size);
    }
    if (rawKey === '🔢' || str.includes('integer') || str.includes('float') || str.includes('number')) {
      return this.get('numbers', size);
    }
    if (rawKey === '➗' || str.includes('arithmetic') || str.includes('modulo') || str.includes('math')) {
      return this.get('math', size);
    }
    if (rawKey === '🔤' || (str.includes('string') && !str.includes('slice') && !str.includes('f-string')) || str.includes('escape')) {
      return this.get('string', size);
    }
    if (rawKey === '✂️' || str.includes('slice') || str.includes('stride')) {
      return this.get('scissors', size);
    }
    if (rawKey === '📝' || str.includes('method') || str.includes('clean-up')) {
      return this.get('memo', size);
    }
    if (rawKey === '⚡' || str.includes('f-string') || str.includes('formatting')) {
      return this.get('lightning_fstring', size);
    }
    if (rawKey === '⚖️' || str.includes('comparison') || str.includes('identity') || str.includes('operator')) {
      return this.get('scales', size);
    }
    if (rawKey === '🔀' || str.includes('boolean') || str.includes('logic') || str.includes('short-circuit')) {
      return this.get('logic_branch', size);
    }
    if (rawKey === '🌿' || str.includes('conditional') || str.includes('if') || str.includes('elif')) {
      return this.get('tree_branch', size);
    }
    if (rawKey === '🔄' || str.includes('while') || str.includes('sentinel')) {
      return this.get('loop_while', size);
    }
    if (rawKey === '🔁' || str.includes('for loop') || str.includes('range')) {
      return this.get('loop_for', size);
    }
    if (rawKey === '🛑' || str.includes('break') || str.includes('continue') || str.includes('loop control')) {
      return this.get('stop_sign', size);
    }
    if (rawKey === '🔍' || str.includes('search') || str.includes('else-construct')) {
      return this.get('search_lens', size);
    }
    if (rawKey === '📜' || str.includes('list') || str.includes('array') || str.includes('index')) {
      return this.get('list_stack', size);
    }
    if (rawKey === '🔑' || str.includes('dict') || str.includes('key') || str.includes('hash')) {
      return this.get('dictionary_key', size);
    }
    if (rawKey === '⚙️' || str.includes('function') || str.includes('module') || str.includes('def ')) {
      return this.get('gear_module', size);
    }
    if (rawKey === '🏛️' || str.includes('oop') || str.includes('class') || str.includes('object') || str.includes('inherit')) {
      return this.get('temple_oop', size);
    }
    if (rawKey === '🛡️' || str.includes('error') || str.includes('exception') || str.includes('try') || str.includes('except')) {
      return this.get('shield_error', size);
    }
    if (rawKey === '🚀' || str.includes('advanced') || str.includes('mastery') || str.includes('3.12')) {
      return this.get('rocket_advanced', size);
    }
    if (rawKey === 'λ' || str.includes('lambda')) {
      return this.get('lambda_func', size);
    }
    if (rawKey === '💾' || str.includes('file') || str.includes('io')) {
      return this.get('floppy_disk', size);
    }

    // Default high-grade fallback
    return this.get('box', size);
  },

  hydrate(root = document) {
    if (!root || !root.querySelectorAll) return;
    const targets = root.querySelectorAll('[data-icon]');
    targets.forEach(el => {
      const name = el.getAttribute('data-icon');
      const size = parseInt(el.getAttribute('data-icon-size'), 10) || 24;
      const extraClass = el.getAttribute('data-icon-class') || '';
      el.innerHTML = this.get(name, size, extraClass);
    });
  }
};

if (typeof window !== 'undefined') {
  window.Icons = Icons;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Icons.hydrate());
  } else {
    Icons.hydrate();
  }
}

