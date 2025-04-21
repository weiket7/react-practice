import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../constants/colors";

function Button({ children, onPress }) {
  function onPressHandler() {
    console.log("Hey");
  }

  return (
    <View style={styles.outerContainer}>
      <Pressable
        //style={styles.innerContainer}
        style={({ pressed }) =>
          pressed
            ? [styles.innerContainer, styles.pressed]
            : styles.innerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>

    //ripple effect outside of button, nest Pressable inside View
    // <Pressable>
    //   <View></View>
    // </Pressable>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden", //hide effect beyond button
  },
  innerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75, //for iOS
  },
});

export default Button;
