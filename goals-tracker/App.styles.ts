import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appContainer: {
    flex: 1, // gives the outermost container 100% height
    marginTop: "auto",
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
  },
  goalsContainer: {
    flex: 5,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
});

export default styles;
