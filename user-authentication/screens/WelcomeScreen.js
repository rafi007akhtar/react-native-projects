import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import useAuthStore from "../state/stores";

function WelcomeScreen() {
  const [protectedMessage, setProtectedMessage] = useState("");
  const [token] = useAuthStore((state) => [state.token]);

  useEffect(() => {
    const messageURL = `https://rn-http-e64e8-default-rtdb.firebaseio.com/message.json?auth=${token}`;
    axios
      .get(messageURL)
      .then((res) => {
        setProtectedMessage(res?.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{protectedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
