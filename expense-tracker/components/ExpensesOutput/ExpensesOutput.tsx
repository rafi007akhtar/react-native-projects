import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import { BaseProps } from "../../models/base.model";
import { Expenses } from "../../models/expenses.model";
import ExpensesList from "./ExpensesList";
import { MOCK_EXPENSES } from "../../constants/mockData";
import { globalStyles } from "../../constants/styles";
import { useAtom } from "jotai";
import { manageExpenseOpenedAtom } from "../../state/atoms";

interface ExpensesOutputProps extends BaseProps {
  expensesPeriod: string;
  expenses?: Expenses;
}

export default function ExpensesOutput(props: ExpensesOutputProps) {
  const [manageExpenseOpened] = useAtom(manageExpenseOpenedAtom);

  return (
    <View style={[styles.container, manageExpenseOpened && styles.backdrop]}>
      <ExpensesSummary
        expenses={MOCK_EXPENSES}
        periodName={props.expensesPeriod}
      />
      <ExpensesList expenses={MOCK_EXPENSES} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: globalStyles.colors.primary700,
  },
  backdrop: {
    opacity: 0.5,
  },
});
