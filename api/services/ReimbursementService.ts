import ApiClient from "../ApiClient";

interface Reimbursement {
  id: number;
  description: string;
  amount: number;
  date: string;
  userId: number;
  location: string;
  status: number;
  receiptUrl?: string;
}

interface ReimbursementData {
  amount: number;
  description: string;
  receipts: File | null;
  date: string;
  location: string;
  tags: string;
  status: number;
}

export const ReimbursementService = {
  async fetchReimbursements(): Promise<Reimbursement[]> {
    try {
      const response = await ApiClient.get("/claims");
      return response.data.map((reimbursement: any) => ({
        id: reimbursement.id,
        description: reimbursement.description,
        amount: parseFloat(reimbursement.amount),
        date: reimbursement.date,
        userId: reimbursement.user_id,
        location: reimbursement.location,
        status: reimbursement.status,
        receiptUrl: reimbursement.receipt_url || "",
      }));
    } catch (error) {
      console.error("Error fetching reimbursements:", error);
      return [];
    }
  },

  async createReimbursement(data: ReimbursementData): Promise<void> {
    const formData = new FormData();
    formData.append("claim[amount]", data.amount.toString());
    formData.append("claim[description]", data.description);
    formData.append("claim[status]", data.status.toString());
    formData.append("claim[date]", data.date);
    formData.append("claim[location]", data.location);

    if (data.tags) {
      data.tags
        .split(",")
        .forEach((tag: string) => formData.append("claim[tags][]", tag.trim()));
    }

    if (data.receipts) {
      formData.append("claim[receipts][]", data.receipts);
    }

    await ApiClient.post("/claims", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
