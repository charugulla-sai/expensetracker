import { useState, useReducer } from 'react';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import ExpenseInfo from './components/ExpenseInfo/ExpenseInfo';
import ExpenseList from './components/ExpenseList/ExpenseList';
import './App.css';

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'ADD_EXPENSE': {
      return {
        expenses: [payload.expense, ...state.expenses],
      };
    }
    case 'REMOVE_EXPENSE': {
      return {
        expenses: state.expenses.filter((expense) => expense.id !== payload.id),
      };
    }
    case 'UPDATE_EXPENSE': {
      const duplicateExpArray = state.expenses;
      duplicateExpArray[action.expIndex] = action.exp;
      return {
        expenses: duplicateExpArray,
      };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { expenses: [] });
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);

  const addExpense = (expense) => {
    dispatch({ type: 'ADD_EXPENSE', payload: { expense } });
  };

  const deleteExpense = (id) => {
    dispatch({ type: 'REMOVE_EXPENSE', payload: { id } });
  };

  const updateExpenses = (expId, updatedExp) => {
    let expIndex = null;
    state.expenses.map((exp, index) => {
      if (exp.id == expId) {
        expIndex = index;
        return;
      }
    });

    dispatch({
      type: 'UPDATE_EXPENSE',
      expIndex: expIndex,
      exp: updatedExp,
    });
  };

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm
          addExpense={addExpense}
          expenseToUpdate={expenseToUpdate}
          updateExpenses={updateExpenses}
          removeExpenseToUpdate={setExpenseToUpdate}
        />
        <div className="expenseContainer">
          <ExpenseInfo expenses={state.expenses} />
          <ExpenseList
            expenses={state.expenses}
            deleteExpense={deleteExpense}
            changeExpenseToUpdate={setExpenseToUpdate}
          />
        </div>
      </div>
    </>
  );
}

export default App;
