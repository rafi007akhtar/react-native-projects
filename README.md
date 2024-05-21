# React Native Projects

## TOC

Order of projects to follow along for course content:

1. [goals tracker](./goals-tracker/) | Contains React Native basics.
2. [guess my number](./guess-my-number/) | Layouting and state sharing in depth.
3. [meals](./meals/) | Navigation with React Navigation, state management with jotai (alter branch has context and redux), build to apk
4. [other navigators](./other-navigators/) | To practise writing other navigators in React Navigation library. In particular, BottomTabNavigator is used here.
5. [expense tracker](./expense-tracker/) | Created an app to practise everything learned so far.
6. [user authentication](./user-authentication/) | Connect the React Native app with Firebase and manage authentication through that. This is also the only project to use JavaScript instead of TypeScript.
7. [favorite places](./favorite-places/) | Using native device features using React Native. Worked on geolocation / Google Maps, camera (`expo-image-picker`), SQLite DB for device storage (with new SQLite API, not the deprecated one). Also modified app.json file with plugins for permissions.
8. [expo bare](./expo-bare/) | Created this project while going through the lesson on React Native without Expo. Created a hello-world bare Expo project. Skipped on the pure React Native project hands on.
9. [notifications](./notifications/) | Sending local and push notifications to devices.

## Note for Build

In order to build the project for Android, go to the project root, and login to EAS services.

```
eas login
```

Once logged in, run the command to configure the build.

```
eas build:configure
```

This will modify app.json file and add an eas.json file in the project root.
Inside the app.json file, a `projectId` will be added. You may note this for sending push notifications through EAS service. Other than that, version number needs to be added for Android and iOS. For Android it's any _positive_ number as `versionCode`. For iOS it's a string in MM.mm.increments format as `buildNumber`. This file will also contain all permissions as well as plugins for those.

Then, inside eas.json, add a preview for Android:

```json
"build": {
    "preview": {
    "distribution": "internal",
    "android": {
        "buildType": "apk"
    }
    },
},
```

Finally, run this command for Android build:

```sh
 eas build -p android --profile preview
```

The project will be packaged and sent to Expo. You will be able to see the build and APK if successful over there.
