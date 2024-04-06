import { Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import { BaseProps } from "../../models/base.model";
import { Expenses } from "../../models/expenses.model";
import ExpensesList from "./ExpensesList";
import { MOCK_EXPENSES } from "../../constants/mockData";

interface ExpensesOutputProps extends BaseProps {
  expensesPeriod: string;
  expenses?: Expenses;
}

export default function ExpensesOutput(props: ExpensesOutputProps) {
  return (
    <View>
      <ExpensesSummary
        expenses={MOCK_EXPENSES}
        periodName={props.expensesPeriod}
      />
      <ExpensesList expenses={MOCK_EXPENSES} />
    </View>
  );
}
