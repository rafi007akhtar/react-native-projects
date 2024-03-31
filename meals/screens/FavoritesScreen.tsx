import { useAtom } from "jotai";
import { favoriteMealsAtom } from "../data/globalState";
import { ScrollView, Text, View } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealItem from "../components/MealItem";
import Category from "../models/category";

export default function FavoritesScreen() {
  const [favoriteMealsIds] = useAtom(favoriteMealsAtom);

  const favoriteMeals = MEALS.filter((meal) =>
    favoriteMealsIds.includes(meal.id)
  );

  const favoriteMealsJSX = favoriteMeals.length ? (
    favoriteMeals.map((meal) => {
      const categoryId = meal.categoryIds[0];
      const categoryData: Category = {
        color: "#ccc",
        id: categoryId,
        title: "Meal Details",
      };
      return <MealItem meal={meal} categoryData={categoryData} key={meal.id} />;
    })
  ) : (
    <Text
      style={{
        fontFamily: "product-sans",
      }}
    >
      Your favorites will appear here.
    </Text>
  );

  return (
    <ScrollView
      style={{
        margin: 16,
      }}
    >
      {favoriteMealsJSX}
    </ScrollView>
  );
}
