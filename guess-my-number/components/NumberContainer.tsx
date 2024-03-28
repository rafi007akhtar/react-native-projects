import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { BaseProp } from "../models/baseTypes";
import { colors } from "../utils/constants";

const window = Dimensions.get("window"); // does not take status bar into account
const screen = Dimensions.get("screen"); // takes status bar into account on Android

const { width, height, fontScale, scale } = window;
console.log({ window, screen });

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
    padding: width < 450 ? 12 : 24,
    margin: width < 450 ? 12 : 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: colors.ACCENT_500,
    fontSize: width < 450 ? 24 : 36,
    fontWeight: "bold",
  },
});
