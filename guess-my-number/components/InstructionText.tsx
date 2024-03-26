import { StyleSheet, Text } from "react-native";
import { StylesProp } from "../models/baseTypes";
import { colors } from "../utils/constants";

export default function InstructionText(props: StylesProp) {
  return (
    <Text style={[styles.textInstruction, props.style]}>{props.children}</Text>
  );
}

const styles = StyleSheet.create({
  textInstruction: {
    color: colors.ACCENT_500,
    fontSize: 17,
    fontFamily: "open-sans",
  },
});
