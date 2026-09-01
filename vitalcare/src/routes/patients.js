/**
 * Patient API routes
 */
const express = require("express");
const router = express.Router();
const patientService = require("../services/patientService");

router.post("/register", async (req, res, next) => {
  try {
    const result = await patientService.registerPatient(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) { next(err); }
});

router.get("/", async (req, res, next) => {
  try {
    const result = await patientService.listPatients(req.query);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await patientService.getPatient(req.params.id);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const result = await patientService.updatePatient(req.params.id, req.body);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
});

module.exports = router;
