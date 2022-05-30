import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nextHttpBackend from 'i18next-http-backend';

export const init18n = (lng: string) =>
  i18n
    .use(new i18nextHttpBackend(null, {
      loadPath: '/translations/messages.{{lng}}.json'
    }))
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      lng,
      fallbackLng: 'en',
      debug: true,

      interpolation: {
        escapeValue: false // react already safes from xss
      }
    });
