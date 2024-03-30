import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Meal from "../models/meal";
import { iShadow } from "../utils/styles.utl";

type MealItemProps = { meal: Meal };

export default function MealItem(props: MealItemProps) {
  const meal = props.meal;

  return (
    <View style={styles.container}>
      <Pressable
        style={(pressedData) => [
          pressedData.pressed
            ? [styles.buttonPressed, { backgroundColor: "#ccc" }]
            : null,
        ]}
      >
        <View>
          <Image source={{ uri: meal.imageUrl }} style={styles.image} />
          <Text style={styles.title}>{meal.title}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailsText}>{meal.duration} min</Text>
          <Text style={styles.detailsText}>
            {meal.complexity.toUpperCase()}
          </Text>
          <Text style={styles.detailsText}>
            {meal.affordability.toUpperCase()}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "white",
    elevation: 4,
    ...iShadow("black", [0, 2], 0.25, 8),
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
  buttonPressed: {
    opacity: 0.9,
  },
});
