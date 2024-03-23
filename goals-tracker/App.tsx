import { Button, Text, TextInput, View } from "react-native";
import styles from "./App.styles";

export default function App() {
  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Your course goal." />
        <Button title="Add Goal"></Button>
      </View>

      <View style={styles.goalsContainer}>
        <Text>List of goals ...</Text>
      </View>
    </View>
  );
}
