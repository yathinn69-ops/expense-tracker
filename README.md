# Expense Tracker (React + Vite)

Built layer by layer, following the "Application Architecture" diagram.

## Run in VS Code
1. Install Node.js (v18+) from https://nodejs.org
2. In VS Code: **File → Open Folder…** → choose `expense-tracker`
3. Open the terminal (**Ctrl + `**) and run:
   ```
   npm install
   npm run dev
   ```
4. Open http://localhost:5173 (it opens automatically).

> Tip: VS Code may ask to "Allow automatic tasks". Choose Allow and it will install and start the app every time you open the folder.

## Folder structure
```
expense-tracker/
├── .vscode/              VS Code settings (auto-run task, Chrome launch)
├── public/               favicon
├── src/
│   ├── components/       UI layer
│   │   ├── Header.jsx          App shell + "+ Add Expense"
│   │   ├── ExpenseForm.jsx     Add / edit entry form
│   │   ├── ExpenseList.jsx     Display list + filter
│   │   ├── CategoryManager.jsx Add / edit / delete categories
│   │   └── Summary.jsx         Analytics: totals + donut chart
│   ├── hooks/
│   │   └── useLocalStorage.js  Data persistence (useState + LocalStorage)
│   ├── utils/
│   │   ├── validation.js       Validation (checks correct input)
│   │   └── format.js           ₹ formatting, dates, ids
│   ├── data/defaults.js        Data model + default categories
│   ├── styles/index.css
│   ├── App.jsx                 Application logic + state management
│   └── main.jsx                Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Mapping to the diagram
| Step | Where |
|------|-------|
| 1 Define data model | `data/defaults.js` – `{ id, amount, category, date, note }` |
| 2 Create app shell | `Header.jsx`, `App.jsx` |
| 3 Add entry form | `ExpenseForm.jsx` + `utils/validation.js` |
| 4 Display list | `ExpenseList.jsx` |
| 5 Manage categories | `CategoryManager.jsx` |
| 6 Persistence | `hooks/useLocalStorage.js` |
