import { ref, onMounted } from "vue";
import { fetchReimbursements } from "./ReimbursementService";
import { Reimbursement } from "./reimbursement";

interface ApiResponse {
  claims: {
    id: number;
    description: string;
    amount: number;
    date: string;
    user_name: string;
    location: string;
    status: number;
    receipts: string[];
    tags: string[];
  }[];
}

function formatReimbursement(data: ApiResponse["claims"][0]): Reimbursement {
  return {
    id: data.id,
    description: data.description,
    amount: data.amount.toString(),
    date: data.date,
    user_name: data.user_name,
    location: data.location,
    status: data.status,
    receipts: data.receipts || [],
    tags: data.tags.map((tag) => ({ id: 0, name: tag })),
  };
}

export function useReimbursements() {
  const reimbursements = ref<Reimbursement[]>([]);

  const loadReimbursements = async (): Promise<void> => {
    try {
      const response: ApiResponse = await fetchReimbursements();

      if (!response.claims) {
        throw new Error("Invalid API response format.");
      }

      reimbursements.value = response.claims.map(formatReimbursement);
    } catch (error) {
      console.error("Failed to load reimbursements:", error);
    }
  };

  onMounted(loadReimbursements);

  return { reimbursements, loadReimbursements };
}
