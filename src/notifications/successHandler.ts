import { toast } from "vue-sonner";
import { successResponses, SuccessCodes } from "./success";

export function handleApiSuccess(status: number): void {
  const successKey = status.toString() as SuccessCodes;
  const successData = successResponses[successKey] || {
    title: "Sucesso!",
    message: "Ação realizada com sucesso.",
  };

  toast.success(successData.message, { description: successData.title });
}
