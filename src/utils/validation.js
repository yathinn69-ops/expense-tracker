// Validation: checks that the user's input is correct before it is saved.
export function validateExpense({ amount, category, date, note }) {
  const errors = {};
  const value = Number(amount);

  if (amount === "" || Number.isNaN(value)) errors.amount = "Enter an amount.";
  else if (value <= 0) errors.amount = "Amount must be greater than 0.";
  else if (value > 10000000) errors.amount = "Amount is too large.";

  if (!category) errors.category = "Choose a category.";
  if (!date) errors.date = "Pick a date.";
  if (note && note.length > 100) errors.note = "Keep the note under 100 characters.";

  return errors;
}

export function validateCategory(name, categories, ignoreId = null) {
  const clean = name.trim();
  if (!clean) return "Enter a category name.";
  if (clean.length > 20) return "Keep the name under 20 characters.";
  const taken = categories.some(
    (c) => c.id !== ignoreId && c.name.toLowerCase() === clean.toLowerCase()
  );
  return taken ? "That category already exists." : "";
}
