import { useState } from "react";
import { validateCategory } from "../utils/validation";
import { COLOR_PALETTE } from "../data/defaults";
import { uid } from "../utils/format";

export default function CategoryManager({ categories, setCategories, usedIds }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  const save = (e) => {
    e.preventDefault();
    const problem = validateCategory(name, categories, editId);
    setError(problem);
    if (problem) return;

    if (editId) {
      setCategories(categories.map((c) => (c.id === editId ? { ...c, name: name.trim() } : c)));
    } else {
      const color = COLOR_PALETTE[categories.length % COLOR_PALETTE.length];
      setCategories([...categories, { id: uid("cat"), name: name.trim(), color }]);
    }
    setName("");
    setEditId(null);
  };

  const startEdit = (c) => { setEditId(c.id); setName(c.name); setError(""); };

  const remove = (c) => {
    if (usedIds.has(c.id)) {
      setError(`"${c.name}" is used by expenses. Delete those expenses first.`);
      return;
    }
    setCategories(categories.filter((x) => x.id !== c.id));
    setError("");
  };

  return (
    <section className="card">
      <h2>Categories</h2>
      <ul className="cat-list">
        {categories.map((c) => (
          <li key={c.id}>
            <span className="chip"><i className="dot" style={{ background: c.color }} />{c.name}</span>
            <span className="actions">
              <button className="icon-btn" onClick={() => startEdit(c)} aria-label={`Edit ${c.name}`}>✏️</button>
              <button className="icon-btn" onClick={() => remove(c)} aria-label={`Delete ${c.name}`}>🗑️</button>
            </span>
          </li>
        ))}
      </ul>

      <form className="row" onSubmit={save}>
        <input value={name} onChange={(e) => setName(e.target.value)}
               placeholder="New category" aria-label="Category name" />
        <button className="btn btn-primary" type="submit">{editId ? "Save" : "+ Add Category"}</button>
        {editId && (
          <button type="button" className="btn btn-ghost" onClick={() => { setEditId(null); setName(""); setError(""); }}>
            Cancel
          </button>
        )}
      </form>
      {error && <span className="error">{error}</span>}
    </section>
  );
}
