export interface Expense {
  id: string;
  description: string;
  date: Date;
  amount: number;
}

export type Expenses = Array<Expense>;
