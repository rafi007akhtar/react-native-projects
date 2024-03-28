import { Platform, StyleSheet, Text } from "react-native";
import { colors } from "../utils/constants";

export default function Bold(props: any) {
  return (
    <Text
      style={props.highlightText ? styles.boldTextHighlighted : styles.boldText}
    >
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  boldTextHighlighted: {
    fontFamily: "open-sans-bold",
    color: Platform.select({
      android: colors.PRIMARY_500,
      ios: colors.PRIMARY_600,
    }),
  },
  boldText: {
    fontFamily: "open-sans-bold",
  },
});
