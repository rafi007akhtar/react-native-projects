import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { COLORS } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Btn from "../UI/Btn";
import { useAtom } from "jotai";
import {
  defaultLocation,
  placesAtom,
  selectedImageAtom,
  selectedLocationAtom,
  titleAtom,
} from "../../state/atoms";
import { useNavigation } from "@react-navigation/native";
import { getAddress } from "../../utils/maps.utils";
import { Place } from "../../models/place.model";
import { generateUniqueId } from "../../utils/common.utils";

export default function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useAtom(titleAtom);
  const [selectedLocation, setSelectedLocation] = useAtom(selectedLocationAtom);
  const [selectedImage, setselectedImage] = useAtom(selectedImageAtom);
  const [formFilled, setFormFilled] = useState(false);
  const [places, setPlaces] = useAtom(placesAtom);
  const navigation = useNavigation();

  useEffect(() => {
    if (enteredTitle && selectedImage && selectedLocation?.latitude) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  }, [selectedImage, selectedLocation, enteredTitle]);

  function titleUpdateHandler(updatedTitle: string) {
    setEnteredTitle(updatedTitle);
  }

  async function savePlaceHandler() {
    console.log({ enteredTitle, selectedImage, selectedLocation });
    if (formFilled) {
      const [readableAddress, err] = await getAddress(
        selectedLocation.latitude.toString(),
        selectedLocation.longitude.toString()
      );
      if (err) {
        Alert.alert("Something went wrong", "Place try again later.");
        return;
      }
      const place: Place = {
        id: generateUniqueId(),
        address: readableAddress as string,
        imageUri: selectedImage,
        location: selectedLocation,
        title: enteredTitle,
      };
      setPlaces((currPlaces) => [...currPlaces, place]);

      // reset entered vals
      setEnteredTitle("");
      setSelectedLocation(defaultLocation);
      setselectedImage("");

      // navigate to previous
      navigation.navigate("AllPlaces" as never);
    } else {
      Alert.alert(
        "Unable to add place",
        "Please fill the form. All details are mandatory."
      );
    }
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={titleUpdateHandler}
          value={enteredTitle}
          style={styles.input}
        />
        <ImagePicker />
        <LocationPicker />
        <Btn onPress={savePlaceHandler}>Add Place</Btn>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    color: COLORS.primary500,
    marginBottom: 4,
    fontFamily: "product-sans-bold",
  },
  input: {
    backgroundColor: COLORS.primary100,
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomColor: COLORS.primary700,
    borderBottomWidth: 4,
    fontFamily: "product-sans",
  },
});
