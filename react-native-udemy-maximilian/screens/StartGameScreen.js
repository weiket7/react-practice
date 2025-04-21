import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState } from "react";
import Button from "../components/Button";
import Colors from "../constants/colors";
import Title from "../components/Title";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  const { width, height } = useWindowDimensions(); //watch orientation changes

  function numberInputHandler(value) {
    setEnteredNumber(value);
  }

  function resetInput() {
    setEnteredNumber("");
  }

  function confirm() {
    const number = parseInt(enteredNumber);

    if (isNaN(enteredNumber) || number <= 0 || number > 99) {
      Alert.alert("Invalid number", "Between 1 and 99", [
        {
          text: "Okay",
          style: "destructive",
          onPress: resetInput,
        },
      ]);
      return;
    }

    onPickNumber(number);
  }

  const marginTop = height < 380 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behaviour="position">
        <View style={[styles.rootContainer, { marginTop: marginTop }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              value={enteredNumber}
              onChangeText={numberInputHandler}
              //autoCapitalize="none"
              //autoComplete={false}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <Button onPress={resetInput}>Reset</Button>
              </View>
              <View style={styles.buttonContainer}>
                <Button onPress={confirm}>Confirm</Button>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomWidth: 2,
    borderBottomColor: Colors.accent500,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1, //view take as much space as available
  },
});

export default StartGameScreen;
