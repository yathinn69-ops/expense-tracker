export default function Header({ onAdd }) {
  return (
    <header className="header">
      <h1>
        <span className="logo">₹</span> Expense Tracker
      </h1>
      <button className="btn btn-light" onClick={onAdd}>
        + Add Expense
      </button>
    </header>
  );
}
