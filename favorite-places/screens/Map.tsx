import { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, {
  Region,
  Marker,
  MapPressEvent,
  LatLng,
} from "react-native-maps";
import IconButton from "../components/UI/IconButton";

export default function Map(props: { navigation: any }) {
  const [selectedCoord, setSelectedCoord] = useState<LatLng>();

  const region: Region = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    latitude: 37.78, // TODO: this is hard coded; change this later
    longitude: -122.43, // TODO: this is hard coded; change this later
  };

  function mapPressHandler(evt: MapPressEvent) {
    const { latitude, longitude } = evt.nativeEvent.coordinate;
    setSelectedCoord({ latitude, longitude });
  }

  function saveSelectedCoordHandler() {
    if (!selectedCoord) {
      Alert.alert(
        "Unable to save coordinates",
        "Please select a point in the map before trying to save it."
      );
      return;
    }

    props.navigation.navigate("AddPlace", selectedCoord);
  }
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: ({ tintColor }: { tintColor: string }) => (
        <IconButton
          name="save"
          size={24}
          color={tintColor}
          onPress={saveSelectedCoordHandler}
        />
      ),
    });
  }, [props.navigation, selectedCoord]);

  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={mapPressHandler}
    >
      {selectedCoord && (
        <Marker coordinate={selectedCoord} title="Picked Location" />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
