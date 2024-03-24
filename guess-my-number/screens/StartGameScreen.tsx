import { Alert, StyleSheet, TextInput, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { iShadow } from "../utils/style-helpers.utils";
import { useAtom } from "jotai";
import { numberToGuess } from "../global-states";

export default function StartGameScreen() {
  const [enteredNumStr, setEnteredNumStr] = useAtom(numberToGuess);

  function confirmEnteredNumber() {
    const enteredNum = +enteredNumStr;
    if (!enteredNum || enteredNum <= 0 || enteredNum > 99) {
      Alert.alert(
        "Number invalid or out of range.",
        "Number needs to be between 1 and 99.",
        [{ onPress: resetEnteredNumber, text: "Close", style: "destructive" }]
      );
    }
  }

  function resetEnteredNumber() {
    setEnteredNumStr("");
  }

  return (
    <View style={styles.inputContainer}>
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
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 16,
    marginTop: 100,
    marginHorizontal: 24,
    backgroundColor: "#3b021f",
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

  numberInput: {
    height: 50,
    fontSize: 32,
    color: "#ddb52f",
    borderBottomColor: "#ddb52f",
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
