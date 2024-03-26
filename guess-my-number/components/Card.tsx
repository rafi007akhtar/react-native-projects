import { StyleSheet, View } from "react-native";
import { BaseProp } from "../models/baseTypes";
import { colors } from "../utils/constants";
import { iShadow } from "../utils/style-helpers.utils";

export default function Card(props: BaseProp) {
  return <View style={styles.cardContainer}>{props.children}</View>;
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 24,
    marginTop: 40,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: colors.PRIMARY_800,
    borderRadius: 8,
    alignItems: "center",

    // SHADOW TIME!
    // shadows in React Native are different than in CSS; there's no box-shadow property
    // instead, there are different solutions for Android and iOS

    // Android soln.
    elevation: 8,

    // custom iOS solution (built on top of existing iOS solution)
    ...iShadow("black", [0, 2], 0.25, 6),
  },
});
