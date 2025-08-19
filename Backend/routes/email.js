const express = require('express');
const { sendEmail } = require('../services/emailService');

const router = express.Router();

router.post('/', async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    await sendEmail({ to, subject, text: message });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});
                    
module.exports = router;