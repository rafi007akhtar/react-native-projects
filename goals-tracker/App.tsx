import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Your course goal." />
        <Button title="Add Goal"></Button>
      </View>

      <View>
        <Text>List of goals ...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
  },
  inputContainer: {
    display: "flex", // by default it's already flex
    flexDirection: "row", // NOTE: the default flex-direction in React Native is "column",
    justifyContent: "space-between",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "80%",
    marginRight: 8,
    borderRadius: 4,
    padding: 8,
  },
});
