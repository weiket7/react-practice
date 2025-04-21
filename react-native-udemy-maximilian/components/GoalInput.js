import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Modal,
  Image,
} from "react-native";
import { useState } from "react";

function GoalInput(props) {
  const [goal, setGoal] = useState("");

  function goalInput(value) {
    setGoal(value);
  }

  function addGoalHandler() {
    props.onAddGoal(goal);
    setGoal("");
  }

  return (
    <Modal visible={props.showModal}>
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/images/goal.png")}
          style={styles.image}
        />
        <TextInput
          placeholder="Course goal"
          style={styles.textInput}
          onChangeText={goalInput}
          value={goal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add goal" onPress={addGoalHandler} color="#5e0acc" />
          </View>
          <View style={styles.button}>
            <Button title="Close" onPress={props.closeModal} color="#f31282" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    borderRadius: 6,
    width: "100%",
    //marginRight: 8,
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 10,
  },
});

export default GoalInput;
