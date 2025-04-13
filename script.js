const translations = {
  en: {
    heroTitle: "Connecting Destinations, Elevating Journeys",
    heroDesc: "Experience the future of mobility with gamified transportation",
    startButton: "Start Your Adventure"
  }
};

const currentLang = localStorage.getItem('lang') || 'en';
document.documentElement.lang = currentLang;
document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

function updateContent(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  updateContent(currentLang);
  AOS.init({ duration: 1000, once: true, offset: 100 });
});