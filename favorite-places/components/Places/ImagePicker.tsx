import { Alert, View, Image, StyleSheet, Text } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { COLORS } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import { useAtom } from "jotai";
import { selectedImageAtom } from "../../state/atoms";

export default function ImagePicker() {
  const [cameraPermission, requestPermission] = useCameraPermissions();
  const [selectedImageUri, setselectedImageUri] = useAtom(selectedImageAtom);

  async function verifyPermission() {
    if (cameraPermission?.status === PermissionStatus.UNDETERMINED) {
      const permissionResp = await requestPermission();

      return permissionResp.granted;
    }

    if (cameraPermission?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions",
        "Camera permission is needed for taking picture."
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const permissionGranted = await verifyPermission();
    if (!permissionGranted) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (image?.assets?.length) {
      const uri = image.assets[0].uri;
      setselectedImageUri(uri);
    }
  }

  let imageViewer = (
    <Text style={styles.imagePlaceholder}>No image selected yet.</Text>
  );

  if (selectedImageUri) {
    imageViewer = (
      <Image source={{ uri: selectedImageUri }} style={styles.image} />
    );
  } else {
    setselectedImageUri("");
  }

  return (
    <View>
      <View style={styles.imageViewer}>{imageViewer}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take image
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imageViewer: {
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    overflow: "hidden",
    height: 200,
  },
  image: {
    width: "100%",
    height: 200,
  },
  imagePlaceholder: {
    color: COLORS.primary200,
    fontFamily: "product-sans",
    marginBottom: 4,
  },
});
