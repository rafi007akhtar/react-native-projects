import { StyleSheet, Text, View } from "react-native";
import { BaseProp } from "../models/baseTypes";
import { colors } from "../utils/constants";
import { iShadow } from "../utils/style-helpers.utils";

interface LogItem extends BaseProp {
  guessNumber: number;
  guessValue: number;
}

export default function GuessLogItem(props: LogItem) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{props.guessNumber}</Text>
      <Text style={styles.itemText}>Opponent's Guess: {props.guessValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    borderColor: colors.PRIMARY_800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: colors.ACCENT_500,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    elevation: 4,
    ...iShadow("black", [0, 0], 0.25, 3),
  },
  itemText: {
    fontFamily: "open-sans",
  },
});
