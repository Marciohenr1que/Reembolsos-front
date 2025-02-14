import successMessages from "../i18n/locales/pt/successMessages.json";

export interface SuccessMessage {
  title: string;
  message: string;
}

export type SuccessCodes = keyof typeof successMessages;

export const successResponses: Record<SuccessCodes, SuccessMessage> =
  successMessages;
