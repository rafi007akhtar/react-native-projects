import { useAtom } from "jotai";
import { StyleSheet, Text, View } from "react-native";
import { numberToGuess } from "../global-states";
import Title from "../components/Title";

export default function GameScreen() {
  const [enteredNum] = useAtom(numberToGuess);

  return (
    <View style={styles.container}>
      <Title>Opponent's guess</Title>
      {/* TODO: add guess here */}

      <View>
        <Text>Higher or lower?</Text>
        {/* TODO: buttons for + or - */}
      </View>

      {/* TODO: view for log rounds */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
});
