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
import { gamePlayAtom } from "./global-states";
import { colors } from "./utils/constants";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

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
  const [gamePlay] = useAtom(gamePlayAtom);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      return fontsLoaded ? SplashScreen.hideAsync() : null;
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  let screen = <StartGameScreen />;

  if (gamePlay.numberConfirmedFlag) {
    screen = <GameScreen />;
  }

  if (gamePlay.gameIsOver) {
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
