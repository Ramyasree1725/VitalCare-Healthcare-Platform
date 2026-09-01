/**
 * Diagnostic Laboratory API Routes
 */
const express = require("express");
const router = express.Router();
const { LabStore } = require("../models/LabReport");

router.get("/tests", (req, res) => {
  const tests = LabStore.listTests();
  res.json({ success: true, data: tests });
});

router.get("/tests/:id", (req, res) => {
  const test = LabStore.getTestById(req.params.id);
  if (!test) return res.status(404).json({ success: false, error: "Test not found" });
  res.json({ success: true, data: test });
});

router.post("/book", (req, res) => {
  try {
    const booking = LabStore.bookTest(req.body);
    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get("/reports/:id", (req, res) => {
  const report = LabStore.getReport(req.params.id);
  if (!report) return res.status(404).json({ success: false, error: "Diagnostic report not found. Try sample ID LAB-882104 or LAB-774912" });
  res.json({ success: true, data: report });
});

router.get("/reports", (req, res) => {
  const reports = LabStore.getAllReports();
  res.json({ success: true, data: reports });
});

module.exports = router;
