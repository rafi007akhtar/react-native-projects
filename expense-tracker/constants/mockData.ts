import { Expenses } from "../models/expenses.model";

export const MOCK_EXPENSES: Expenses = [
  {
    id: "e1",
    amount: 12,
    description: "A pair of pears",
    date: new Date("2024-01-01"),
  },
  {
    id: "e2",
    amount: 22,
    description: "A dozen doses",
    date: new Date("2024-02-01"),
  },
  {
    id: "e3",
    amount: 33,
    description: "A score of smores",
    date: new Date("2024-03-01"),
  },
  {
    id: "e4",
    amount: 44,
    description: "A book",
    date: new Date("2024-04-01"),
  },
  {
    id: "e5",
    amount: 55,
    description: "Another book",
    date: new Date("2024-05-01"),
  },
];
