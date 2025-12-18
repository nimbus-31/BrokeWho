const db = require("../config/db");
const chart = require("./chart.service");
const mail = require("./mail.service");

exports.generateReport = user => {
  db.all(
    `
    SELECT category, SUM(amount) as total
    FROM expenses
    WHERE user_id = ?
    GROUP BY category
    `,
    [user.id],
    async (_, rows) => {
      if (!rows.length) return;

      const path = `charts/${user.email}.png`;
      await chart.generateChart(rows, path);

      const summary = rows
        .map(r => `${r.category}: ₹${r.total}`)
        .join("\n");

      await mail.sendMail(
        user.email,
        "Your Monthly BrokeWho Report 💸",
        summary,
        path
      );
    }
  );
};
