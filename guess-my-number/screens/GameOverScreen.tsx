import { useAtom } from "jotai";
import { Text, StyleSheet, View } from "react-native";
import { numberToGuess } from "../global-states";

export default function GameOverScreen() {
  const [enteredNum] = useAtom(numberToGuess);

  return (
    <View style={styles.container}>
      <Text>You guessed the number! It was {enteredNum}.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
});
