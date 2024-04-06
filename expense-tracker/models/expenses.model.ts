export interface ExpenseDetails {
  description: string;
  date: Date;
  amount: number;
}

export interface Expense extends ExpenseDetails {
  id: string;
}

export type Expenses = Array<Expense>;
