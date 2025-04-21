import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

//state and action provided by React
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      //{...action.payload} to create new object
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const index = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const targetExpense = state[index];
      const updatedExpense = { ...targetExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[index] = updatedExpense;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData }); //sent as action to expensesReducer
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "Asus TUF 3060 TI",
    amount: 89.2,
    date: new Date("2021-12-22"),
  },
  {
    id: "e3",
    description: "Daiso",
    amount: 10.14,
    date: new Date("2022-03-04"),
  },
  {
    id: "e4",
    description: "Daiso",
    amount: 10.14,
    date: new Date("2022-03-04"),
  },
  {
    id: "e5",
    description: "Daiso",
    amount: 10.14,
    date: new Date("2022-03-04"),
  },
  {
    id: "e6",
    description: "Daiso",
    amount: 10.14,
    date: new Date("2022-03-04"),
  },
  {
    id: "e7",
    description: "Daiso",
    amount: 10.14,
    date: new Date("2022-03-04"),
  },
  {
    id: "e8",
    description: "Daiso",
    amount: 10.14,
    date: new Date("2022-06-08"),
  },
];

export default ExpensesContextProvider;
