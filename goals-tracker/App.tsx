import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textStyles}>Hello, world.</Text>
      </View>
      <Text style={styles.textStyles}>Count: {count}</Text>

      <Button
        title="Increment Count"
        onPress={() => setCount((prev) => prev + 1)}
      ></Button>
      <Button
        title="Decrement Count"
        onPress={() => setCount((prev) => prev - 1)}
        color="#563b6f"
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyles: {
    borderWidth: 1,
    padding: 8,
    borderColor: "#563b6f",
    margin: 16,
  },
});
