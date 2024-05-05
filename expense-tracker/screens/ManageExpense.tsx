import { useAtom } from "jotai";
import { StyleSheet, View } from "react-native";
import { manageExpenseOpenedAtom } from "../state/atoms";
import { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import IconButton from "../components/UI/IconButton";
import { globalStyles } from "../constants/styles";
import useStore from "../state/stores";
import ExpenseForm from "../components/ExpenseForm/ExpenseForm";
import { ExpenseDetails } from "../models/expenses.model";
import httpUtils from "../utils/http.utils";

export default function ManageExpense() {
  const [_manageExpenseOpened, setManageExpenseOpened] = useAtom(
    manageExpenseOpenedAtom
  );
  const [expenseDeleter, expenseUpdator, expenseAdder, allExpenses] = useStore(
    (state) => [
      state.deleteExpense,
      state.updateExpense,
      state.addExpense,
      state.expenses,
    ]
  );

  const route = useRoute();
  const navigation = useNavigation();

  let id = (route.params as any)?.id;
  const isEditing = !!id;

  const currentExpense = allExpenses.find((expense) => expense.id === id);

  setManageExpenseOpened(true);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  useEffect(() => {
    return () => {
      setManageExpenseOpened(false);
    };
  }, []);

  function deleteExpenseHandler() {
    expenseDeleter(id);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData: ExpenseDetails) {
    if (isEditing) {
      expenseUpdator(id, expenseData);
    } else {
      httpUtils.addExpense(expenseData);
      expenseAdder(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={currentExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="delete-sweep"
            size={36}
            color={globalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.colors.primary800,
    padding: 6,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginTop: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: globalStyles.colors.primary200,
    alignItems: "center",
  },
});
