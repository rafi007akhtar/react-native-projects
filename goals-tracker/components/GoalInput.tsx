import { View, TextInput, Button, StyleSheet } from "react-native";
import { useAtom } from "jotai";
import { useState } from "react";
import { goals } from "../global-states";

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex", // by default it's already flex
    flexDirection: "row", // NOTE: the default flex-direction in React Native is "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    borderRadius: 4,
    padding: 8,
  },
});

export default function GoalInput() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [_allGoals, setAllGoals] = useAtom(goals);

  function goalInputHandler(enteredText: string) {
    setEnteredGoal(enteredText);
  }

  function addGoalHandler() {
    if (!enteredGoal || !enteredGoal.length) {
      return;
    }

    setAllGoals((prev) =>
      prev.concat({
        id: Math.random().toString(),
        text: enteredGoal,
      })
    );
    setEnteredGoal("");
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Your course goal."
        onChangeText={goalInputHandler}
        value={enteredGoal}
      />
      <Button title="Add Goal" onPress={addGoalHandler}></Button>
    </View>
  );
}
