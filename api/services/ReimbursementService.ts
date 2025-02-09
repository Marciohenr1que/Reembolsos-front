import ApiClient from "../ApiClient";

interface ReimbursementApiResponse {
  id: number;
  description: string;
  amount: string;
  date: string;
  status: number;
  user_id: number;
  location: string;
  receipts: string[];
  tags: { id: number; name: string }[];
}

export const fetchReimbursements = async (): Promise<
  ReimbursementApiResponse[]
> => {
  const response = await ApiClient.get<{ claims: ReimbursementApiResponse[] }>(
    "/claims"
  );

  if (!response.data?.claims) {
    throw new Error("Dados inválidos recebidos da API");
  }

  return response.data.claims.map((claim) => ({
    ...claim,
    amount: parseFloat(claim.amount), // Converte amount para número (se necessário)
    tags: claim.tags.map((tag) => tag.name), // Extrai apenas os nomes das tags
  }));
};

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
    data.receipts &&
    typeof data.receipts === "object" &&
    "name" in data.receipts
  ) {
    formData.append("claim[receipts][]", data.receipts as File);
  }

  if (Array.isArray(data.tags) && data.tags.length > 0) {
    data.tags.forEach((tag) => formData.append("claim[tags][]", tag));
  } else if (typeof data.tags === "string" && data.tags.trim() !== "") {
    formData.append("claim[tags][]", data.tags);
  }

  return formData;
}
