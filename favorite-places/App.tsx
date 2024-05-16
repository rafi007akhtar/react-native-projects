import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import { useFonts } from "expo-font";
import IconButton from "./components/UI/IconButton";
import { COLORS } from "./constants/colors";
import Map from "./screens/Map";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "product-sans": require("./assets/fonts/Product-Sans-Regular.ttf"),
    "product-sans-bold": require("./assets/fonts/Product-Sans-Bold.ttf"),
  });

  let screen = (
    <View style={styles.loadingContainer}>
      <Text>Loading ...</Text>
    </View>
  );

  if (fontsLoaded) {
    screen = (
      <>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: COLORS.primary500,
              },
              headerTintColor: COLORS.gray700,
              headerTitleStyle: {
                fontFamily: "product-sans-bold",
              },
              contentStyle: {
                backgroundColor: COLORS.gray700,
              },
            }}
          >
            <Stack.Screen
              name="AllPlaces"
              component={AllPlaces}
              options={({ navigation }) => ({
                headerRight: (opts) => (
                  <IconButton
                    name="add"
                    size={24}
                    color={opts.tintColor}
                    onPress={() => navigation.navigate("AddPlace")}
                  />
                ),
                headerTitle: "All Places",
              })}
            />
            <Stack.Screen
              name="AddPlace"
              component={AddPlace}
              options={{
                headerTitle: "Add Place",
              }}
            />
            <Stack.Screen name="Map" component={Map} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }

  return screen;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
  },
});
