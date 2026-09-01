/**
 * Contact / inquiry routes
 */
const express = require("express");
const router = express.Router();
const { isValidEmail, isValidName, sanitizeString } = require("../utils/validators");
const { AppError } = require("../utils/errorHandlers");
const { info } = require("../utils/logger");

const inquiries = [];

router.post("/", (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!isValidName(name)) throw new AppError("Valid name required", 400);
    if (!isValidEmail(email)) throw new AppError("Valid email required", 400);
    if (!message || message.trim().length < 10) throw new AppError("Message too short", 400);

    const inquiry = {
      id: "inq-" + Date.now(),
      name: sanitizeString(name, 100),
      email: email.trim().toLowerCase(),
      subject: sanitizeString(subject || "General Inquiry", 200),
      message: sanitizeString(message, 2000),
      createdAt: new Date().toISOString(),
      status: "new"
    };
    inquiries.push(inquiry);
    info("Contact inquiry received", { id: inquiry.id });
    res.status(201).json({
      success: true,
      message: "Thank you. We will respond within 1 business day.",
      data: { id: inquiry.id }
    });
  } catch (err) { next(err); }
});

router.get("/", (req, res) => {
  res.json({ success: true, data: inquiries, total: inquiries.length });
});

module.exports = router;
