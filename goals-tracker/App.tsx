import { Button, Text, TextInput, View, ScrollView } from "react-native";
import styles from "./App.styles";
import { useState } from "react";
import { useAtom } from "jotai";
import { goals } from "./global-states";
import GoalsScroll from "./components/GoalsScroll";

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [_allGoals, setAllGoals] = useAtom(goals);

  function goalInputHandler(enteredText: string) {
    setEnteredGoal(enteredText);
  }

  function addGoalHandler() {
    setAllGoals((prev) =>
      prev.concat({
        id: Math.random().toString(),
        text: enteredGoal,
      })
    );
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal."
          onChangeText={goalInputHandler}
        />
        <Button title="Add Goal" onPress={addGoalHandler}></Button>
      </View>

      <View style={styles.goalsContainer}>
        {/* ScrollView needs bounded height.
        So wrap it inside a View ideally with some flex property to it. */}
        <GoalsScroll />
      </View>
    </View>
  );
}
