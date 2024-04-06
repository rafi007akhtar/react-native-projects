import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { TextProps } from "react-native";

interface ETProps extends TextProps {
  isBold?: boolean;
}

export default function ET(props: ETProps) {
  const { children, style, ...rest } = props;
  const [isBold] = useState(!!rest.isBold);

  const styles = StyleSheet.create({
    text: {
      fontFamily: isBold ? "product-sans-bold" : "product-sans",
    },
  });

  return (
    <Text style={[style, styles.text]} {...rest}>
      {props.children}
    </Text>
  );
}
