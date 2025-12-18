const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt");

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
