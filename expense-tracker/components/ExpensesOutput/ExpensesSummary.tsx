import { View, Text } from "react-native";
import { BaseProps } from "../../models/base.model";
import { Expense, Expenses } from "../../models/expenses.model";

interface ExpensesSummaryProps extends BaseProps {
  expenses: Expenses;
  periodName: string;
}

export default function ExpensesSummary(props: ExpensesSummaryProps) {
  const total = props.expenses.reduce((total, curr) => total + curr.amount, 0);
  return (
    <View>
      <Text>{props.periodName}</Text>
      <Text>₹ {total.toFixed(2)}</Text>
    </View>
  );
}
