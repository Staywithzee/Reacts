import { createContext, useContext, useReducer, useMemo, useEffect } from 'react';

// ── Constants ────────────────────────────────────────────────────────────────
export const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Health', 'Entertainment', 'Other'];

const STORAGE_KEY = 'expense-tracker-data';

// ── Helpers ──────────────────────────────────────────────────────────────────
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// ── Reducer ──────────────────────────────────────────────────────────────────
function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, expenses: [action.payload, ...state.expenses] };

    case 'DELETE':
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.payload),
        // reset filter if deleted item was the last one in filtered view
      };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    default:
      return state;
  }
}

// ── Initial State ────────────────────────────────────────────────────────────
const initialState = {
  expenses: loadFromStorage(),
  filter: 'All',
};

// ── Context ──────────────────────────────────────────────────────────────────
const ExpenseContext = createContext(null);

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.expenses));
  }, [state.expenses]);

  // ── Actions ────────────────────────────────────────────────────────────────
  function addExpense({ name, amount, category }) {
    dispatch({
      type: 'ADD',
      payload: {
        id: crypto.randomUUID(),
        name: name.trim(),
        amount: parseFloat(amount),
        category,
        date: new Date().toISOString(),
      },
    });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function setFilter(category) {
    dispatch({ type: 'SET_FILTER', payload: category });
  }

  // ── Derived Data ───────────────────────────────────────────────────────────
  const filteredExpenses = useMemo(() => {
    if (state.filter === 'All') return state.expenses;
    return state.expenses.filter((e) => e.category === state.filter);
  }, [state.expenses, state.filter]);

  const totalAmount = useMemo(
    () => state.expenses.reduce((sum, e) => sum + e.amount, 0),
    [state.expenses],
  );

  const categoryTotals = useMemo(() => {
    return CATEGORIES.reduce((acc, cat) => {
      acc[cat] = state.expenses
        .filter((e) => e.category === cat)
        .reduce((sum, e) => sum + e.amount, 0);
      return acc;
    }, {});
  }, [state.expenses]);

  const value = {
    expenses: state.expenses,
    filteredExpenses,
    filter: state.filter,
    totalAmount,
    categoryTotals,
    addExpense,
    deleteExpense,
    setFilter,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

// ── Custom Hook ───────────────────────────────────────────────────────────────
export function useExpense() {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error('useExpense must be used inside <ExpenseProvider>');
  return ctx;
}
