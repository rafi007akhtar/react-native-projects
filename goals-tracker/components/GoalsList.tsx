import { View, Text, FlatList } from "react-native";
import styles from "../App.styles";
import { useAtom } from "jotai";
import { goals } from "../global-states";

export default function GoalsList() {
  const [allGoals] = useAtom(goals);

  return (
    <FlatList
      // put elements with data items here
      data={allGoals}
      // specify what the attribute containing the unique key in each item
      keyExtractor={(goalItem) => goalItem.id}
      // specify how each data item will be rendered on the list
      renderItem={(dataItem) => (
        <View style={styles.goalItemView}>
          <Text style={styles.goalItemText}>{dataItem.item.text}</Text>
        </View>
      )}
    />
  );
}
