import { View } from "react-native";
import styles from "./App.styles";
// import GoalsScroll from "./components/GoalsScroll";
import GoalsList from "./components/GoalsList";
import GoalInput from "./components/GoalInput";

export default function App() {
  return (
    <View style={styles.appContainer}>
      <GoalInput />

      <View style={styles.goalsContainer}>
        {/* Uncomment for scroll view. Commenting out because FlatList is better as it renders items lazily. */}
        {/* <GoalsScroll /> */}

        <GoalsList />
      </View>
    </View>
  );
}
