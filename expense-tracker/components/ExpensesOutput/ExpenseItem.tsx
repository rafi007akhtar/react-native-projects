import { ExpenseDetails } from "../../models/expenses.model";
import { Pressable, StyleSheet, View } from "react-native";
import ET from "./ET";
import { globalStyles } from "../../constants/styles";
import { iShadow } from "../../utils/styles.utl";
import { formatDate } from "../../utils/dates.util";

export default function ExpenseItem(props: ExpenseDetails) {
  const { description, amount, date } = props;

  return (
    <Pressable>
      <View style={styles.itemContainer}>
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
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 8,
    backgroundColor: globalStyles.colors.primary500,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    ...iShadow(globalStyles.colors.gray500, [1, 1], 0.4, 4),
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
