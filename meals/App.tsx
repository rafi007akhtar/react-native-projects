import "react-native-gesture-handler";

import { StyleSheet, Text } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import Category from "./models/category";
import MealDetailsScreen from "./screens/MealDetailsScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavoritesScreen from "./screens/FavoritesScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        sceneContainerStyle: {
          backgroundColor: "#6d343370",
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "product-sans",
        },
        headerTintColor: "white",
        drawerContentStyle: { backgroundColor: "#351401" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "#e4baa1",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

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
          <Stack.Navigator>
            <Stack.Screen
              name="Drawer"
              component={DawerNavigator}
              options={{
                headerShown: false,
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
            <Stack.Screen
              name="MealDetails"
              component={MealDetailsScreen}
              options={{
                headerTintColor: "white",
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
