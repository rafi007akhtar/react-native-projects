import { ScrollView, Text } from "react-native";
import { useAtom } from "jotai";
import { goals } from "../global-states";
import GoalItem from "./GoalItem";

/* ScrollView needs bounded height.
So wrap it inside a View ideally with some flex property to it. */

export default function GoalsScroll() {
  const [allGoals] = useAtom(goals);

  return (
    <ScrollView persistentScrollbar={true}>
      <Text>List of goals:</Text>

      {allGoals.map((goal) => (
        <GoalItem goal={goal} key={goal.id} />
      ))}
    </ScrollView>
  );
}
