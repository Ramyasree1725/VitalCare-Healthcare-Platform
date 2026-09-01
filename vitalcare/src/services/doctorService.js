/**
 * Doctor directory business logic
 */
const { DoctorStore } = require("../models/Doctor");
const { validateDoctorQuery } = require("../utils/validators");
const { AppError } = require("../utils/errorHandlers");

async function searchDoctors(query) {
  const filters = validateDoctorQuery(query);
  return DoctorStore.list(filters);
}

async function getDoctorById(id) {
  const doctor = DoctorStore.findById(id);
  if (!doctor) throw new AppError("Doctor not found", 404);
  return doctor;
}

async function getSpecialties() {
  return DoctorStore.getSpecialties();
}

async function getCities() {
  return DoctorStore.getCities();
}

async function getDoctorStats() {
  return DoctorStore.getStats();
}

module.exports = {
  searchDoctors,
  getDoctorById,
  getSpecialties,
  getCities,
  getDoctorStats
};
