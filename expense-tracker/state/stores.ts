import { create } from "zustand";
import { Expense, ExpenseDetails, Expenses } from "../models/expenses.model";

export interface State {
  expenses: Expenses;
}

export interface Action {
  setExpenses: (expenses: Expenses) => void;
  addExpense: (newExp: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, newExpData: ExpenseDetails) => void;
}

const useStore = create<State & Action>((set, get) => ({
  // state part goes here
  expenses: [],

  // actions go here (set, add, delete, update)
  setExpenses: (expenses: Expenses) => {
    set(() => {
      return { expenses: expenses.reverse() };
    });
  },

  addExpense: (expData: Expense) => {
    if (!expData.id) {
      expData.id = "" + Math.random();
    }
    set((state: State) => {
      const newExp = { ...expData };
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
