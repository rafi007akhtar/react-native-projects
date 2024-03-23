import { View, Text, StyleSheet, Pressable } from "react-native";
import { Goal } from "../models/goals.model";
import { useAtom } from "jotai";
import { goals } from "../global-states";

type GoalProp = {
  goal: Goal;
};

const goalStyles = StyleSheet.create({
  goalItemView: {
    // <Text> elems do NOT support borderRadius on iOS, so that, along with the rest, will be applied to a container <View> for the sake of iPhones
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },

  goalItemText: {
    // NOTE: (important) styles do NOT cascade in React Native
    // meaning, if we have two elems, say <A> and <B>, and <B> is a child elem of <A>, then styles applied to <A> will not also be applied to <B>
    // here <Text> is a child element of <View>, but putting the color attribute to <View> style will not apply it to <Text>
    // therefore, to see the white color, it needs to be applied in the child <Text> elem
    color: "#ffffff",
  },
});

export default function GoalItem(prop: GoalProp) {
  const [_allGoals, setAllGoals] = useAtom(goals);

  function deleteGoal(goalId: string) {
    setAllGoals((prev) => prev.filter((goal) => goal.id !== goalId));
  }

  return (
    <Pressable onPress={() => deleteGoal(prop.goal.id)}>
      <View style={goalStyles.goalItemView}>
        <Text style={goalStyles.goalItemText}>{prop.goal.text}</Text>
      </View>
    </Pressable>
  );
}
