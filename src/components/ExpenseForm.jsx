import { useEffect, useState } from "react";
import { validateExpense } from "../utils/validation";
import { todayISO } from "../utils/format";

const empty = () => ({ amount: "", category: "", date: todayISO(), note: "" });

export default function ExpenseForm({ categories, editing, onSubmit, onCancel }) {
  const [form, setForm] = useState(empty());
  const [errors, setErrors] = useState({});

  // Fill the form when an expense is being edited.
  useEffect(() => {
    setForm(editing ? { ...editing, amount: String(editing.amount) } : empty());
    setErrors({});
  }, [editing]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const found = validateExpense(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    onSubmit({ ...form, amount: Number(form.amount), note: form.note.trim() });
    setForm(empty());
  };

  return (
    <form className="card form" onSubmit={submit} noValidate id="expense-form">
      <h2>{editing ? "Edit expense" : "Add expense"}</h2>

      <label>
        Amount (₹) *
        <input name="amount" type="number" min="0" step="0.01" placeholder="500"
               value={form.amount} onChange={change} />
        {errors.amount && <span className="error">{errors.amount}</span>}
      </label>

      <label>
        Category *
        <select name="category" value={form.category} onChange={change}>
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {errors.category && <span className="error">{errors.category}</span>}
      </label>

      <label>
        Date *
        <input name="date" type="date" value={form.date} onChange={change} />
        {errors.date && <span className="error">{errors.date}</span>}
      </label>

      <label>
        Note (optional)
        <input name="note" type="text" placeholder="Lunch" value={form.note} onChange={change} />
        {errors.note && <span className="error">{errors.note}</span>}
      </label>

      <div className="row">
        <button type="submit" className="btn btn-primary">
          {editing ? "Save changes" : "Submit"}
        </button>
        {editing && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}
