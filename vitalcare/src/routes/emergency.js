/**
 * Emergency SOS & Ambulance Dispatch API Routes
 */
const express = require("express");
const router = express.Router();
const { EmergencyStore } = require("../models/Emergency");

router.post("/sos", (req, res) => {
  try {
    const dispatch = EmergencyStore.createSOSDispatch(req.body);
    res.status(201).json({ success: true, data: dispatch });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get("/dispatch/:code", (req, res) => {
  const dispatch = EmergencyStore.getDispatch(req.params.code);
  if (!dispatch) return res.status(404).json({ success: false, error: "Emergency dispatch not found" });
  res.json({ success: true, data: dispatch });
});

router.get("/recent", (req, res) => {
  const recent = EmergencyStore.getRecentDispatches();
  res.json({ success: true, data: recent });
});

module.exports = router;
