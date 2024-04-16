import { View, Text, Pressable, StyleSheet } from "react-native";
import { BaseProps } from "../../models/base.model";
import { globalStyles } from "../../constants/styles";

interface ButtonProps extends BaseProps {
  onPress?: () => void;
  mode?: "flat" | "regular";
  style?: object;
}

export default function Button(props: ButtonProps) {
  return (
    <View style={props.style}>
      <Pressable
        onPress={props.onPress}
        style={(isPressed) => isPressed.pressed && styles.pressed}
      >
        <View style={[styles.button, props.mode === "flat" && styles.flat]}>
          <Text
            style={[
              styles.buttonText,
              props.mode === "flat" && styles.flatText,
            ]}
          >
            {props.children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: globalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: globalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 4,
    backgroundColor: globalStyles.colors.primary100,
  },
});
