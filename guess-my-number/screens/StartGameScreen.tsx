import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { iShadow } from "../utils/style-helpers.utils";
import { useAtom } from "jotai";
import { numberConfirmedFlag, numberToGuess } from "../global-states";
import { colors } from "../utils/constants";
import Title from "../components/Title";

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
    <View style={styles.screenContainer}>
      <Title>Guess my number</Title>
      <View style={styles.inputContainer}>
        <Text style={styles.textInstruction}>
          Enter a number for the app to guess.
        </Text>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 16,
    marginTop: 50,
    flex: 1,
    alignItems: "center",
  },

  inputContainer: {
    marginHorizontal: 24,
    marginTop: 40,
    padding: 16,
    backgroundColor: colors.PRIMARY_800,
    borderRadius: 8,
    alignItems: "center",

    // SHADOW TIME!
    // shadows in React Native are different than in CSS; there's no box-shadow property
    // instead, there are different solutions for Android and iOS

    // Android soln.
    elevation: 8,

    // custom iOS solution (built on top of existing iOS solution)
    ...iShadow("black", [0, 2], 0.25, 6),
  },

  textInstruction: {
    color: colors.ACCENT_500,
    fontSize: 18,
  },

  numberInput: {
    height: 50,
    fontSize: 32,
    color: colors.ACCENT_500,
    borderBottomColor: colors.ACCENT_500,
    borderBottomWidth: 2,
    marginVertical: 8,
    fontWeight: "bold",
    width: 50,
    textAlign: "center",
  },

  buttonsContainer: {
    flexDirection: "row",
    marginVertical: 16,
  },
});
