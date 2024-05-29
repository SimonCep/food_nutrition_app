import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./trans/en.json";
import lt from "./trans/lt.json";

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    lt: { translation: lt },
  },
  compatibilityJSON: "v3", // panaikina i18next::pluralResolver errora
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18next;
