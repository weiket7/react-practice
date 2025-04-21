import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import Button from "../components/Button";
import Title from "../components/Title";
import Colors from "../constants/colors";

function GameOverScreen({ rounds, number, onStartNewGame }) {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;
  if (width < 380) {
    imageSize = 150;
  }
  if (height < 400) {
    imageSize = 80;
  }
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };
  return (
    <View style={styles.rootContainer}>
      <Title>Game Over!</Title>
      <View style={[styles.imageContainer, imageStyle]}>
        <Image
          source={require("../assets/images/success.png")}
          style={styles.image}
        ></Image>
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlightText}>{rounds}</Text>{" "}
        rounds to guess the number{" "}
        <Text style={styles.highlightText}>{number}</Text>
      </Text>
      <Button onPress={onStartNewGame}>Start New Game</Button>
    </View>
  );
}

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150, //1/2 of width and height to make circle
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlightText: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});

export default GameOverScreen;
