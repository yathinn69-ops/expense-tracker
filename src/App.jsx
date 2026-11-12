import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import CategoryManager from "./components/CategoryManager";
import Summary from "./components/Summary";
import useLocalStorage from "./hooks/useLocalStorage";
import { DEFAULT_CATEGORIES, STORAGE_KEYS } from "./data/defaults";
import { uid } from "./utils/format";

export default function App() {
  // State management: useState (via useLocalStorage) keeps current data in the app
  // and Data Persistence saves it in the browser.
  const [expenses, setExpenses] = useLocalStorage(STORAGE_KEYS.expenses, []);
  const [categories, setCategories] = useLocalStorage(STORAGE_KEYS.categories, DEFAULT_CATEGORIES);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState("");

  // Show "Your data is saved!" briefly after any change.
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const addOrUpdate = (data) => {
    if (editing) {
      setExpenses(expenses.map((x) => (x.id === editing.id ? { ...x, ...data } : x)));
      setEditing(null);
    } else {
      setExpenses([{ ...data, id: uid("exp") }, ...expenses]);
    }
    setToast("Your data is saved!");
  };

  const remove = (id) => {
    setExpenses(expenses.filter((x) => x.id !== id));
    if (editing?.id === id) setEditing(null);
    setToast("Expense deleted.");
  };

  const visible = useMemo(() => {
    const list = filter === "all" ? expenses : expenses.filter((x) => x.category === filter);
    return [...list].sort((a, b) => b.date.localeCompare(a.date));
  }, [expenses, filter]);

  const usedIds = useMemo(() => new Set(expenses.map((x) => x.category)), [expenses]);

  const focusForm = () => document.getElementById("expense-form")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <Header onAdd={focusForm} />
      <main className="layout">
        <div className="col">
          <ExpenseForm categories={categories} editing={editing}
                       onSubmit={addOrUpdate} onCancel={() => setEditing(null)} />
          <CategoryManager categories={categories} setCategories={setCategories} usedIds={usedIds} />
        </div>
        <div className="col">
          <Summary expenses={expenses} categories={categories} />
          <ExpenseList expenses={visible} categories={categories} filter={filter} setFilter={setFilter}
                       onEdit={(x) => { setEditing(x); focusForm(); }} onDelete={remove} />
        </div>
      </main>
      {toast && <div className="toast" role="status">✓ {toast}</div>}
    </>
  );
}
