import { FormErrors } from "../models/errors.model";
import { ExpenseDetails } from "../models/expenses.model";

export function validateExpenseForm(expense: ExpenseDetails) {
  const { amount, date, description } = expense;

  let errors: FormErrors = {};

  const amountIsValid = !!amount && amount > 0;
  if (!amountIsValid) {
    errors.amount =
      amount < 0
        ? "Please enter a positive value for amount"
        : "Amount is invalid";
  }

  const dateIsValid = !!date && !!date.getDate();
  if (!dateIsValid) {
    errors.date = "Please enter a valid date";
  }

  const descIsValid = !!description.trim().length;
  if (!descIsValid) {
    errors.description = "Description cannot be empty";
  }

  return errors;
}
