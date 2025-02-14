import ApiClient from "../ApiClient";

export interface Reimbursement {
  id: number;
  description: string;
  amount: number;
  date: string;
  status: number;
  user_name: string;
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

export const fetchReimbursements = async (page = 1, searchQuery = "") => {
  try {
    const { data } = await ApiClient.get<ReimbursementApiResponsePaginated>(
      "/claims",
      {
        params: { page, search: searchQuery },
      }
    );

    return {
      claims: data.claims.map((claim) => ({
        ...claim,
        amount: parseFloat(claim.amount),
        user_name: claim.user_name,
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
      errors?: string[];
      claim?: Reimbursement;
    }>("/claims", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.errors) {
      throw new Error(response.errors.join("\n"));
    }

    return response.claim!;
  } catch (error: any) {
    if (error.response && error.response.status === 422) {
      const errorMessage =
        error.response.data.errors?.join("\n") || "Erro ao criar reembolso.";
      alert(errorMessage);
    }
    console.error("Erro ao criar reembolso:", error);
    throw new Error("Erro ao criar reembolso.");
  }
};

export const updateReimbursementStatus = async (
  id: number,
  newStatus: number
): Promise<void> => {
  try {
    await ApiClient.patch(`/claims/${id}`, { status: newStatus });
  } catch (error) {
    console.error("Erro ao atualizar status do reembolso:", error);
    throw new Error("Erro ao atualizar status do reembolso.");
  }
};

const buildFormData = (data: Partial<Reimbursement>): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v instanceof File) {
            formData.append(`claim[${key}][]`, v);
          } else {
            formData.append(`claim[${key}][]`, v.toString());
          }
        });
      } else {
        formData.append(`claim[${key}]`, value.toString());
      }
    }
  });

  return formData;
};
