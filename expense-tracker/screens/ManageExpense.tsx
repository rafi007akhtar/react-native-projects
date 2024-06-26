import { useAtom } from "jotai";
import { StyleSheet, View } from "react-native";
import { manageExpenseOpenedAtom } from "../state/atoms";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import IconButton from "../components/UI/IconButton";
import { globalStyles } from "../constants/styles";
import useStore from "../state/stores";
import ExpenseForm from "../components/ExpenseForm/ExpenseForm";
import { ExpenseDetails } from "../models/expenses.model";
import httpUtils from "../utils/http.utils";
import ErrorText from "../components/UI/ErrorText";
import Spinner from "../components/UI/Spinner";

export default function ManageExpense() {
  const [_manageExpenseOpened, setManageExpenseOpened] = useAtom(
    manageExpenseOpenedAtom
  );
  const [waitingState, setWaitingState] = useState(false);
  const [expenseDeleter, expenseUpdator, expenseAdder, allExpenses] = useStore(
    (state) => [
      state.deleteExpense,
      state.updateExpense,
      state.addExpense,
      state.expenses,
    ]
  );
  const [error, setError] = useState<string>("");

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

  async function deleteExpenseHandler() {
    expenseDeleter(id);
    setWaitingState(true);
    const [err] = await httpUtils.deleteExpense(id);
    setWaitingState(false);
    if (err) {
      setError("Unable to delete expense now. Please try again later");
      return;
    }
    setError("");
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData: ExpenseDetails) {
    if (isEditing) {
      expenseUpdator(id, expenseData);
      setWaitingState(true);
      const [err] = await httpUtils.updateExpense(id, expenseData);
      setWaitingState(false);
      if (err) {
        setError("Unable to edit expense now. Please try again later");
        return;
      }
      setError("");
    } else {
      setWaitingState(true);
      const [id, err] = await httpUtils.addExpense(expenseData);
      setWaitingState(false);
      if (err) {
        setError("Unable to add expense now. Please try again later");
        return;
      }
      setError("");
      expenseAdder({ ...expenseData, id });
    }
    if (!error) {
      navigation.goBack();
    }
  }

  const errorElem = error && (
    <View style={styles.error}>
      <ErrorText errMsg={error} />
    </View>
  );

  const formAndBtn = (
    <View>
      <ExpenseForm
        isEditing={isEditing}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={currentExpense}
      />
      {errorElem}
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

  return (
    <View style={styles.container}>
      {waitingState ? <Spinner /> : formAndBtn}
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
  error: {
    width: "100%",
    height: 100,
    marginTop: 36,
  },
});
