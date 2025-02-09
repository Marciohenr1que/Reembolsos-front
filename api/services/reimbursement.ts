export interface Reimbursement {
  id: number;
  description: string;
  amount: number;
  date: string;
  userId: number;
  location: string;
  status: number;
  receipts?: string[];
  tags?: string[] | string | null;
}
