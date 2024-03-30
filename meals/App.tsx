import { StyleSheet, Text } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";

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
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="MealsCategories" component={CategoriesScreen} />
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
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
