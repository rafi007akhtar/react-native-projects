import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { iShadow } from "../utils/style-helpers.utils";
import { useAtom } from "jotai";
import { numberConfirmedFlag, numberToGuess } from "../global-states";
import { colors } from "../utils/constants";
import Title from "../components/Title";
import InstructionText from "../components/InstructionText";
import Card from "../components/Card";

export default function StartGameScreen() {
  const [enteredNumStr, setEnteredNumStr] = useAtom(numberToGuess);
  const [_, setNumberConfirmedFlag] = useAtom(numberConfirmedFlag);

  function confirmEnteredNumber() {
    const enteredNum = +enteredNumStr;
    if (!enteredNum || enteredNum <= 0 || enteredNum > 99) {
      Alert.alert(
        "Number invalid or out of range.",
        "Number needs to be between 1 and 99.",
        [{ onPress: resetEnteredNumber, text: "Close", style: "destructive" }]
      );
    } else {
      setNumberConfirmedFlag(true);
    }
  }

  function resetEnteredNumber() {
    setEnteredNumStr("");
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
          value={enteredNumStr}
          onChangeText={(changedNum) => {
            setEnteredNumStr(changedNum);
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
