import { BaseProp } from "../models/baseTypes";
import { StyleSheet, Text } from "react-native";
import { colors } from "../utils/constants";

export default function Title(props: BaseProp) {
  return <Text style={styles.title}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: colors.ACCENT_500,
    borderWidth: 2,
    borderColor: colors.ACCENT_500,
    padding: 12,
  },
});
