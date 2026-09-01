/**
 * Simple auth / session routes (demo)
 */
const express = require("express");
const router = express.Router();
const { isValidEmail } = require("../utils/validators");
const { AppError } = require("../utils/errorHandlers");

// Demo-only: no real password hashing for this prototype
const demoUsers = [
  { id: "u1", email: "admin@vitalcare.health", role: "admin", name: "Clinic Admin" },
  { id: "u2", email: "doctor@vitalcare.health", role: "doctor", name: "Dr. Demo" },
  { id: "u3", email: "patient@example.com", role: "patient", name: "Demo Patient" }
];

router.post("/login", (req, res, next) => {
  try {
    const { email } = req.body;
    if (!isValidEmail(email)) throw new AppError("Valid email required", 400);
    const user = demoUsers.find(u => u.email === email.toLowerCase());
    if (!user) throw new AppError("Invalid credentials", 401);
    // Return a demo token (not secure - prototype only)
    res.json({
      success: true,
      data: {
        token: "demo-token-" + user.id,
        user: { id: user.id, email: user.email, role: user.role, name: user.name }
      }
    });
  } catch (err) { next(err); }
});

router.get("/me", (req, res) => {
  const auth = req.headers.authorization || "";
  if (!auth.startsWith("Bearer demo-token-")) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  const id = auth.replace("Bearer demo-token-", "");
  const user = demoUsers.find(u => u.id === id);
  if (!user) return res.status(401).json({ success: false, error: "Unauthorized" });
  res.json({ success: true, data: user });
});

module.exports = router;
