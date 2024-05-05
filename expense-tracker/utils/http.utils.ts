import { Expense, ExpenseDetails, Expenses } from "../models/expenses.model";
import axios, { AxiosResponse } from "axios";

const BACKEND_BASE_URL = "https://rn-http-e64e8-default-rtdb.firebaseio.com/";
const EXPENSES_PATH = "expenses.json";

const expenseURL = `${BACKEND_BASE_URL}/${EXPENSES_PATH}`;

const httpUtils = {
  addExpense: async (expenseDetails: ExpenseDetails) => {
    const response = await axios.post(expenseURL, expenseDetails);
    const id = response.data?.name;
    return id;
  },

  fetchExpenses: async () => {
    const expenses: Expenses = [];
    let error: any;
    try {
      const response = await axios.get(expenseURL);
      const data = response.data;

      for (let key in data) {
        const expenseDetails: ExpenseDetails = data[key];
        expenseDetails.date = new Date(expenseDetails.date);
        const expense: Expense = { ...expenseDetails, id: key };
        expenses.push(expense);
      }
    } catch (e) {
      error = e;
    }

    return [expenses, error];
  },

  updateExpense: async (id: string, expenseDetails: ExpenseDetails) => {
    const updateExpURL = `${BACKEND_BASE_URL}/expenses/${id}.json`;
    return await axios.put(updateExpURL, expenseDetails);
  },

  deleteExpense: async (id: string) => {
    return await axios.delete(`${BACKEND_BASE_URL}/expenses/${id}.json`);
  },
};

export default httpUtils;
