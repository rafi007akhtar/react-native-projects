import { useAtom } from "jotai";
import { StyleSheet, Text, View } from "react-native";
import { manageExpenseOpenedAtom } from "../state/atoms";
import { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ManageExpense() {
  const [_manageExpenseOpened, setManageExpenseOpened] = useAtom(
    manageExpenseOpenedAtom
  );
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

  return (
    <View style={styles.container}>
      <Text>Manage Expense</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
