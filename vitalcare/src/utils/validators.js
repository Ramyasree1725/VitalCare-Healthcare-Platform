/**
 * Input validation utilities for healthcare data
 */

function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

function isValidPhone(phone) {
  if (!phone || typeof phone !== "string") return false;
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  return /^\+?[0-9]{10,15}$/.test(cleaned);
}

function isValidDate(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}

function isFutureDate(dateStr) {
  if (!isValidDate(dateStr)) return false;
  const d = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d >= today;
}

function isValidName(name) {
  if (!name || typeof name !== "string") return false;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 100 && /^[a-zA-Z\s\-\.\']+$/.test(trimmed);
}

function sanitizeString(str, maxLen = 500) {
  if (typeof str !== "string") return "";
  return str.trim().slice(0, maxLen).replace(/[<>]/g, "");
}

function validateAppointmentPayload(body) {
  const errors = [];
  if (!isValidName(body.patientName)) errors.push("Invalid or missing patient name");
  if (!isValidEmail(body.email)) errors.push("Invalid or missing email");
  if (!isValidPhone(body.phone)) errors.push("Invalid or missing phone");
  if (!body.department) errors.push("Department is required");
  if (!isFutureDate(body.preferredDate)) errors.push("Preferred date must be today or in the future");
  if (!body.preferredTime) errors.push("Preferred time is required");
  return { valid: errors.length === 0, errors };
}

function validateDoctorQuery(query) {
  const allowed = ["specialty", "city", "name", "available", "page", "limit"];
  const filtered = {};
  for (const key of allowed) {
    if (query[key] !== undefined) filtered[key] = query[key];
  }
  filtered.page = Math.max(1, parseInt(filtered.page, 10) || 1);
  filtered.limit = Math.min(50, Math.max(1, parseInt(filtered.limit, 10) || 20));
  return filtered;
}

function validatePatientRegistration(body) {
  const errors = [];
  if (!isValidName(body.firstName)) errors.push("Invalid first name");
  if (!isValidName(body.lastName)) errors.push("Invalid last name");
  if (!isValidEmail(body.email)) errors.push("Invalid email");
  if (!isValidPhone(body.phone)) errors.push("Invalid phone");
  if (body.dateOfBirth && !isValidDate(body.dateOfBirth)) errors.push("Invalid date of birth");
  return { valid: errors.length === 0, errors };
}

module.exports = {
  isValidEmail,
  isValidPhone,
  isValidDate,
  isFutureDate,
  isValidName,
  sanitizeString,
  validateAppointmentPayload,
  validateDoctorQuery,
  validatePatientRegistration
};
