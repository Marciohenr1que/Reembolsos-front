import ApiClient from "../ApiClient";

interface ReimbursementApiResponse {
  id: number;
  description: string;
  amount: string;
  date: string;
  user_id: number;
  location: string;
  status: number;
  receipt?: string;
  tags?: string[] | string | null;
}

export async function fetchReimbursements(): Promise<
  ReimbursementApiResponse[]
> {
  try {
    const response = await ApiClient.get<ReimbursementApiResponse[]>("/claims");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar reembolsos:", error);
    return [];
  }
}

export async function createReimbursement(
  data: Partial<ReimbursementApiResponse>
): Promise<ReimbursementApiResponse> {
  const formData = buildFormData(data);

  try {
    const response = await ApiClient.post<{
      message: string;
      claim: ReimbursementApiResponse;
    }>("/claims", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (!response.data.claim || !response.data.claim.id) {
      throw new Error("Resposta da API inválida");
    }

    return response.data.claim;
  } catch (error) {
    console.error("Erro ao criar reembolso:", error);
    throw error;
  }
}

function buildFormData(data: Partial<ReimbursementApiResponse>): FormData {
  const formData = new FormData();
  if (data.amount) formData.append("claim[amount]", data.amount.toString());
  if (data.description) formData.append("claim[description]", data.description);
  if (data.status !== undefined)
    formData.append("claim[status]", data.status.toString());
  if (data.date) formData.append("claim[date]", data.date);
  if (data.location) formData.append("claim[location]", data.location);

  if (
    data.receipt &&
    typeof data.receipt === "object" &&
    "name" in data.receipt
  ) {
    formData.append("claim[receipts][]", data.receipt as File);
  }

  if (Array.isArray(data.tags) && data.tags.length > 0) {
    data.tags.forEach((tag) => formData.append("claim[tags][]", tag));
  } else if (typeof data.tags === "string" && data.tags.trim() !== "") {
    formData.append("claim[tags][]", data.tags);
  }

  return formData;
}
