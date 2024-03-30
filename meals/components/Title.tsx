import { StyleSheet, Text } from "react-native";
import { TitleProps } from "../models/customTypes";

const headerFontSizes = {
  1: 36,
  2: 24,
  3: 20,
};

export default function Title(props: TitleProps) {
  const headerLevel = props.headerLevel || 3;
  const fontSize: number = { ...headerFontSizes }[headerLevel] as number;
  return <Text style={[styles.text, { fontSize }]}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "product-sans-bold",
    fontSize: 20,
    marginBottom: 8,
  },
});
