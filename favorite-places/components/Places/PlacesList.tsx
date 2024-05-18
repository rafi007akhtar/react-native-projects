import { FlatList, View, Text, StyleSheet } from "react-native";
import { PlacesListProps } from "../../models/props.model";
import PlaceItem from "./PlaceItem";
import { COLORS } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { Place } from "../../models/place.model";

export default function PlacesList(props: PlacesListProps) {
  const navigation = useNavigation<any>();

  if (!props.places || !props.places.length) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet. Start adding some!
        </Text>
      </View>
    );
  }

  function placeItemClickHandler(place: Place) {
    navigation.navigate("PlacesDetails", { place });
  }

  return (
    <FlatList
      style={styles.list}
      data={props.places}
      keyExtractor={(place) => place.id}
      renderItem={(placeContainer) => (
        <PlaceItem
          place={placeContainer.item}
          onClick={() => placeItemClickHandler(placeContainer.item)}
        />
      )}
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
  list: {
    margin: 24,
  },
});
