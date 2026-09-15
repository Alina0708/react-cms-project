const ROUTES = ['/', '/welcome', '/theory', '/structure', '/simulator', '/contacts'];

const LABELS = {
  ru: {
    '/': 'Главная',
    '/welcome': 'О проекте',
    '/theory': 'Теория',
    '/structure': 'Структура',
    '/simulator': 'Симулятор',
    '/contacts': 'Контакты',
  },
  en: {
    '/': 'Home',
    '/welcome': 'About',
    '/theory': 'Theory',
    '/structure': 'Structure',
    '/simulator': 'Simulator',
    '/contacts': 'Contacts',
  },
};

export const getNavItems = (language) => ROUTES.map((to) => ({ to, label: LABELS[language][to] }));
