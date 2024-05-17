import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import { PlaceProps } from "../../models/props.model";
import { COLORS } from "../../constants/colors";

export default function PlaceItem(props: PlaceProps) {
  const place = props.place;

  return (
    <Pressable
      onPress={props.onClick}
      style={(state) => [styles.item, state.pressed && styles.pressed]}
    >
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: COLORS.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.6,
  },
  image: {
    flex: 1,
    height: 100,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    objectFit: "cover",
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontFamily: "product-sans-bold",
    fontSize: 18,
    color: COLORS.gray700,
  },
  address: {
    fontFamily: "product-sans",
    fontSize: 12,
    color: COLORS.gray700,
    marginVertical: 4,
  },
});
