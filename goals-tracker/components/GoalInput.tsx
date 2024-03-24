import { View, TextInput, Button, StyleSheet, Modal } from "react-native";
import { useAtom } from "jotai";
import { useState } from "react";
import { goals, showNewGoalsModal } from "../global-states";

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex", // by default it's already flex
    // flexDirection: "row", // NOTE: the default flex-direction in React Native is "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    flex: 1,
    paddingHorizontal: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "100%",
    borderRadius: 4,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 24,
  },
  button: {
    width: "30%",
    marginHorizontal: 8,
  },
});

export default function GoalInput() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [_allGoals, setAllGoals] = useAtom(goals);
  const [showModal, setShowModal] = useAtom(showNewGoalsModal);

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

    setShowModal(false);
  }

  return (
    <Modal visible={showModal} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal."
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler}></Button>
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={() => setShowModal(false)}></Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
