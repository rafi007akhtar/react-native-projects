import { FlatList } from "react-native-gesture-handler";
import { Expenses } from "../../models/expenses.model";
import { BaseProps } from "../../models/base.model";
import { Text, View } from "react-native";

interface ExpensesListProps extends BaseProps {
  expenses: Expenses;
}

export default function ExpensesList(props: ExpensesListProps) {
  return (
    <FlatList
      data={props.expenses}
      renderItem={(dataItem) => (
        <View>
          <Text>
            {dataItem.item.description} on {dataItem.item.date.toDateString()}
          </Text>
        </View>
      )}
      keyExtractor={(dataItem) => dataItem.id}
    />
  );
}
