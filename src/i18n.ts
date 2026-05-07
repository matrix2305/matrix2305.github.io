import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import srTranslation from './locales/sr/translation.json';

// Define the structure of our resources
const resources = {
  en: {
    translation: enTranslation
  },
  sr: {
    translation: srTranslation
  }
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if translation is missing
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;