/**
 * Medical services catalog routes
 */
const express = require("express");
const router = express.Router();
const config = require("../utils/config");

const serviceCatalog = [
  { id: "svc-01", name: "Cardiology Consultation", department: "Cardiology", durationMin: 45, priceFrom: 150 },
  { id: "svc-02", name: "ECG / EKG", department: "Cardiology", durationMin: 20, priceFrom: 80 },
  { id: "svc-03", name: "Pediatric Check-up", department: "Pediatrics", durationMin: 30, priceFrom: 100 },
  { id: "svc-04", name: "Vaccination", department: "Pediatrics", durationMin: 15, priceFrom: 40 },
  { id: "svc-05", name: "Orthopedic Evaluation", department: "Orthopedics", durationMin: 40, priceFrom: 160 },
  { id: "svc-06", name: "Physical Therapy Session", department: "Orthopedics", durationMin: 50, priceFrom: 90 },
  { id: "svc-07", name: "Neurology Consultation", department: "Neurology", durationMin: 45, priceFrom: 180 },
  { id: "svc-08", name: "EEG", department: "Neurology", durationMin: 60, priceFrom: 200 },
  { id: "svc-09", name: "Dermatology Visit", department: "Dermatology", durationMin: 25, priceFrom: 120 },
  { id: "svc-10", name: "Skin Biopsy", department: "Dermatology", durationMin: 30, priceFrom: 250 },
  { id: "svc-11", name: "General Consultation", department: "Family Medicine", durationMin: 30, priceFrom: 90 },
  { id: "svc-12", name: "Annual Physical", department: "Internal Medicine", durationMin: 45, priceFrom: 140 },
  { id: "svc-13", name: "Lab Panel - Basic", department: "Laboratory", durationMin: 15, priceFrom: 60 },
  { id: "svc-14", name: "Lab Panel - Comprehensive", department: "Laboratory", durationMin: 20, priceFrom: 120 },
  { id: "svc-15", name: "Mental Health Intake", department: "Psychiatry", durationMin: 60, priceFrom: 170 }
];

router.get("/", (req, res) => {
  let data = [...serviceCatalog];
  if (req.query.department) {
    const d = req.query.department.toLowerCase();
    data = data.filter(s => s.department.toLowerCase().includes(d));
  }
  res.json({ success: true, data, total: data.length });
});

router.get("/departments", (req, res) => {
  res.json({ success: true, data: config.departments });
});

router.get("/:id", (req, res) => {
  const svc = serviceCatalog.find(s => s.id === req.params.id);
  if (!svc) return res.status(404).json({ success: false, error: "Service not found" });
  res.json({ success: true, data: svc });
});

module.exports = router;
