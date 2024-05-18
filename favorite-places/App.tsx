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
import { useEffect } from "react";
import { closeDB, getAllPlaces, initDB, isDBOpen } from "./utils/db.utils";
import { Places } from "./models/place.model";
import { useAtom } from "jotai";
import { placesAtom } from "./state/atoms";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "product-sans": require("./assets/fonts/Product-Sans-Regular.ttf"),
    "product-sans-bold": require("./assets/fonts/Product-Sans-Bold.ttf"),
  });
  const [_places, setPlaces] = useAtom(placesAtom);

  useEffect(() => {
    async function performDBOperations() {
      const [_init, initErr] = await initDB();
      if (initErr) {
        console.error(initErr);
        return;
      }

      const [result, placesErr] = await getAllPlaces();
      if (placesErr) {
        return;
      }

      const allPlaces: Places = [...(result as any)];
      console.log({ allPlaces });
      setPlaces(allPlaces);
    }

    performDBOperations();

    return () => {
      if (isDBOpen) {
        closeDB();
      }
    };
  }, []);

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
    justifyContent: "center",
    alignItems: "center",
  },
});
