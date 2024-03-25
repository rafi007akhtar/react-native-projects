import {
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
} from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import { useAtom } from "jotai";
import { gameIsOverAtom, numberConfirmedFlag } from "./global-states";
import { colors } from "./utils/constants";
import GameOverScreen from "./screens/GameOverScreen";

function Wrapper(props: any) {
  const iOS = Platform.OS === "ios";
  const { children, ...rest } = props;
  return iOS ? (
    <SafeAreaView {...rest}>{children}</SafeAreaView>
  ) : (
    <View {...rest}>{children}</View>
  );
}

export default function App() {
  const [isNumberConfirmed] = useAtom(numberConfirmedFlag);
  const [gameIsOver] = useAtom(gameIsOverAtom);

  let screen = <StartGameScreen />;

  if (isNumberConfirmed) {
    screen = <GameScreen />;
  }

  if (gameIsOver) {
    screen = <GameOverScreen />;
  }

  return (
    <LinearGradient
      colors={[colors.PRIMARY_700, colors.ACCENT_500]}
      style={styles.rootContainer}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootContainer}
        imageStyle={styles.backgroundImage}
      >
        <Wrapper style={styles.rootContainer}>{screen}</Wrapper>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.25,
  },
});
