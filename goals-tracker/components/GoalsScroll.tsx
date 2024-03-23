import { ScrollView, View, Text } from "react-native";
import styles from "../App.styles";
import { useAtom } from "jotai";
import { goals } from "../global-states";

export default function GoalsScroll() {
  const [allGoals] = useAtom(goals);

  return (
    <ScrollView persistentScrollbar={true}>
      <Text>List of goals:</Text>

      {allGoals.map((goal) => (
        <View key={goal.id} style={styles.goalItemView}>
          <Text style={styles.goalItemText}>{goal.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
