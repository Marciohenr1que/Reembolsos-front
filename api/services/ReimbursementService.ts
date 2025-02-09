import ApiClient from "../ApiClient";

export interface Reimbursement {
  id: number;
  description: string;
  amount: number;
  date: string;
  status: number;
  user_id: number;
  location: string;
  receipts: string[];
  tags: string[];
}

interface ReimbursementApiResponse
  extends Omit<Reimbursement, "amount" | "tags"> {
  amount: string;
  tags: { id: number; name: string }[];
}

interface ReimbursementApiResponsePaginated {
  claims: ReimbursementApiResponse[];
  currentPage: number;
  totalPages: number;
}

export const fetchReimbursements = async (page = 1) => {
  try {
    const { data } = await ApiClient.get<ReimbursementApiResponsePaginated>(
      "/claims",
      {
        params: { page },
      }
    );

    return {
      claims: data.claims.map((claim) => ({
        ...claim,
        amount: parseFloat(claim.amount),
        tags: claim.tags.map((tag) => tag.name),
      })),
      currentPage: data.currentPage ?? 1,
      totalPages: data.totalPages ?? 1,
    };
  } catch (error) {
    console.error("Erro ao buscar reembolsos:", error);
    throw new Error("Falha ao carregar os dados.");
  }
};

export const createReimbursement = async (
  data: Partial<Reimbursement>
): Promise<Reimbursement> => {
  const formData = buildFormData(data);

  try {
    const { data: response } = await ApiClient.post<{
      message: string;
      claim: Reimbursement;
    }>("/claims", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.claim;
  } catch (error) {
    console.error("Erro ao criar reembolso:", error);
    throw new Error("Erro ao criar reembolso.");
  }
};

const buildFormData = (data: Partial<Reimbursement>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(`claim[${key}][]`, v.toString()));
      } else {
        formData.append(`claim[${key}]`, value.toString());
      }
    }
  });
  return formData;
};
