import { Text, View, Pressable, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { formatDate } from "../utils/date";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({ id, description, amount, date }) {
  const navigation = useNavigation();

  function expressPressHandler() {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    }); //<Stack.Screen name="ManageExpense"
  }

  return (
    <Pressable
      onPress={expressPressHandler}
      style={({ pressed }) => {
        pressed && styles.pressed;
      }}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={[styles.textBase]}>{formatDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3, //android
    shadowColor: GlobalStyles.colors.gray500, //ios
    shadowRadius: 4, //ios
    shadowOffset: { width: 1, height: 1 }, //ios
    shadowOpacity: 0.4, //ios
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});

export default ExpenseItem;
