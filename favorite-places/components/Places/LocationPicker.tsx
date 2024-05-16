import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { COLORS } from "../../constants/colors";
import {
  LocationObject,
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { useEffect, useState } from "react";
import { getMapURL } from "../../utils/maps.utils";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function LocationPicker() {
  const navigation = useNavigation();
  const route = useRoute();
  const [pickedLocation, setPickedLocation] = useState<LocationObject>();
  const [locPermission, requestPermission] = useForegroundPermissions();

  async function verifyPermission() {
    let permissionReps;
    if (locPermission?.status !== PermissionStatus.GRANTED) {
      permissionReps = await requestPermission();
    }

    if (locPermission?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Location permission denied",
        "Unable to load maps. Need location permission for that."
      );
      return false;
    }

    return locPermission?.status === PermissionStatus.GRANTED;
  }

  async function getLocationHandler() {
    const hasLocationPermission = await verifyPermission();
    if (!hasLocationPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation(location);
    console.log({ location });
  }

  const coords = route?.params;

  useEffect(() => {
    if (coords) {
      setPickedLocation({ coords } as LocationObject);
    }
  }, [coords]);

  function selectOnMap() {
    navigation.navigate("Map" as never);
  }

  let mapPreview = <Text>Map Preview goes here.</Text>;

  if (pickedLocation) {
    mapPreview = (
      <Image
        style={styles.mapPreviewImage}
        source={{
          uri: getMapURL(
            pickedLocation.coords.latitude.toString(),
            pickedLocation.coords.longitude.toString()
          ),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{mapPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={selectOnMap}>
          Select on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mapPreviewImage: {
    width: "100%",
    height: "100%",
  },
});
