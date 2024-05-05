import { Expense, ExpenseDetails, Expenses } from "../models/expenses.model";
import axios from "axios";

const BACKEND_BASE_URL = "https://rn-http-e64e8-default-rtdb.firebaseio.com/";
const EXPENSES_PATH = "expenses.json";
// const ERROR_URL = "https://rn-http-e64e8-default-rtdb.firebaseiocom/";

const expenseURL = `${BACKEND_BASE_URL}/${EXPENSES_PATH}`;

const httpUtils = {
  addExpense: async (expenseDetails: ExpenseDetails) => {
    let id: string, err: any;
    try {
      const response = await axios.post(EXPENSES_PATH, expenseDetails);
      id = response.data?.name;
    } catch (e) {
      err = e;
    }
    return [id, err];
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
    let err: any;
    try {
      await axios.put(updateExpURL, expenseDetails);
    } catch (e) {
      err = e;
    }
    return [err];
  },

  deleteExpense: async (id: string) => {
    let err: any;
    try {
      await axios.delete(`${BACKEND_BASE_URL}/expenses/${id}.json`);
    } catch (e) {
      err = e;
    }
    return [err];
  },
};

export default httpUtils;
