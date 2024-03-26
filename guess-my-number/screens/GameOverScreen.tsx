import { useAtom } from "jotai";
import { Text, StyleSheet, View, Image } from "react-native";
import { gamePlayAtom, initState } from "../global-states";
import Title from "../components/Title";
import { colors } from "../utils/constants";
import Bold from "../components/Bold";
import PrimaryButton from "../components/PrimaryButton";

export default function GameOverScreen() {
  const [gamePlay, setGamePlay] = useAtom(gamePlayAtom);

  return (
    <View style={styles.container}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/success.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.summaryText}>
        The phone needed{" "}
        <Bold highlightText={true}>{gamePlay.numberOfGuesses}</Bold> tries to
        guess the number{" "}
        <Bold highlightText={true}>{gamePlay.numberToGuess}</Bold>.
      </Text>
      <PrimaryButton
        onClick={() => {
          setGamePlay(initState);
        }}
      >
        Restart
      </PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderWidth: 3,
    borderRadius: 150,
    borderColor: colors.PRIMARY_800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24, // fontSize cascades only inside nested Text components
    textAlign: "center",
    marginBottom: 24,
  },
});
