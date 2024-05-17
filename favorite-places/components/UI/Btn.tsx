import { Pressable, StyleSheet, Text } from "react-native";
import { BtnProps } from "../../models/props.model";
import { COLORS } from "../../constants/colors";

export default function Btn(props: BtnProps) {
  return (
    <Pressable
      onPress={props.onPress}
      style={(state) => [styles.button, state.pressed && styles.pressed]}
    >
      <Text style={styles.text}>{props.children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    marginTop: 48,
    backgroundColor: COLORS.primary800,
    borderRadius: 4,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: COLORS.primary50,
    fontFamily: "product-sans-bold",
    fontSize: 16,
    textAlign: "center",
  },
});
