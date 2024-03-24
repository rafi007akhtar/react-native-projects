import { Text, View } from "react-native";
import { BaseProp } from "../models/baseTypes";

const PrimaryButton: React.FC<BaseProp> = function (props) {
  return (
    <View>
      <Text>{props.children}</Text>
    </View>
  );
};

export default PrimaryButton;
