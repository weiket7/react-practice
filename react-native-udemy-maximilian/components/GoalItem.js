import { StyleSheet, View, Text, Pressable } from "react-native";

function GoalItem(props) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#dddddd" }} //android
        style={({ pressed }) => pressed && styles.pressedItem} //iOS
        onPress={props.onDelete.bind(this, props.id)}
      >
        <Text style={styles.goalText}>
          {props.id} {props.text}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "blue",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    padding: 8, //padding part of text, ripple take it into account
    color: "white",
  },
});

export default GoalItem;
