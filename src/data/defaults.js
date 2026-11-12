// Default categories shown the first time the app opens.
export const DEFAULT_CATEGORIES = [
  { id: "cat-food", name: "Food", color: "#16a34a" },
  { id: "cat-transport", name: "Transport", color: "#2563eb" },
  { id: "cat-shopping", name: "Shopping", color: "#7c3aed" },
  { id: "cat-bills", name: "Bills", color: "#ea580c" },
];

// Colors given to categories the user adds.
export const COLOR_PALETTE = ["#0891b2", "#db2777", "#ca8a04", "#4f46e5", "#65a30d", "#dc2626", "#0d9488"];

export const STORAGE_KEYS = {
  expenses: "expense-tracker:expenses",
  categories: "expense-tracker:categories",
};
