import { Alert, StyleSheet, TextInput, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useAtom } from "jotai";
import { gamePlayAtom } from "../global-states";
import { colors } from "../utils/constants";
import Title from "../components/Title";
import InstructionText from "../components/InstructionText";
import Card from "../components/Card";

export default function StartGameScreen() {
  const [gamePlay, setGamePlay] = useAtom(gamePlayAtom);

  function confirmEnteredNumber() {
    const enteredNum = +gamePlay.numberToGuess;
    if (!enteredNum || enteredNum <= 0 || enteredNum > 99) {
      Alert.alert(
        "Number invalid or out of range.",
        "Number needs to be between 1 and 99.",
        [{ onPress: resetEnteredNumber, text: "Close", style: "destructive" }]
      );
    } else {
      setGamePlay((curr) => {
        return { ...curr, numberConfirmedFlag: true };
      });
    }
  }

  function resetEnteredNumber() {
    setGamePlay((curr) => {
      return { ...curr, numberToGuess: "" };
    });
  }

  return (
    <View style={styles.inputContainer}>
      <Title>Guess my number</Title>
      <Card>
        <InstructionText>Enter a number for the app to guess.</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          value={gamePlay.numberToGuess}
          onChangeText={(changedNum) => {
            setGamePlay((curr) => {
              return { ...curr, numberToGuess: changedNum };
            });
          }}
        />
        <View style={styles.buttonsContainer}>
          <PrimaryButton onClick={resetEnteredNumber}>Reset</PrimaryButton>
          <PrimaryButton onClick={confirmEnteredNumber}>Confirm</PrimaryButton>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 16,
    marginTop: 50,
    flex: 1,
    alignItems: "center",
  },

  numberInput: {
    height: 50,
    fontSize: 32,
    fontFamily: "open-sans-bold",
    color: colors.ACCENT_500,
    borderBottomColor: colors.ACCENT_500,
    borderBottomWidth: 2,
    marginVertical: 8,
    width: 50,
    textAlign: "center",
  },

  buttonsContainer: {
    flexDirection: "row",
    marginVertical: 16,
  },
});
