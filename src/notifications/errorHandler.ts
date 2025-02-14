import { toast } from "vue-sonner";
import { errors, ErrorCodes } from "./Errors";
import { AxiosError } from "axios";

interface ValidationErrorResponse {
  errors?: string[];
}

export function handleApiError(error: AxiosError): Promise<never> {
  console.error("Erro na requisição:", error);

  if (!error.response) {
    const errorData = errors.NETWORK;
    toast.error(errorData.message, { description: errorData.title });
    return Promise.reject(new Error(errorData.message));
  }

  const { status, data } = error.response;
  const errorKey = status.toString() as ErrorCodes;
  const errorData = errors[errorKey] || {
    title: "Erro desconhecido",
    message: "Ocorreu um erro inesperado.",
  };

  let message = errorData.message;

  if (status === 422 && (data as ValidationErrorResponse).errors) {
    message = (data as ValidationErrorResponse).errors!.join("\n");
  }

  toast.error(message, { description: errorData.title });

  if (status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return Promise.reject(new Error(message));
}

(
  window as unknown as { handleApiError: typeof handleApiError }
).handleApiError = handleApiError;
