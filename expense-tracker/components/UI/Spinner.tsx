import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";

const screen = Dimensions.get("screen");

export default function Spinner() {
  return (
    <View>
      <ActivityIndicator size="large" style={styles.container} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: screen.height,
    opacity: 0.5,
  },
});
