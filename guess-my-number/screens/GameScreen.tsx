import { useAtom } from "jotai";
import { StyleSheet, Text, View } from "react-native";
import { numberToGuess } from "../global-states";
import Title from "../components/Title";
import { generateRandomBetween } from "../utils/common.utils";
import { useState } from "react";
import NumberContainer from "../components/NumberContainer";

export default function GameScreen() {
  const [enteredNum] = useAtom(numberToGuess);

  const initalGuess = generateRandomBetween(1, 100, +enteredNum);
  const [currentGuess, setCurrentGuess] = useState(initalGuess);

  return (
    <View style={styles.container}>
      <Title>Opponent's guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>

      <View>
        <Text>Higher or lower?</Text>
        {/* TODO: buttons for + or - */}
      </View>

      {/* TODO: view for log rounds */}
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
