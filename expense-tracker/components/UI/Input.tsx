import { StyleSheet, Text, TextInputProps, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../../constants/styles";

interface InputProps extends TextInputProps {
  labelText: string;
  style?: object;
  error?: boolean;
  errorMessage?: string;
}

export default function Input(props: InputProps) {
  let { labelText, style, error, errorMessage, ...rest } = props;
  const isMultiline = props.multiline;

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{labelText}</Text>
      <TextInput
        {...rest}
        style={[
          styles.input,
          isMultiline && styles.inputMultiline,
          error && styles.inputError,
        ]}
      />
      {error && <Text style={styles.errorText}>{errorMessage}</Text>}
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
  inputError: {
    backgroundColor: globalStyles.colors.error50,
  },
  errorText: {
    color: globalStyles.colors.error400,
    marginTop: 4,
  },
  inputMultiline: {
    textAlignVertical: "top",
  },
});
