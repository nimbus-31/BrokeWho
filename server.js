const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();

app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/expenses", require("./routes/expense.routes"));

require("./cron/monthlyReport"); // cron boot

// Serve frontend
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Global error handler (important)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`💸 BrokeWho running on http://localhost:${PORT}`);
});
