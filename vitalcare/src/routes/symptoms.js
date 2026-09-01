/**
 * Symptom Checker & Clinical Triage API Routes
 */
const express = require("express");
const router = express.Router();
const { analyzeSymptoms, symptomKnowledgeBase } = require("../services/symptomCheckerService");

router.get("/list", (req, res) => {
  const list = Object.keys(symptomKnowledgeBase).map(key => ({
    key,
    name: symptomKnowledgeBase[key].name,
    department: symptomKnowledgeBase[key].department
  }));
  res.json({ success: true, data: list });
});

router.post("/check", (req, res) => {
  const { symptoms, durationDays, severity } = req.body;
  const analysis = analyzeSymptoms(symptoms, durationDays, severity);
  res.json({ success: true, data: analysis });
});

module.exports = router;
