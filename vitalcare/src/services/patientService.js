/**
 * Patient management business logic
 */
const { PatientStore } = require("../models/Patient");
const { validatePatientRegistration, sanitizeString } = require("../utils/validators");
const { AppError } = require("../utils/errorHandlers");
const { info } = require("../utils/logger");

async function registerPatient(payload) {
  const validation = validatePatientRegistration(payload);
  if (!validation.valid) {
    throw new AppError(validation.errors.join("; "), 400);
  }
  const patient = PatientStore.create({
    firstName: sanitizeString(payload.firstName, 50),
    lastName: sanitizeString(payload.lastName, 50),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone.trim(),
    dateOfBirth: payload.dateOfBirth || null,
    gender: payload.gender || null,
    address: payload.address || {},
    insuranceProvider: payload.insuranceProvider || null,
    insuranceId: payload.insuranceId || null,
    emergencyContact: payload.emergencyContact || null
  });
  info("Patient registered", { id: patient.id });
  return patient.toJSON();
}

async function getPatient(id) {
  const patient = PatientStore.findById(id);
  if (!patient) throw new AppError("Patient not found", 404);
  return patient.toJSON();
}

async function updatePatient(id, updates) {
  const patient = PatientStore.update(id, updates);
  if (!patient) throw new AppError("Patient not found", 404);
  return patient.toJSON();
}

async function listPatients(filters) {
  return PatientStore.list(filters);
}

module.exports = {
  registerPatient,
  getPatient,
  updatePatient,
  listPatients
};
