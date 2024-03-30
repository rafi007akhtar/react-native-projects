import { Platform, Pressable, StyleSheet, View } from "react-native";
import { iShadow } from "../utils/styles.utl";
import { MealItemProps } from "../models/customTypes";
import { useNavigation } from "@react-navigation/native";
import MealPreview from "./MealPreview";

export default function MealItem(props: MealItemProps) {
  const navigation = useNavigation<any>();

  const { meal, categoryData } = props;

  function mealPressHandler() {
    navigation.navigate("MealDetails", { meal, categoryData });
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={mealPressHandler}
        style={(pressedData) => [
          pressedData.pressed
            ? [styles.buttonPressed, { backgroundColor: "#ccc" }]
            : null,
        ]}
      >
        <MealPreview meal={meal} />
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
    backgroundColor: "#dfdddd",
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
