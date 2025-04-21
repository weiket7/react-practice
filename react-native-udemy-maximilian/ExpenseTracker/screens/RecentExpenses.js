import { useContext } from "react/";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDay } from "../utils/date";

function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDay(today, 7);
    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses last 7 days"
    ></ExpensesOutput>
  );
}

export default RecentExpenses;
