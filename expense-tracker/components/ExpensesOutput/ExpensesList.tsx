import { FlatList } from "react-native-gesture-handler";
import { Expenses } from "../../models/expenses.model";
import { BaseProps } from "../../models/base.model";
import { StyleSheet, Text, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

interface ExpensesListProps extends BaseProps {
  expenses: Expenses;
}

export default function ExpensesList(props: ExpensesListProps) {
  return (
    <FlatList
      data={props.expenses}
      renderItem={(dataItem) => (
        <View>
          <ExpenseItem {...dataItem.item} />
        </View>
      )}
      keyExtractor={(dataItem) => dataItem.id}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
});
