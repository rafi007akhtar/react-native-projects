import "react-native-gesture-handler";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import { globalStyles } from "./constants/styles";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ExpenseOverview() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: globalStyles.fonts.SANS_REGULAR,
          alignItems: "center",
          justifyContent: "center",
        },
        headerTitleStyle: {
          fontFamily: globalStyles.fonts.SANS_REGULAR,
        },
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: globalStyles.colors.primary500,
        },
        headerTintColor: "white",
      }}
    >
      <Tab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
        }}
      />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{ title: "All Expenses" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "product-sans": require("./assets/fonts/Product-Sans-Regular.ttf"),
    "product-sans-bold": require("./assets/fonts/Product-Sans-Bold.ttf"),
  });

  let screen = <Text>Loading ...</Text>;

  if (fontsLoaded) {
    screen = (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpenseOverview"
            component={ExpenseOverview}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpense} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return screen;
}
