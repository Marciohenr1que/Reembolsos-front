import errorMessages from "../i18n/locales/pt/errorMessages.json";

export interface ErrorMessage {
  title: string;
  message: string;
}
export type ErrorCodes = keyof typeof errorMessages;
export const errors: Record<ErrorCodes, ErrorMessage> = errorMessages;
