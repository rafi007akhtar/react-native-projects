import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { BaseProp } from "../models/baseTypes";
import { colors } from "../utils/constants";
import { useSmallScreen } from "../hooks/useSmallScreen";

const window = Dimensions.get("window"); // does not take status bar into account
const screen = Dimensions.get("screen"); // takes status bar into account on Android

export default function NumberContainer(props: BaseProp) {
  const { smallDevice } = useSmallScreen();
  const margin = smallDevice ? 12 : 24;
  const padding = smallDevice ? 12 : 24;
  const fontSize = smallDevice ? 24 : 36;

  return (
    <View style={[styles.container, { margin, padding }]}>
      <Text style={[styles.numberText, { fontSize }]}>{props.children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: colors.ACCENT_500,
    padding: 24,
    margin: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: colors.ACCENT_500,
    fontSize: 24,
    fontWeight: "bold",
  },
});
