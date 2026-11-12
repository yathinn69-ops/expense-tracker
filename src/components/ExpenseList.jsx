import { formatDate, formatINR } from "../utils/format";

export default function ExpenseList({ expenses, categories, filter, setFilter, onEdit, onDelete }) {
  const byId = Object.fromEntries(categories.map((c) => [c.id, c]));

  return (
    <section className="card">
      <div className="list-head">
        <h2>Expenses</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by category">
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {expenses.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">🧾</div>
          <p>No expenses yet. Add your first one using the form.</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Amount</th><th>Category</th><th>Date</th><th>Note</th><th aria-label="Actions"></th></tr>
            </thead>
            <tbody>
              {expenses.map((x) => {
                const cat = byId[x.category];
                return (
                  <tr key={x.id}>
                    <td className="amount">{formatINR(x.amount)}</td>
                    <td>
                      <span className="chip">
                        <i className="dot" style={{ background: cat?.color || "#94a3b8" }} />
                        {cat?.name || "Uncategorised"}
                      </span>
                    </td>
                    <td>{formatDate(x.date)}</td>
                    <td className="muted">{x.note || "–"}</td>
                    <td className="actions">
                      <button className="icon-btn" onClick={() => onEdit(x)} aria-label="Edit expense">✏️</button>
                      <button className="icon-btn" onClick={() => onDelete(x.id)} aria-label="Delete expense">🗑️</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
