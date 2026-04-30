import { useExpense, CATEGORIES } from '../context/ExpenseContext';

const CATEGORY_ICONS = {
  Food: '🍔', Transport: '🚗', Shopping: '🛍️',
  Health: '💊', Entertainment: '🎬', Other: '📦',
};

const CATEGORY_COLORS = {
  Food: '#f97316', Transport: '#3b82f6', Shopping: '#ec4899',
  Health: '#22c55e', Entertainment: '#a855f7', Other: '#6b7280',
};

function fmt(n) {
  return n.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export default function ExpenseList() {
  const { filteredExpenses, expenses, filter, setFilter, deleteExpense } = useExpense();

  // แสดงเฉพาะหมวดที่มีรายการจริง
  const activeCategories = CATEGORIES.filter(cat =>
    expenses.some(e => e.category === cat)
  );
  const allFilters = ['All', ...activeCategories];

  return (
    <>
      {/* ── Toolbar ── */}
      <div className="list-toolbar">
        <div className="list-filters">
          {allFilters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-btn ${filter === f ? 'filter-btn--active' : ''}`}
            >
              {f !== 'All' && CATEGORY_ICONS[f]} {f}
            </button>
          ))}
        </div>
        <span className="list-count">{filteredExpenses.length} / {expenses.length}</span>
      </div>

      {/* ── Items ── */}
      {filteredExpenses.length === 0 ? (
        <p className="list-empty">No transactions found.</p>
      ) : (
        <ul className="expense-list">
          {filteredExpenses.map(expense => (
            <li key={expense.id} className="expense-item">
              <span
                className="expense-icon"
                style={{
                  background: CATEGORY_COLORS[expense.category] + '1a',
                  color: CATEGORY_COLORS[expense.category],
                }}
              >
                {CATEGORY_ICONS[expense.category]}
              </span>

              <div className="expense-details">
                <p className="expense-name">{expense.name}</p>
                <p className="expense-meta">{expense.category} · {formatDate(expense.date)}</p>
              </div>

              <span className="expense-amount">฿{fmt(expense.amount)}</span>

              <button
                onClick={() => deleteExpense(expense.id)}
                className="btn-delete"
                aria-label="Delete"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
