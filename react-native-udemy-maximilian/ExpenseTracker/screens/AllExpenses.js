import { Text } from "react-native";
import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
  const expensesContext = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expensesContext.expenses}
      expensesPeriod="Total"
      fallbackText="No expenses"
    ></ExpensesOutput>
  );
}

export default AllExpenses;
