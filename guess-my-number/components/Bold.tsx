import { StyleSheet, Text } from "react-native";
import { BaseProp } from "../models/baseTypes";
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
    color: colors.PRIMARY_500,
  },
  boldText: {
    fontFamily: "open-sans-bold",
  },
});
