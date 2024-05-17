import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { COLORS } from "../../constants/colors";
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { getMapURL } from "../../utils/maps.utils";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { selectedLocationAtom } from "../../state/atoms";

export default function LocationPicker() {
  const navigation = useNavigation();
  const [selectedLocation, setSelectedLocation] = useAtom(selectedLocationAtom);
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
    const { latitude, longitude } = location.coords;
    setSelectedLocation({ latitude, longitude });
  }

  function selectOnMap() {
    navigation.navigate("Map" as never);
  }

  let mapPreview = <Text>Map Preview goes here.</Text>;

  if (selectedLocation?.latitude) {
    mapPreview = (
      <Image
        style={styles.mapPreviewImage}
        source={{
          uri: getMapURL(
            selectedLocation.latitude.toString(),
            selectedLocation.longitude.toString()
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
