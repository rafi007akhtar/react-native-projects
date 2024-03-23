import { Button, TextInput, View } from "react-native";
import styles from "./App.styles";
import { useState } from "react";
import { useAtom } from "jotai";
import { goals } from "./global-states";
import GoalsScroll from "./components/GoalsScroll";
import GoalsList from "./components/GoalsList";

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
        {/* Uncomment for scroll view. Commenting out because FlatList is better as it renders items lazily. */}
        {/* <GoalsScroll /> */}

        <GoalsList />
      </View>
    </View>
  );
}
