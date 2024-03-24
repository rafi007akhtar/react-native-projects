import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { useAtom } from "jotai";
import { useState } from "react";
import { goals, showNewGoalsModal } from "../global-states";

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex", // by default it's already flex
    // flexDirection: "row", // NOTE: the default flex-direction in React Native is "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#311b6b",
    height: "50%",
    marginTop: "auto",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    width: "100%",
    borderRadius: 6,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 24,
  },
  button: {
    width: "30%",
    marginHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },

  modal: {
    justifyContent: "flex-start",
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
  }

  return (
    <Modal
      visible={showModal}
      animationType="slide"
      style={styles.modal}
      transparent={true}
    >
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/images/goal.png")}
          style={styles.image}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your goal."
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Add Goal"
              onPress={addGoalHandler}
              color="#5e0acc"
            ></Button>
          </View>
          <View style={styles.button}>
            <Button
              title={enteredGoal ? "Cancel" : "Done"}
              onPress={() => setShowModal(false)}
              color={enteredGoal ? "#f31282" : "#20554a"}
            ></Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
