import { FlatList, StyleSheet, View } from "react-native";
import Category from "../models/category";
import { MEALS } from "../data/dummy-data";
import MealItem from "../components/MealItem";

export default function MealsOverviewScreen(props: any) {
  const categoryData: Category = props.route.params.categoryData;
  const categoryId = categoryData.id;

  const matchingMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(categoryId)
  );

  // Title is set in the router itself
  // Alternatively, use the navigation prop inside a useLayoutEffect
  // and handle setting title in there through `navigation.setOptions({title: '...'})`

  return (
    <View style={styles.container}>
      <FlatList
        data={matchingMeals}
        renderItem={(mealData) => (
          <MealItem key={mealData.item.id} meal={mealData.item} />
        )}
        keyExtractor={(mealData) => mealData.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
