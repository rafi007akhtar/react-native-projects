import { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Region, Marker, MapPressEvent } from "react-native-maps";
import IconButton from "../components/UI/IconButton";
import { useAtom } from "jotai";
import { SelectedLocation, selectedLocationAtom } from "../state/atoms";

export default function Map(props: { navigation: any; route: any }) {
  const [selectedLocation, setSelectedLocation] = useAtom(selectedLocationAtom);
  let locationToShow = { ...selectedLocation };
  let readOnlyMap = false;

  const location: SelectedLocation = props?.route?.params?.location;
  if (location) {
    locationToShow = { ...location };
    readOnlyMap = true;
  }

  const region: Region = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    ...locationToShow,
  };

  function mapPressHandler(evt: MapPressEvent) {
    if (readOnlyMap) {
      return;
    }

    const { latitude, longitude } = evt.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  }

  function saveSelectedCoordHandler() {
    if (!locationToShow.latitude) {
      Alert.alert(
        "Unable to save coordinates",
        "Please select a point in the map before trying to save it."
      );
      return;
    }

    props.navigation.navigate("AddPlace");
  }

  useLayoutEffect(() => {
    if (readOnlyMap) {
      return;
    }

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
  }, [props.navigation]);

  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={mapPressHandler}
    >
      {locationToShow && (
        <Marker coordinate={locationToShow} title="Picked Location" />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
