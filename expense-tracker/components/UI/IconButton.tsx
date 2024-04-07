import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface IconButtonProps {
  name?: string | any;
  size?: number;
  color?: string;
  onPress?: () => void;
}

export default function IconButton(props: IconButtonProps) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={props.onPress}
        style={(isPressed) => isPressed.pressed && styles.pressed}
        android_ripple={{ color: "#ccc" }}
      >
        <MaterialIcons
          name={props.name}
          size={props.size}
          color={props.color}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: "hidden",
    margin: 14,
    borderRadius: 50,
  },
  pressed: {
    opacity: 0.75,
  },
});
