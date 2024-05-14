import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import useAuthStore from "./state/stores";
import IconButton from "./components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import LoadingOverlay from "./components/ui/LoadingOverlay";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const [logout] = useAuthStore((state) => [state.logout]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: (props) => (
            <IconButton
              icon="exit"
              size={24}
              color={props.tintColor}
              onPress={logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const [isAuthenticated] = useAuthStore((state) => [state.isAuthenticated]);
  const screen = isAuthenticated ? <AuthenticatedStack /> : <AuthStack />;

  return <NavigationContainer>{screen}</NavigationContainer>;
}

export default function App() {
  const [authenticate] = useAuthStore((state) => [state.authenticate]);
  const [fetchingToken, setFetchingToken] = useState(false);

  useEffect(() => {
    async function lastSessionAction() {
      setFetchingToken(true);
      const token = await AsyncStorage.getItem("token");
      setFetchingToken(false);
      if (token) {
        authenticate(token);
      }
    }
    lastSessionAction();
  }, []);

  const screen = fetchingToken ? (
    <LoadingOverlay message="Loading ..." />
  ) : (
    <Navigation />
  );

  return (
    <>
      <StatusBar style="light" />

      {screen}
    </>
  );
}
