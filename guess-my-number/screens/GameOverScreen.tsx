import { useAtom } from "jotai";
import { Text, StyleSheet, View, Image } from "react-native";
import { gamePlayAtom, initState } from "../global-states";
import Title from "../components/Title";
import { colors } from "../utils/constants";
import Bold from "../components/Bold";
import PrimaryButton from "../components/PrimaryButton";
import { Dimensions } from "react-native";
import { useSmallScreen } from "../hooks/useSmallScreen";

const window = Dimensions.get("window");
const radiusToUse = window.height < 650 ? 150 : 300;
const borderRadiusToUse = radiusToUse / 2;

export default function GameOverScreen() {
  const [gamePlay, setGamePlay] = useAtom(gamePlayAtom);
  const { smallDevice } = useSmallScreen();
  const imageMargin = smallDevice ? 12 : 36;
  const summaryFontSize = smallDevice ? 16 : 24;
  const summaryTextMarginBottom = smallDevice ? 8 : 24;

  return (
    <View style={styles.container}>
      <Title>GAME OVER!</Title>
      <View style={[styles.imageContainer, { margin: imageMargin }]}>
        <Image
          source={require("../assets/images/success.png")}
          style={styles.image}
        />
      </View>
      <Text
        style={[
          styles.summaryText,
          { fontSize: summaryFontSize, marginBottom: summaryTextMarginBottom },
        ]}
      >
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
    width: radiusToUse,
    height: radiusToUse,
    borderWidth: 3,
    borderRadius: borderRadiusToUse,
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
    fontSize: 16, // fontSize cascades only inside nested Text components
    textAlign: "center",
    marginBottom: 24,
  },
});
