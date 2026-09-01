/**
 * Pharmacy API Routes
 */
const express = require("express");
const router = express.Router();
const { PharmacyStore } = require("../models/Pharmacy");

router.get("/medicines", (req, res) => {
  const list = PharmacyStore.listMedicines(req.query);
  res.json({ success: true, data: list, total: list.length });
});

router.get("/categories", (req, res) => {
  const categories = PharmacyStore.getCategories();
  res.json({ success: true, data: categories });
});

router.get("/medicines/:id", (req, res) => {
  const med = PharmacyStore.getMedicineById(req.params.id);
  if (!med) return res.status(404).json({ success: false, error: "Medicine not found" });
  res.json({ success: true, data: med });
});

router.post("/order", (req, res) => {
  try {
    const order = PharmacyStore.createOrder(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get("/order/:code", (req, res) => {
  const order = PharmacyStore.getOrder(req.params.code);
  if (!order) return res.status(404).json({ success: false, error: "Pharmacy order not found" });
  res.json({ success: true, data: order });
});

module.exports = router;
