import { ref, onMounted } from "vue";
import { fetchReimbursements } from "../services/ReimbursementService";
import { Reimbursement } from "../services/reimbursement";

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

function formatReimbursement(data: ReimbursementApiResponse): Reimbursement {
  return {
    id: data.id,
    description: data.description,
    amount: parseFloat(data.amount),
    date: data.date,
    userId: data.user_id,
    location: data.location,
    status: data.status,
    receipts: data.receipt ? [data.receipt] : [],
    tags: Array.isArray(data.tags)
      ? data.tags
      : typeof data.tags === "string" && data.tags.trim() !== ""
        ? data.tags.split(",").map((tag) => tag.trim())
        : [],
  };
}

export function useReimbursements() {
  const reimbursements = ref<Reimbursement[]>([]);

  const loadReimbursements = async (): Promise<void> => {
    try {
      const response = await fetchReimbursements();
      reimbursements.value = response.map(formatReimbursement);
    } catch (error) {
      console.error("Failed to load reimbursements:", error);
    }
  };

  onMounted(loadReimbursements);

  return { reimbursements, loadReimbursements };
}
