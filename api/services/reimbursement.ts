export interface Reimbursement {
  id: number;
  description: string;
  amount: string;
  date: string;
  status: number;
  user_name: string;
  location: string;
  receipts: string[];
  tags: { id: number; name: string }[];
}
