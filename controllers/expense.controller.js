const db = require("../config/db");

/* ADD */
exports.addExpense = (req, res) => {
  const { category, amount } = req.body;

  if (!category || amount <= 0) {
    return res.status(400).json({ message: "Invalid input" });
  }

  db.run(
    `INSERT INTO expenses (user_id, category, amount) VALUES (?, ?, ?)`,
    [req.user.id, category, amount],
    err => {
      if (err) return res.status(500).json({ message: "DB error" });
      res.status(201).json({ message: "Expense added" });
    }
  );
};

/* LIST */
exports.getExpenses = (req, res) => {
  db.all(
    `SELECT * FROM expenses WHERE user_id = ? ORDER BY created_at DESC`,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "DB error" });
      res.json(rows);
    }
  );
};

/* SUMMARY */
exports.getSummary = (req, res) => {
  db.all(
    `
    SELECT category, SUM(amount) as total
    FROM expenses
    WHERE user_id = ?
    GROUP BY category
    `,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "DB error" });
      res.json(rows);
    }
  );
};

/* DELETE */
exports.deleteExpense = (req, res) => {
  db.run(
    `DELETE FROM expenses WHERE id = ? AND user_id = ?`,
    [req.params.id, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ message: "Delete failed" });
      if (!this.changes)
        return res.status(404).json({ message: "Not found" });

      res.json({ message: "Deleted" });
    }
  );
};
