export interface ExpenseDetails {
  description: string;
  date: Date;
  amount: number;
}

export interface Expense extends ExpenseDetails {
  id: string;
}

export interface ExpenseFormInputs {
  description: string;
  date: string;
  amount: string;
}

export type Expenses = Array<Expense>;
