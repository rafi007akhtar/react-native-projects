import { Button, Text, View } from "react-native";
import styles from "./App.styles";
// import GoalsScroll from "./components/GoalsScroll";
import GoalsList from "./components/GoalsList";
import GoalInput from "./components/GoalInput";
import { useAtom } from "jotai";
import { goals, showNewGoalsModal } from "./global-states";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [showModal, setShowModal] = useAtom(showNewGoalsModal);
  const [allGoals] = useAtom(goals);

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.goalsContainer}>
        {/* Uncomment for scroll view. Commenting out because FlatList is better as it renders items lazily. */}
        {/* <GoalsScroll /> */}

        {!allGoals.length && (
          <View style={styles.textContainer}>
            <Text style={styles.text}>No goals added yet.</Text>
          </View>
        )}

        <GoalsList />
      </View>

      {showModal && <GoalInput />}

      <View style={styles.appContainer}>
        <Button
          title="Add new goal"
          onPress={() => setShowModal(true)}
          color="#2e1f3c"
        />
      </View>
    </>
  );
}
