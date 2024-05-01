import { StyleSheet, Text, TextInputProps, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../../constants/styles";

interface InputProps extends TextInputProps {
  labelText: string;
  style?: object;
}

export default function Input(props: InputProps) {
  const { labelText, style, ...rest } = props;
  const isMultiline = props.multiline;

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{labelText}</Text>
      <TextInput
        {...rest}
        style={[styles.input, isMultiline && styles.inputMultiline]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: globalStyles.colors.primary100,
    marginBottom: 4,
    fontFamily: "product-sans-bold",
  },
  input: {
    backgroundColor: globalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: globalStyles.colors.primary700,
    fontFamily: "product-sans",
  },
  inputMultiline: {
    textAlignVertical: "top",
  },
});
