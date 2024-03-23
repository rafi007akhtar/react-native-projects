import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appContainer: {
    flex: 1, // gives the outermost container 100% height
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    display: "flex", // by default it's already flex
    flexDirection: "row", // NOTE: the default flex-direction in React Native is "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    borderRadius: 4,
    padding: 8,
  },
  goalsContainer: {
    flex: 5,
  },

  goalItemView: {
    // <Text> elems do NOT support borderRadius on iOS, so that, along with the rest, will be applied to a container <View> for the sake of iPhones
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalItemText: {
    // NOTE: (important) styles do NOT cascade in React Native
    // meaning, if we have two elems, say <A> and <B>, and <B> is a child elem of <A>, then styles applied to <A> will not also be applied to <B>
    // here <Text> is a child element of <View>, but putting the color attribute to <View> style will not apply it to <Text>
    // therefore, to see the white color, it needs to be applied in the child <Text> elem
    color: "#ffffff",
  },
});

export default styles;
