import { View, StyleSheet, Text } from "react-native";
import Input from "./Input";

function ExpenseForm() {
  function amountChangeHandler() {}

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: amountChangeHandler,
          }}
        ></Input>
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxlength: 10,
            onChangeText: () => {},
          }}
        ></Input>
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          // autoCapitlize: "none",
          // autoCorrect: false,
        }}
      ></Input>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
});

export default ExpenseForm;
