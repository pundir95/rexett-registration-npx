import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./translations/translation.en.json";
import svTranslation from "./translations/translation.sv.json";

i18n.use(initReactI18next).init({
  resources: {
    en: enTranslation,
    sv: svTranslation,
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;