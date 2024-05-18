import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Place } from "../models/place.model";
import { COLORS } from "../constants/colors";
import { useLayoutEffect } from "react";

export default function PlacesDetails(props: any) {
  const params = props?.route?.params;
  const place: Place = params?.place;
  const navigation = props?.navigation;

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerTitle: place.title,
    });
  }, [place.title]);

  function showOnMapHandler() {
    const { location } = place;
    navigation.navigate("Map", { location });
  }

  return (
    <ScrollView>
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "35%",
    width: "100%",
    minHeight: 300,
    marginBottom: 12,
  },
  locationContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: COLORS.primary500,
    fontFamily: "product-sans",
    textAlign: "center",
    fontSize: 16,
  },
});
