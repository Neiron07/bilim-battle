import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationKZ from './../lang/kz.json';
import translationRU from './../lang/ru.json';

const savedLanguage = localStorage.getItem('language');
const defaultLanguage = savedLanguage || 'kz'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      kz: {
        translation: translationKZ,
      },
      ru: {
        translation: translationRU,
      },
    },
    lng: defaultLanguage, // Установите начальный язык
    fallbackLng: 'ru', // Язык по умолчанию, если перевод для текущего языка отсутствует
    interpolation: {
      escapeValue: false, // Не экранировать HTML и React-компоненты
    },
  });

export default i18n;
