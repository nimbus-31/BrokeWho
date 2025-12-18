const db = require("../config/db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mailer = require("../services/mail.service");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/jwt");

/* REGISTER */
exports.register = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Missing fields" });

  const hash = bcrypt.hashSync(password, 10);
  const token = crypto.randomBytes(32).toString("hex");

  db.run(
    `
    INSERT INTO users (email, password, verification_token, verified)
    VALUES (?, ?, ?, 0)
    `,
    [email, hash, token],
    async err => {
      if (err) return res.status(400).json({ message: "User already exists" });

      await mailer.sendMail(
        email,
        "Verify your BrokeWho account",
        `Click to verify:
http://localhost:3001/api/auth/verify/${token}`
      );

      res.json({ message: "Verification email sent" });
    }
  );
};

/* LOGIN */
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.verified) {
      return res.status(403).json({ message: "Verify your email first" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ token });
  });
};

/* VERIFY EMAIL */
exports.verifyEmail = (req, res) => {
  db.run(
    `
    UPDATE users
    SET verified = 1, verification_token = NULL
    WHERE verification_token = ?
    `,
    [req.params.token],
    function () {
      res.send("Email verified! You may now log in.");
    }
  );
};
