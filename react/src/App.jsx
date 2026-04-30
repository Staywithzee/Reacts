import { ExpenseProvider } from './context/ExpenseContext';
import ExpenseSummary from './components/ExpenseSummary';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css';

function App() {
  return (
    <ExpenseProvider>
      <div className="expense-app">

        <header className="expense-header">
          <h1>Expense Tracker</h1>
          <p>Track your spending, stay in control</p>
        </header>

        <main className="expense-main">

          {/* ── Left panel: Summary + Form ── */}
          <aside className="panel-left">
            <ExpenseSummary />
            <AddExpenseForm />
          </aside>

          {/* ── Right panel: List ── */}
          <section className="panel-right">
            <ExpenseList />
          </section>

        </main>
      </div>
    </ExpenseProvider>
  );
}

export default App;
