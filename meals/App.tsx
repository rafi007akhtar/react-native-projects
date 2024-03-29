import { StyleSheet, Text } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [fontsLoaded] = useFonts({
    "product-sans": require("./assets/fonts/Product-Sans-Regular.ttf"),
    "product-sans-bold": require("./assets/fonts/Product-Sans-Bold.ttf"),
  });

  let screen = <Text>Loading...</Text>;

  if (fontsLoaded) {
    screen = <CategoriesScreen />;
  }

  return (
    <>
      <StatusBar style="inverted" />
      {screen}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
