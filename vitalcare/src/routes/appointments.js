/**
 * Appointment API routes
 */
const express = require("express");
const router = express.Router();
const appointmentService = require("../services/appointmentService");

router.post("/", async (req, res, next) => {
  try {
    const result = await appointmentService.createAppointment(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) { next(err); }
});

router.get("/", async (req, res, next) => {
  try {
    const result = await appointmentService.listAppointments(req.query);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
});

router.get("/stats", async (req, res, next) => {
  try {
    const stats = await appointmentService.getAppointmentStats();
    res.json({ success: true, data: stats });
  } catch (err) { next(err); }
});

router.get("/lookup/:code", async (req, res, next) => {
  try {
    const result = await appointmentService.lookupAppointment(req.params.code);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await appointmentService.getAppointment(req.params.id);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
});

router.post("/:id/confirm", async (req, res, next) => {
  try {
    const result = await appointmentService.confirmAppointment(req.params.id);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
});

router.post("/:id/cancel", async (req, res, next) => {
  try {
    const result = await appointmentService.cancelAppointment(req.params.id, req.body.reason);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
});

module.exports = router;
