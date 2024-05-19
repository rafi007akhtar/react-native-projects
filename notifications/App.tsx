import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

let devicePushToken: string;

export default function App() {
  useEffect(() => {
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    console.log({ projectId });

    async function configurePushNotifications() {
      let { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        status = newStatus;
      }

      if (status !== "granted") {
        Alert.alert(
          "Notification permission needed",
          "Please provide permission."
        );
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync({
        projectId,
      });
      console.log("push token data:", pushTokenData);
      devicePushToken = pushTokenData.data;

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "test",
          importance: Notifications.AndroidImportance.LOW,
        });
      }
    }

    configurePushNotifications();
    // Once configured, test sending push notifications from here:
    // https://expo.dev/notifications
  }, []);

  useEffect(() => {
    const receivedSub = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    const responseSub = Notifications.addNotificationResponseReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    return () => {
      receivedSub.remove();
      responseSub.remove();
    };
  }, []);

  async function notificationBtnClickHandler(delaySeconds = 0) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test notification",
        body: "This is the body of the test notification",
        data: { im: "Batman" },
      },
      trigger: delaySeconds
        ? {
            seconds: delaySeconds,
          }
        : null,
    });
  }

  async function sendPushNotificationHandler() {
    try {
      await fetch(EXPO_PUSH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: devicePushToken,
          title: "Test push notification through code",
          body: "In the code I am calling the EXPO API for push notifications.",
        }),
      });
    } catch (e) {
      console.log("Some error occured. Unable to send push notification", e);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title="Schedule a notification"
        onPress={() => notificationBtnClickHandler(5)}
      />
      <Text></Text>

      <Button
        title="Send notification immediately"
        onPress={() => notificationBtnClickHandler()}
      />
      <Text></Text>

      <Button
        title="Send push notification"
        onPress={sendPushNotificationHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
