import { create } from "zustand";
import { Expense, ExpenseDetails, Expenses } from "../models/expenses.model";
import { MOCK_EXPENSES } from "../constants/mockData";

export interface State {
  expenses: Expenses;
}

export interface Action {
  addExpense: (newExp: ExpenseDetails) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, newExpData: ExpenseDetails) => void;
}

const useStore = create<State & Action>((set, get) => ({
  // state part goes here
  expenses: MOCK_EXPENSES,

  // actions go here (add, delete, update)
  addExpense: (expData: ExpenseDetails) => {
    set((state: State) => {
      const newExp = { ...expData, id: "" + Math.random() };
      return {
        expenses: [...state.expenses, newExp],
      };
    });
  },

  deleteExpense: (id: string) => {
    set((state) => {
      const filteredExpenses = state.expenses.filter(
        (expense) => expense.id !== id
      );
      return { expenses: filteredExpenses };
    });
  },

  updateExpense: (id: string, newExpData: ExpenseDetails) => {
    const currentExpenses = [...get().expenses];

    let oldExp: Expense,
      pos: number = -1;

    for (let i = 0; i < currentExpenses.length; i++) {
      const expense = currentExpenses[i];
      if (expense.id === id) {
        oldExp = { ...expense };
        pos = i;
        break;
      }
    }

    if (oldExp) {
      const updatedExpense = { ...oldExp, ...newExpData };
      currentExpenses[pos] = updatedExpense;
    }

    set(() => {
      return { expenses: currentExpenses };
    });
  },
}));

export default useStore;
