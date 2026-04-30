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

export default function ExpenseSummary() {
  const { expenses, totalAmount, categoryTotals } = useExpense();

  return (
    <>
      {/* ── Total ── */}
      <div className="section">
        <p className="section-label">Overview</p>
        <div className="summary-hero">
          <p className="summary-hero-label">Total spent</p>
          <h2 className="summary-hero-amount">฿{fmt(totalAmount)}</h2>
          <p className="summary-hero-count">{expenses.length} transaction{expenses.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* ── Breakdown ── */}
      <div className="section">
        <p className="section-label">By category</p>
        {totalAmount === 0 ? (
          <p className="summary-empty">No expenses yet.</p>
        ) : (
          <div className="summary-breakdown">
            {CATEGORIES.map((cat) => {
              const amount = categoryTotals[cat];
              if (!amount) return null;
              const pct = (amount / totalAmount) * 100;
              return (
                <div key={cat} className="summary-row">
                  <span className="summary-cat-icon">{CATEGORY_ICONS[cat]}</span>
                  <div className="summary-cat-body">
                    <div className="summary-cat-name">
                      {cat}
                      <span>฿{fmt(amount)}</span>
                    </div>
                    <div className="summary-bar-wrap">
                      <div
                        className="summary-bar"
                        style={{ width: `${pct}%`, background: CATEGORY_COLORS[cat] }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
