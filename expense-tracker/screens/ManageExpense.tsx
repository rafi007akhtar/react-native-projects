import { useAtom } from "jotai";
import { StyleSheet, View } from "react-native";
import { manageExpenseOpenedAtom } from "../state/atoms";
import { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import IconButton from "../components/UI/IconButton";
import { globalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import useStore from "../state/stores";

export default function ManageExpense() {
  const [_manageExpenseOpened, setManageExpenseOpened] = useAtom(
    manageExpenseOpenedAtom
  );
  const [expenseDeleter, expenseUpdator, expenseAdder] = useStore((state) => [
    state.deleteExpense,
    state.updateExpense,
    state.addExpense,
  ]);

  const route = useRoute();
  const navigation = useNavigation();

  let id = (route.params as any)?.id;
  const isEditing = !!id;

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

  function confirmHandler() {
    if (isEditing) {
      expenseUpdator(id, {
        amount: 10,
        date: new Date(),
        description: "Edit Test",
      });
    } else {
      expenseAdder({ amount: 10, date: new Date(), description: "Add Test" });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
