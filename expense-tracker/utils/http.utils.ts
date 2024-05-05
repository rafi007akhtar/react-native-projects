import { Expense, ExpenseDetails, Expenses } from "../models/expenses.model";
import axios, { AxiosResponse } from "axios";

const BACKEND_BASE_URL = "https://rn-http-e64e8-default-rtdb.firebaseio.com/";
const EXPENSES_PATH = "expenses.json";

const expenseURL = `${BACKEND_BASE_URL}/${EXPENSES_PATH}`;

const httpUtils = {
  addExpense: (expenseDetails: ExpenseDetails) => {
    axios.post(expenseURL, expenseDetails);
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
};

export default httpUtils;
