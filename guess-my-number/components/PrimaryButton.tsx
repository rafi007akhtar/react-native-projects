import { Pressable, StyleSheet, Text, View } from "react-native";
import { BaseProp } from "../models/baseTypes";

const PrimaryButton: React.FC<BaseProp> = function (props) {
  return (
    <View style={styles.outerContainer}>
      <Pressable
        style={(pressedData) =>
          pressedData.pressed
            ? [styles.innerContainer, styles.buttonActive]
            : styles.innerContainer
        }
        android_ripple={{ color: "#640233" }}
      >
        <Text style={styles.buttonText}>{props.children}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  innerContainer: {
    borderRadius: 28,
    backgroundColor: "#72063c",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  buttonActive: {
    opacity: 0.75,
  },
});