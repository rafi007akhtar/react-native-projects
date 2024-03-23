import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appContainer: {
    flex: 1, // gives the outermost container 100% height
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    display: "flex", // by default it's already flex
    flexDirection: "row", // NOTE: the default flex-direction in React Native is "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    borderRadius: 4,
    padding: 8,
  },
  goalsContainer: {
    flex: 5,
  },
});

export default styles;
