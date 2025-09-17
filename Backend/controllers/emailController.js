const { sendEmail } = require('../services/emailService');

exports.sendEmailHandler = async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    await sendEmail({ to, subject, text: message });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email sending failed:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};