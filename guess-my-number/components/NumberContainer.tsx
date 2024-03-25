import { StyleSheet, Text, View } from "react-native";
import { BaseProp } from "../models/baseTypes";
import { colors } from "../utils/constants";

export default function NumberContainer(props: BaseProp) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{props.children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: colors.ACCENT_500,
    padding: 24,
    margin: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: colors.ACCENT_500,
    fontSize: 36,
    fontWeight: "bold",
  },
});
