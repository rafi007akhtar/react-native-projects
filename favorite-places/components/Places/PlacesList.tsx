import { FlatList, View, Text, StyleSheet } from "react-native";
import { PlacesListProps } from "../../models/props.model";
import PlaceItem from "./PlaceItem";
import { COLORS } from "../../constants/colors";

export default function PlacesList(props: PlacesListProps) {
  if (!props.places || !props.places.length) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet. Start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={props.places}
      keyExtractor={(place) => place.id}
      renderItem={(placeContainer) => <PlaceItem place={placeContainer.item} />}
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fallbackText: {
    fontSize: 16,
    fontFamily: "product-sans",
    color: COLORS.primary200,
  },
});
