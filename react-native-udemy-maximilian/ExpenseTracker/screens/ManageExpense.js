import { View, Text, StyleSheet } from "react-native";
import { useLayoutEffect } from "react";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/IconButton";
import Button from "../components/Button";
import ExpenseForm from "../components/ExpenseForm";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";

function ManageExpense({ route, navigation }) {
  const expenseContext = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;

  const isEdit = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdit ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdit]);

  function deleteExpenseHandler() {
    expenseContext.deleteExpense(editedExpenseId); //async
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEdit) {
      expenseContext.updateExpense(editedExpenseId, {
        description: "test!!!!",
        amount: 89.99,
        date: new Date(),
      });
    } else {
      expenseContext.addExpense({
        description: "test",
        amount: 19.99,
        date: new Date(),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm></ExpenseForm>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEdit ? "Update" : "Add"}
        </Button>
      </View>
      {isEdit && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center", //center vertically
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ManageExpense;
