import { Expense } from "../../models/expenses.model";
import { Pressable, StyleSheet, View } from "react-native";
import ET from "./ET";
import { globalStyles } from "../../constants/styles";
import { iShadow } from "../../utils/styles.utl";
import { formatDate } from "../../utils/dates.util";
import { useNavigation } from "@react-navigation/native";

export default function ExpenseItem(props: Expense) {
  const navigation = useNavigation<any>();
  const { description, amount, date, id } = props;

  function pressHandler() {
    navigation.navigate("ManageExpense", { id });
  }

  return (
    <View style={styles.itemContainer}>
      <Pressable
        android_ripple={{ color: "#78b8cec7" }}
        style={(isPressed) => [
          styles.pressable,
          isPressed.pressed && styles.pressed,
        ]}
        onPress={pressHandler}
      >
        <View>
          <ET style={[styles.commonText, styles.description]} isBold={true}>
            {description}
          </ET>
          <ET style={[styles.commonText]}>{formatDate(date)}</ET>
        </View>
        <View style={styles.amountContainer}>
          <ET style={[styles.commonText, styles.amountText]} isBold={true}>
            ₹ {amount.toFixed(2)}
          </ET>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    overflow: "hidden",
    marginVertical: 8,
    backgroundColor: globalStyles.colors.primary500,
    borderRadius: 6,
    elevation: 3,
    ...iShadow(globalStyles.colors.gray500, [1, 1], 0.4, 4),
    flex: 1,
  },
  pressable: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 12,
  },
  pressed: {
    opacity: 0.9,
  },
  commonText: {
    color: globalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amountText: {
    color: globalStyles.colors.primary500,
  },
});
