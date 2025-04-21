import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground, SafeAreaView } from "react-native";
import { useState } from "react";

import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Colors from "./constants/colors";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [number, setNumber] = useState();
  const [gameOver, setGameOver] = useState(true);
  const [rounds, setRounds] = useState(0);

  function pickedNumberHandler(value) {
    setNumber(value); //batched by React to not re-render twice
    setGameOver(false);
  }

  function gameOverHandler() {
    setGameOver(true);
  }

  function startNewGame() {
    setNumber(null);
    setRounds(0);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  if (number) {
    screen = <GameScreen userNumber={number} onGameOver={gameOverHandler} />;
  }
  if (gameOver && number) {
    screen = (
      <GameOverScreen
        rounds={rounds}
        number={number}
        onStartNewGame={startNewGame}
      ></GameOverScreen>
    );
  }

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="light"></StatusBar>
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.container}
      >
        <ImageBackground
          resizeMode="cover" //cover all space by zooming in or out
          source={require("./assets/images/background.png")}
          style={styles.container}
          imageStyle={styles.backgroundImage} //inner image
        >
          <SafeAreaView style={styles.container}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
