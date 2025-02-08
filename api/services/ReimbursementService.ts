import ApiClient from "../ApiClient";

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
        .forEach((tag) => formData.append("claim[tags][]", tag.trim()));
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
