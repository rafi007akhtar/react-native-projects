import { useAtom } from "jotai";
import { Text } from "react-native";
import { numberToGuess } from "../global-states";

export default function GameScreen() {
  const [enteredNum] = useAtom(numberToGuess);

  return <Text>GameScreen works! Need to guess {enteredNum}</Text>;
}
