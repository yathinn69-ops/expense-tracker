import { formatINR } from "../utils/format";

// Analytics: totals per category + a donut chart.
export default function Summary({ expenses, categories }) {
  const total = expenses.reduce((s, x) => s + x.amount, 0);

  const rows = categories
    .map((c) => ({ ...c, sum: expenses.filter((x) => x.category === c.id).reduce((s, x) => s + x.amount, 0) }))
    .filter((r) => r.sum > 0);

  let acc = 0;
  const stops = rows.map((r) => {
    const from = (acc / total) * 100;
    acc += r.sum;
    return `${r.color} ${from}% ${(acc / total) * 100}%`;
  });
  const donut = total > 0 ? `conic-gradient(${stops.join(", ")})` : "#e2e8f0";

  return (
    <section className="card summary">
      <h2>Final result</h2>
      <div className="summary-body">
        <div className="donut" style={{ background: donut }} role="img"
             aria-label="Spending by category">
          <div className="donut-hole">
            <small>Total</small>
            <strong>{formatINR(total)}</strong>
          </div>
        </div>
        <ul className="legend">
          {rows.length === 0 && <li className="muted">Add expenses to see your chart.</li>}
          {rows.map((r) => (
            <li key={r.id}>
              <span className="chip"><i className="dot" style={{ background: r.color }} />{r.name}</span>
              <b>{formatINR(r.sum)}</b>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
