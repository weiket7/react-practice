import {
  Text,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Title from "../components/Title";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";
import { Ionicons } from "@expo/vector-icons";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let min = 1;
let max = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guesses, setGuesses] = useState(initialGuess);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    min = 1;
    max = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know this is wrong..", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      max = currentGuess;
    } else {
      min = currentGuess + 1;
    }
    const newNumber = generateRandomBetween(min, max, currentGuess);
    setCurrentGuess(newNumber);
    //setGuesses((previousGuesses) => [newNumber, ...previousGuesses]);
  }

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={nextGuessHandler.bind(this, "higher")}>
              <Ionicons name="md-add" size={24} color="white" />
            </Button>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    //landscape
    content = (
      <>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <Button onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </Button>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <Button onPress={nextGuessHandler.bind(this, "higher")}>
              <Ionicons name="md-add" size={24} color="white" />
            </Button>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>
      {content}
      <View></View>
    </View>
  );
  return;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1, //view take as much space as available
  },
  buttonsContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default GameScreen;
