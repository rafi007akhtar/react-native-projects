import { View, Text, StyleSheet } from "react-native";
import { BaseProps } from "../../models/base.model";
import { Expense, Expenses } from "../../models/expenses.model";
import { globalStyles } from "../../constants/styles";

interface ExpensesSummaryProps extends BaseProps {
  expenses: Expenses;
  periodName: string;
}

export default function ExpensesSummary(props: ExpensesSummaryProps) {
  const total = props.expenses.reduce((total, curr) => total + curr.amount, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{props.periodName}</Text>
      <Text style={styles.sum}>₹ {total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: globalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontFamily: "product-sans",
    fontSize: 12,
    color: globalStyles.colors.primary400,
  },
  sum: {
    fontFamily: "product-sans-bold",
    fontSize: 16,
    color: globalStyles.colors.primary500,
  },
});
