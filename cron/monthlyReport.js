const cron = require("node-cron");
const db = require("../config/db");
const report = require("../services/report.service");

cron.schedule("0 9 1 * *"
  , () => {

    console.log("📬 Sending monthly reports...");
    db.all(`SELECT * FROM users 
WHERE verified = 1 AND receive_monthly_report = 1
`, [], (_, users) => {
      users.forEach(report.generateReport);
    });
  });
