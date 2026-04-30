import { useState } from 'react';
import { useExpense, CATEGORIES } from '../context/ExpenseContext';

const EMPTY = { name: '', amount: '', category: 'Food' };

function validate({ name, amount }) {
  if (!name.trim()) return 'Item name is required.';
  if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return 'Enter a valid amount.';
  return null;
}

export default function AddExpenseForm() {
  const { addExpense } = useExpense();
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate(form);
    if (err) { setError(err); return; }
    addExpense(form);
    setForm(EMPTY);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  }

  return (
    <div className="section" style={{ flex: 1 }}>
      <p className="section-label">Add transaction</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-fields">

          <div className="form-group">
            <label>Item name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Lunch, Grab, Netflix…"
              autoComplete="off"
            />
          </div>

          <div className="form-inline">
            <div className="form-group">
              <label>Amount (฿)</label>
              <input
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

        </div>

        {error   && <p className="form-feedback form-feedback--error">{error}</p>}
        {success && <p className="form-feedback form-feedback--success">Added successfully.</p>}

        <button type="submit" className="btn-add">Add</button>
      </form>
    </div>
  );
}
