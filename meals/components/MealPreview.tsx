import { View, Image, Text, StyleSheet } from "react-native";
import Meal from "../models/meal";

export default function MealPreview(props: any) {
  const meal: Meal = props.meal;
  const hideTitle = !!props.hideTitle;
  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: meal.imageUrl }} style={styles.image} />
        {!hideTitle && <Text style={styles.title}>{meal.title}</Text>}
      </View>
      <View style={styles.details}>
        <Text style={styles.detailsText}>{meal.duration} min</Text>
        <Text style={styles.detailsText}>{meal.complexity.toUpperCase()}</Text>
        <Text style={styles.detailsText}>
          {meal.affordability.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dfdddd",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontFamily: "product-sans-bold",
    fontSize: 18,
    textAlign: "center",
    margin: 8,
  },
  details: {
    flexDirection: "row",
    margin: 8,
    justifyContent: "space-around",
  },
  detailsText: {
    fontFamily: "product-sans",
    letterSpacing: 0.5,
  },
});
