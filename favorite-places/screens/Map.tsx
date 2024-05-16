import { useLayoutEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Region, Marker, MapPressEvent } from "react-native-maps";
import IconButton from "../components/UI/IconButton";
import { useAtom } from "jotai";
import { selectedLocationAtom } from "../state/atoms";

export default function Map(props: { navigation: any }) {
  const [selectedLocation, setSelectedLocation] = useAtom(selectedLocationAtom);

  const region: Region = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    ...selectedLocation,
  };

  function mapPressHandler(evt: MapPressEvent) {
    const { latitude, longitude } = evt.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  }

  function saveSelectedCoordHandler() {
    if (!selectedLocation.latitude) {
      Alert.alert(
        "Unable to save coordinates",
        "Please select a point in the map before trying to save it."
      );
      return;
    }

    props.navigation.navigate("AddPlace");
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
  }, [props.navigation, selectedLocation]);

  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={mapPressHandler}
    >
      {selectedLocation && (
        <Marker coordinate={selectedLocation} title="Picked Location" />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
