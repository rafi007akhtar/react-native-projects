import { useAtom } from "jotai";
import { Alert, StyleSheet, Text, View } from "react-native";
import { numberToGuess } from "../global-states";
import Title from "../components/Title";
import { generateRandomBetween } from "../utils/common.utils";
import { useState } from "react";
import NumberContainer from "../components/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";

export default function GameScreen() {
  const [userNumber] = useAtom(numberToGuess);
  const [range, setRange] = useState([1, 100]);
  const [min, max] = range;

  const initalGuess = generateRandomBetween(min, max, +userNumber);
  const [currentGuess, setCurrentGuess] = useState(initalGuess);
  const [numberIsGuessed, setNumberIsGuessed] = useState(false);

  function updateTheGuess(direction: "+" | "-") {
    if (
      (direction === "-" && currentGuess < +userNumber) ||
      (direction === "+" && currentGuess > +userNumber)
    ) {
      Alert.alert("Incorrect Hint", "Please try that again.", [
        { text: "Okay", style: "cancel" },
      ]);
      return;
    }

    let [min, max] = range;
    if (direction === "-") {
      max = currentGuess;
    } else {
      min = currentGuess;
    }
    setRange([min, max]);

    const updatedGuess = generateRandomBetween(min, max, currentGuess);
    setCurrentGuess(updatedGuess);

    if (updatedGuess === +userNumber) {
      setNumberIsGuessed(true);
    }
  }

  return (
    <View style={styles.container}>
      <Title>Opponent's guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>

      <View>
        <Text>Higher or lower?</Text>
        {!numberIsGuessed && (
          <View style={styles.buttonsContainer}>
            <PrimaryButton onClick={() => updateTheGuess("-")}>
              LOWER
            </PrimaryButton>
            <PrimaryButton onClick={() => updateTheGuess("+")}>
              HIGHER
            </PrimaryButton>
          </View>
        )}
      </View>

      {numberIsGuessed && <Text>You guessed the number</Text>}

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
  buttonsContainer: {
    flexDirection: "row",
  },
});
