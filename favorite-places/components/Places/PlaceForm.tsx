import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

export default function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState("");

  function titleUpdateHandler(updatedTitle: string) {
    setEnteredTitle(updatedTitle);
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
