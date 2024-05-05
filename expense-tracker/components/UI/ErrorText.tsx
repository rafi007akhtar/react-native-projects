import { StyleSheet, Text, View } from "react-native";
import { BaseProps } from "../../models/base.model";
import { globalStyles } from "../../constants/styles";

interface ErrorTextProps extends BaseProps {
  errMsg: string;
}

export default function ErrorText(props: ErrorTextProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.errMsg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: globalStyles.colors.error400,
  },
  text: {
    fontFamily: "product-sans-bold",
    color: globalStyles.colors.error600,
  },
});
