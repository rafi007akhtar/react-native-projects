import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import { BaseProps } from "../../models/base.model";
import { Expenses } from "../../models/expenses.model";
import ExpensesList from "./ExpensesList";
import { globalStyles } from "../../constants/styles";
import { useAtom } from "jotai";
import { manageExpenseOpenedAtom } from "../../state/atoms";

interface ExpensesOutputProps extends BaseProps {
  expensesPeriod: string;
  expenses?: Expenses;
}

export default function ExpensesOutput(props: ExpensesOutputProps) {
  const [manageExpenseOpened] = useAtom(manageExpenseOpenedAtom);

  const areExpensesShown = props.expenses.length;

  return (
    <View style={[styles.container, manageExpenseOpened && styles.backdrop]}>
      <ExpensesSummary
        expenses={props.expenses}
        periodName={props.expensesPeriod}
      />
      {areExpensesShown ? (
        <ExpensesList expenses={props.expenses} />
      ) : (
        <View style={styles.textContainer}>
          <Text style={styles.text}>No expense added yet.</Text>
        </View>
      )}
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
  textContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  text: {
    color: globalStyles.colors.primary50,
  },
});
