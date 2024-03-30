import { Button, ScrollView, StyleSheet, View } from "react-native";
import { MealDetailsProps } from "../models/customTypes";
import Meal from "../models/meal";
import { useLayoutEffect } from "react";
import Category from "../models/category";
import MealPreview from "../components/MealPreview";
import Title from "../components/Title";
import { List } from "../components/List";
import Favorite from "../components/Favorite";

export default function MealDetailsScreen(props: MealDetailsProps) {
  const params = props.route.params as any;
  const meal: Meal = params?.meal;
  const categoryData: Category = params?.categoryData;

  const navigation = props.navigation;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Meal Details",
      headerStyle: {
        backgroundColor: categoryData.color,
      },
      headerTintColor: "black",
      headerRight: () => <Favorite mealId={meal.id} />,
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <MealPreview meal={meal} hideTitle={true} />

      <View style={styles.infoContainer}>
        <Title headerLevel={2}>{meal.title}</Title>
        <Title>Ingredeints</Title>
        {/* {IngredeintsJSX} */}
        <List data={meal.ingredients} type="unordered" />
      </View>

      <View style={styles.infoContainer}>
        <Title>Steps</Title>
        <List data={meal.steps} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  infoContainer: {
    padding: 16,
  },
  ingredeintItem: {
    fontFamily: "product-sans",
    paddingLeft: 16,
  },
  ingredient: {
    fontSize: 16,
  },
});
