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
import { numberConfirmedFlag } from "./global-states";
import { colors } from "./utils/constants";

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
        <Wrapper style={styles.rootContainer}>
          {isNumberConfirmed ? <GameScreen /> : <StartGameScreen />}
        </Wrapper>
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
