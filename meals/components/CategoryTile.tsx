import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { iShadow } from "../utils/styles.utl";

type CategoryTileProps = {
  title: string;
  color: string;
  onClick?: () => void;
};

export default function CategoryTile(props: CategoryTileProps) {
  return (
    <View style={[styles.container, { backgroundColor: props.color }]}>
      <Pressable
        onPress={props.onClick}
        style={(pressedData) => [
          styles.button,
          pressedData.pressed
            ? [styles.buttonPressed, { backgroundColor: props.color }]
            : null,
        ]}
        android_ripple={{ borderless: true }}
      >
        <View>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    ...iShadow("black", [0, 2], 0.25, 8), // NOTE: shadow on iOS only appears when there's a background color
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  title: {
    fontSize: 18,
    fontFamily: "product-sans-bold",
  },
});
