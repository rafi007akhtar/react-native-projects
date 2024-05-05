import "react-native-gesture-handler";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { globalStyles } from "./constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import { useAtom } from "jotai";
import { manageExpenseOpenedAtom } from "./state/atoms";
import Spinner from "./components/UI/Spinner";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ExpenseOverview(props: any) {
  const [manageExpenseOpened] = useAtom(manageExpenseOpenedAtom);

  function addHandler() {
    props.navigation.navigate("ManageExpense"); // alternatively, use navigation obj inside screenOptions passed through an inline func.
  }

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
          opacity: manageExpenseOpened ? 0.75 : 1,
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
            onPress={addHandler}
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

  let screen: React.JSX.Element;

  if (fontsLoaded) {
    screen = (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: globalStyles.colors.primary500,
            },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="ExpenseOverview"
            component={ExpenseOverview}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ManageExpense"
            component={ManageExpense}
            options={{
              presentation: "transparentModal",
              headerStyle: {
                backgroundColor: globalStyles.colors.primary450,
                height: 40,
              },
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: globalStyles.fonts.SANS_REGULAR,
                fontSize: 16,
              },
              cardStyle: {
                marginTop: "10%",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    screen = <Spinner />;
  }

  return screen;
}
