import { BaseProp } from "../models/baseTypes";
import { StyleSheet, Text } from "react-native";

export default function Title(props: BaseProp) {
  return <Text style={styles.title}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    borderWidth: 2,
    borderColor: "white",
    padding: 12,
  },
});
