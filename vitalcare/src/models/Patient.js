/**
 * Patient registration and profile management
 */
let uuidv4;
try {
  uuidv4 = require("uuid").v4;
} catch (e) {
  const crypto = require("crypto");
  uuidv4 = () => (crypto.randomUUID ? crypto.randomUUID() : 'patient-' + Math.random().toString(36).substr(2, 9));
}

const patients = [];

class Patient {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email.toLowerCase();
    this.phone = data.phone;
    this.dateOfBirth = data.dateOfBirth || null;
    this.gender = data.gender || null;
    this.address = data.address || {};
    this.insuranceProvider = data.insuranceProvider || null;
    this.insuranceId = data.insuranceId || null;
    this.emergencyContact = data.emergencyContact || null;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.active = data.active !== false;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
      address: this.address,
      insuranceProvider: this.insuranceProvider,
      insuranceId: this.insuranceId,
      emergencyContact: this.emergencyContact,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      active: this.active
    };
  }
}

const PatientStore = {
  create(data) {
    const existing = patients.find(p => p.email === data.email.toLowerCase());
    if (existing) {
      const err = new Error("A patient with this email already exists");
      err.statusCode = 409;
      throw err;
    }
    const patient = new Patient(data);
    patients.push(patient);
    return patient;
  },

  findById(id) {
    return patients.find(p => p.id === id) || null;
  },

  findByEmail(email) {
    return patients.find(p => p.email === email.toLowerCase()) || null;
  },

  update(id, updates) {
    const patient = this.findById(id);
    if (!patient) return null;
    const allowed = ["firstName", "lastName", "phone", "dateOfBirth", "gender", "address", "insuranceProvider", "insuranceId", "emergencyContact"];
    allowed.forEach(key => {
      if (updates[key] !== undefined) patient[key] = updates[key];
    });
    patient.updatedAt = new Date().toISOString();
    return patient;
  },

  list(filters = {}) {
    let result = patients.filter(p => p.active);
    if (filters.email) result = result.filter(p => p.email.includes(filters.email.toLowerCase()));
    if (filters.name) {
      const n = filters.name.toLowerCase();
      result = result.filter(p => p.fullName.toLowerCase().includes(n));
    }
    const page = parseInt(filters.page, 10) || 1;
    const limit = Math.min(50, parseInt(filters.limit, 10) || 20);
    const start = (page - 1) * limit;
    return {
      data: result.slice(start, start + limit).map(p => p.toJSON()),
      total: result.length,
      page,
      limit
    };
  },

  deactivate(id) {
    const patient = this.findById(id);
    if (!patient) return null;
    patient.active = false;
    patient.updatedAt = new Date().toISOString();
    return patient;
  },

  clear() {
    patients.length = 0;
  }
};

module.exports = { Patient, PatientStore };
