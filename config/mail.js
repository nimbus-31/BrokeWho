const nodemailer = require("nodemailer");
module.exports = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ni31niharika.singh@gmail.com",
    pass: "atya asni uffu ebrr"
  }
});