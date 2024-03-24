import { StyleSheet, TextInput, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { iShadow } from "../utils/style-helpers.utils";

export default function StartGameScreen() {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
      />
      <View style={styles.buttonsContainer}>
        <PrimaryButton>Reset</PrimaryButton>
        <PrimaryButton>Confirm</PrimaryButton>
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
