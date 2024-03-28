import { useSmallScreen } from "../hooks/useSmallScreen";
import { BaseProp } from "../models/baseTypes";
import { StyleSheet, Text } from "react-native";

export default function Title(props: BaseProp) {
  const { smallDevice } = useSmallScreen();
  const marginTop = smallDevice ? 30 : 8;
  const fontSize = smallDevice ? 16 : 24;
  const padding = smallDevice ? 8 : 12;
  return (
    <Text style={[styles.title, { marginTop, fontSize, padding }]}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: "open-sans-bold",
    textAlign: "center",
    color: "white",
    borderWidth: 2,
    borderColor: "white",
    padding: 8,
    maxWidth: "80%",
    width: 300,
    marginTop: 8,
  },
});
