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
import { MaterialIcons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ExpenseOverview() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: globalStyles.fonts.SANS_BOLD,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
          fontSize: 13,
          letterSpacing: 0.1,
        },
        headerTitleStyle: {
          fontFamily: globalStyles.fonts.SANS_REGULAR,
        },
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: globalStyles.colors.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: globalStyles.colors.primary500,
          height: 75,
        },
        tabBarActiveTintColor: globalStyles.colors.accent500,
        tabBarInactiveTintColor: globalStyles.colors.primary100,
        headerRight: (props) => (
          <IconButton
            name="add-circle-outline"
            color={props.tintColor}
            size={24}
          />
        ),
      }}
    >
      <Tab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarIcon: (props) => (
            <MaterialIcons
              name="hourglass-top"
              color={props.color}
              size={props.size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarIcon: (props) => (
            <MaterialIcons
              name="calendar-month"
              size={props.size}
              color={props.color}
            />
          ),
        }}
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
