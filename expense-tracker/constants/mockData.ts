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
    amount: 33.99,
    description: "A score of smores",
    date: new Date("2024-03-01"),
  },
  {
    id: "e4",
    amount: 44,
    description: "A bleak book",
    date: new Date("2024-04-01"),
  },
  {
    id: "e5",
    amount: 55,
    description: "A bleaker book",
    date: new Date("2024-05-01"),
  },
  {
    id: "e6",
    amount: 66,
    description: "Four fimly figurines",
    date: new Date("2024-06-01"),
  },
  {
    id: "e7",
    amount: 77,
    description: "Eight enticing eclairs",
    date: new Date("2024-07-01"),
  },
];
