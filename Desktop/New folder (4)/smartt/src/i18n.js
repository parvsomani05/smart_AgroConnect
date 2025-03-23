import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import guTranslation from "./locales/gu.json";
import hiTranslation from "./locales/hi.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      gu: { translation: guTranslation },
      hi: { translation: hiTranslation },
    },
    lng: localStorage.getItem("language") || "en",  // Load saved language
    fallbackLng: "en",  
    interpolation: { escapeValue: false },
  });

export default i18n;
