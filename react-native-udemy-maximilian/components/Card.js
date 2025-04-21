import { StyleSheet, View, Dimensions } from "react-native";
import Colors from "../constants/colors";

const deviceWidth = Dimensions.get("window").width;

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center", //position items along cross axis (left to right)
    //alignItems default is stretch
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    borderRadius: 8,
    padding: 16,
    backgroundColor: Colors.primary800,
    elevation: 5, //android
    //shadowColor: "black", //iOS
    //shadowOffset: { width: 0, height: 2 }, //iOS
    //shadowRadius: 6, //iOS
    //shadowOpacity: 0.25, //iOS
  },
});

export default Card;
