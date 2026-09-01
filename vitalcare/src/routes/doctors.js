/**
 * Doctor directory API routes
 */
const express = require("express");
const router = express.Router();
const doctorService = require("../services/doctorService");

router.get("/", async (req, res, next) => {
  try {
    const result = await doctorService.searchDoctors(req.query);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
});

router.get("/specialties", async (req, res, next) => {
  try {
    const data = await doctorService.getSpecialties();
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

router.get("/cities", async (req, res, next) => {
  try {
    const data = await doctorService.getCities();
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

router.get("/stats", async (req, res, next) => {
  try {
    const data = await doctorService.getDoctorStats();
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = await doctorService.getDoctorById(req.params.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

module.exports = router;
