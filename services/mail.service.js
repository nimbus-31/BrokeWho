const transporter = require("../config/mail");

exports.sendMail = async (to, subject, text, attachmentPath) => {
  await transporter.sendMail({
    to,
    subject,
    text,
    attachments: attachmentPath ? [{ path: attachmentPath }] : []
  });
};
