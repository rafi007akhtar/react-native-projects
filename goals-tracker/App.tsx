import { Button, View } from "react-native";
import styles from "./App.styles";
// import GoalsScroll from "./components/GoalsScroll";
import GoalsList from "./components/GoalsList";
import GoalInput from "./components/GoalInput";
import { useAtom } from "jotai";
import { showNewGoalsModal } from "./global-states";

export default function App() {
  const [showModal, setShowModal] = useAtom(showNewGoalsModal);

  return (
    <View style={styles.appContainer}>
      <Button
        title="Add new goal"
        onPress={() => setShowModal(true)}
        color="#438a49"
      />

      {showModal && <GoalInput />}

      <View style={styles.goalsContainer}>
        {/* Uncomment for scroll view. Commenting out because FlatList is better as it renders items lazily. */}
        {/* <GoalsScroll /> */}

        <GoalsList />
      </View>
    </View>
  );
}
