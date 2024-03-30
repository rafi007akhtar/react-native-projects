import { StyleSheet, Text } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import Category from "./models/category";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "product-sans": require("./assets/fonts/Product-Sans-Regular.ttf"),
    "product-sans-bold": require("./assets/fonts/Product-Sans-Bold.ttf"),
  });

  let screen = <Text>Loading...</Text>;

  if (fontsLoaded) {
    screen = (
      <>
        <StatusBar style="inverted" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#351401" },
              contentStyle: {
                backgroundColor: "#6d343370",
              },
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: "product-sans",
              },
            }}
          >
            <Stack.Screen
              name="MealsCategories"
              component={CategoriesScreen}
              options={{
                title: "All Cateogries",
                headerTintColor: "white",
              }}
            />
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
              options={(opts) => {
                const { route } = opts;
                const catData: Category = (route.params as any)?.categoryData;
                return {
                  title: catData.title,
                  headerStyle: {
                    backgroundColor: catData.color,
                  },
                };
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }

  return screen;
}

const styles = StyleSheet.create({
  container: {},
});
