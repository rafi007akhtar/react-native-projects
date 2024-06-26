import { useAtom } from "jotai";
import {
  Alert,
  FlatList,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { gamePlayAtom } from "../global-states";
import Title from "../components/Title";
import { generateRandomBetween } from "../utils/common.utils";
import { useEffect, useState } from "react";
import NumberContainer from "../components/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";
import Ionicons from "@expo/vector-icons/Ionicons";
import GuessLogItem from "../components/GuessLogItem";

const initRange = [1, 100];

export default function GameScreen() {
  const [gamePlay, setGamePlay] = useAtom(gamePlayAtom);

  const [range, setRange] = useState(initRange);
  const [guessRounds, setGuessRounds] = useState<number[]>([]);

  const { height } = useWindowDimensions();
  const topMargin = height > 400 ? 50 : 10;

  /**
   * NOTE: do NOT use `range` values inside the function below as params
   * Reason: that variable gets re-evaluated every time state changes
   * So, every time, the initial guess call is done. But we need the call to happen only once, that is, when the component executes for the first time.
   * Calling it everytime with userNumber to exclude may result in trying to generate invalid range.
   * And that will crash the app.
   * Therefore, to avoid that, use hardcoded range vals that do not change over time.
   */
  const initalGuess = generateRandomBetween(
    initRange[0],
    initRange[1],
    +gamePlay.numberToGuess
  );
  const [currentGuess, setCurrentGuess] = useState(initalGuess);

  useEffect(() => {
    if (currentGuess === +gamePlay.numberToGuess) {
      setGamePlay((curr) => {
        return { ...curr, gameIsOver: true };
      });
    }
  }, [currentGuess]);

  function updateTheGuess(direction: "+" | "-") {
    setGamePlay((curr) => {
      return { ...curr, numberOfGuesses: curr.numberOfGuesses + 1 };
    });

    if (
      (direction === "-" && currentGuess < +gamePlay.numberToGuess) ||
      (direction === "+" && currentGuess > +gamePlay.numberToGuess)
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
      min = currentGuess + 1;
    }
    setRange([min, max]);

    const updatedGuess = generateRandomBetween(min, max, currentGuess);
    setCurrentGuess(updatedGuess);
    setGuessRounds((curr) => [updatedGuess, ...curr]);
  }

  return (
    <View style={[styles.container, { marginTop: topMargin }]}>
      <View style={styles.titleContainer}>
        <Title>Opponent's guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
      </View>

      <Card>
        <InstructionText style={styles.textInstruction}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <PrimaryButton onClick={() => updateTheGuess("-")}>
            <Ionicons name="remove" size={24} color="white" />
          </PrimaryButton>
          <PrimaryButton onClick={() => updateTheGuess("+")}>
            <Ionicons name="add" size={24} color="white" />
          </PrimaryButton>
        </View>
      </Card>

      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(dataItem) => (
            <GuessLogItem
              guessNumber={gamePlay.numberOfGuesses - dataItem.index}
              guessValue={dataItem.item}
            />
          )}
          keyExtractor={(item) => `${item}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
  titleContainer: {
    alignItems: "center",
  },
  textInstruction: {
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
