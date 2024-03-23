import { Button, Text, TextInput, View, ScrollView } from "react-native";
import styles from "./App.styles";
import { useState } from "react";
import { useAtom } from "jotai";
import { goals } from "./global-states";

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [allGoals, setAllGoals] = useAtom(goals);

  function goalInputHandler(enteredText: string) {
    setEnteredGoal(enteredText);
  }

  function addGoalHandler() {
    setAllGoals((prev) => prev.concat(enteredGoal));
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
        <ScrollView persistentScrollbar={true}>
          <Text>List of goals:</Text>

          {allGoals.map((goal, ind) => (
            <View key={ind} style={styles.goalItemView}>
              <Text style={styles.goalItemText}>{goal}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
