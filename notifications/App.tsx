import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

type PushTokenWeb = {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
};

type PushTokenAgnostic = PushTokenWeb | string;

let devicePushToken: PushTokenAgnostic;

export default function App() {
  useEffect(() => {
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

      const pushTokenData = await Notifications.getDevicePushTokenAsync();
      devicePushToken = pushTokenData.data;
      console.log({ devicePushToken });

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "test",
          importance: Notifications.AndroidImportance.LOW,
        });
      }
    }

    configurePushNotifications();
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
