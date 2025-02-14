import { createI18n } from "vue-i18n";
import dashboard from "./locales/pt/dashboard.json";
import ErrorMessages from "../i18n/locales/pt/errorMessages.json";

export const i18n = createI18n({
  legacy: false,
  locale: "pt",
  fallbackLocale: "en",
  messages: {
    pt: { ...dashboard, ...ErrorMessages },
  },
});
