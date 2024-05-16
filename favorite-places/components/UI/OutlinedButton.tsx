import { Pressable, StyleSheet, Text } from "react-native";
import { OutlinedButtonProps } from "../../models/props.model";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

export default function OutlinedButton(props: OutlinedButtonProps) {
  return (
    <Pressable
      onPress={props.onPress}
      style={(state) => [styles.button, state.pressed && styles.pressed]}
    >
      <Ionicons
        name={props.icon}
        size={18}
        color={COLORS.primary500}
        style={styles.icon}
      />
      <Text style={styles.text}>{props.children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.primary500,
    borderRadius: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: COLORS.primary500,
    fontFamily: "product-sans-bold",
  },
});
