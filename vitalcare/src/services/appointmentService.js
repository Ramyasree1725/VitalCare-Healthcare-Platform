/**
 * Appointment business logic layer
 */
const { AppointmentStore } = require("../models/Appointment");
const { DoctorStore } = require("../models/Doctor");
const { validateAppointmentPayload, sanitizeString } = require("../utils/validators");
const { AppError } = require("../utils/errorHandlers");
const { info } = require("../utils/logger");

async function createAppointment(payload) {
  const validation = validateAppointmentPayload(payload);
  if (!validation.valid) {
    throw new AppError(validation.errors.join("; "), 400);
  }

  if (payload.doctorId) {
    const doctor = DoctorStore.findById(payload.doctorId);
    if (!doctor) throw new AppError("Selected doctor not found", 404);
    if (!doctor.available) throw new AppError("Selected doctor is not currently available", 400);
  }

  const appointment = AppointmentStore.create({
    patientName: sanitizeString(payload.patientName, 100),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone.trim(),
    department: payload.department,
    doctorId: payload.doctorId || null,
    preferredDate: payload.preferredDate,
    preferredTime: payload.preferredTime,
    notes: sanitizeString(payload.notes || "", 1000)
  });

  info("Appointment created", { id: appointment.id, department: appointment.department });
  return appointment.toJSON();
}

async function getAppointment(id) {
  const appt = AppointmentStore.findById(id);
  if (!appt) throw new AppError("Appointment not found", 404);
  return appt.toJSON();
}

async function lookupAppointment(code) {
  const appt = AppointmentStore.findByConfirmationCode(code.trim().toUpperCase());
  if (!appt) throw new AppError("Appointment with confirmation code '" + code + "' not found", 404);
  return appt.toJSON();
}

async function confirmAppointment(id) {
  const appt = AppointmentStore.findById(id);
  if (!appt) throw new AppError("Appointment not found", 404);
  appt.confirm();
  info("Appointment confirmed", { id });
  return appt.toJSON();
}

async function cancelAppointment(id, reason) {
  const appt = AppointmentStore.findById(id);
  if (!appt) throw new AppError("Appointment not found", 404);
  appt.cancel(reason);
  info("Appointment cancelled", { id, reason });
  return appt.toJSON();
}

async function listAppointments(filters) {
  return AppointmentStore.list(filters);
}

async function getAppointmentStats() {
  return AppointmentStore.getStats();
}

module.exports = {
  createAppointment,
  getAppointment,
  lookupAppointment,
  confirmAppointment,
  cancelAppointment,
  listAppointments,
  getAppointmentStats
};
