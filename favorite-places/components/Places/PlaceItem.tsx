import { Text, View, Image, Pressable } from "react-native";
import { PlaceProps } from "../../models/props.model";

export default function PlaceItem(props: PlaceProps) {
  const place = props.place;

  return (
    <Pressable onPress={props.onClick}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
}
