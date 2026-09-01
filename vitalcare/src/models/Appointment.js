/**
 * Appointment model and in-memory data store
 * Handles creation, status transitions, filtering and validation of medical appointments
 */
let uuidv4;
try {
  uuidv4 = require("uuid").v4;
} catch (e) {
  const crypto = require("crypto");
  uuidv4 = () => (crypto.randomUUID ? crypto.randomUUID() : 'appt-' + Math.random().toString(36).substr(2, 9));
}

const STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
  NO_SHOW: "no_show"
};

const appointments = [];

class Appointment {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.patientName = data.patientName;
    this.email = data.email;
    this.phone = data.phone;
    this.department = data.department;
    this.doctorId = data.doctorId || null;
    this.preferredDate = data.preferredDate;
    this.preferredTime = data.preferredTime;
    this.notes = data.notes || "";
    this.status = data.status || STATUS.PENDING;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
    this.confirmationCode = data.confirmationCode || generateConfirmationCode();
  }

  toJSON() {
    return {
      id: this.id,
      patientName: this.patientName,
      email: this.email,
      phone: this.phone,
      department: this.department,
      doctorId: this.doctorId,
      preferredDate: this.preferredDate,
      preferredTime: this.preferredTime,
      notes: this.notes,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      confirmationCode: this.confirmationCode
    };
  }

  confirm() {
    if (this.status !== STATUS.PENDING) {
      throw new Error("Only pending appointments can be confirmed");
    }
    this.status = STATUS.CONFIRMED;
    this.updatedAt = new Date().toISOString();
    return this;
  }

  cancel(reason) {
    if ([STATUS.COMPLETED, STATUS.CANCELLED].includes(this.status)) {
      throw new Error("Cannot cancel a completed or already cancelled appointment");
    }
    this.status = STATUS.CANCELLED;
    this.notes = (this.notes + " | Cancel reason: " + (reason || "Not specified")).trim();
    this.updatedAt = new Date().toISOString();
    return this;
  }

  complete() {
    if (this.status !== STATUS.CONFIRMED) {
      throw new Error("Only confirmed appointments can be marked completed");
    }
    this.status = STATUS.COMPLETED;
    this.updatedAt = new Date().toISOString();
    return this;
  }
}

function generateConfirmationCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "VC-";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const AppointmentStore = {
  create(data) {
    const appt = new Appointment(data);
    appointments.push(appt);
    return appt;
  },

  findById(id) {
    return appointments.find(a => a.id === id) || null;
  },

  findByConfirmationCode(code) {
    return appointments.find(a => a.confirmationCode === code) || null;
  },

  findByEmail(email) {
    return appointments.filter(a => a.email.toLowerCase() === email.toLowerCase());
  },

  findByDepartment(department) {
    return appointments.filter(a => a.department === department);
  },

  findByStatus(status) {
    return appointments.filter(a => a.status === status);
  },

  findByDateRange(startDate, endDate) {
    return appointments.filter(a => {
      const d = a.preferredDate;
      return d >= startDate && d <= endDate;
    });
  },

  list(filters = {}) {
    let result = [...appointments];
    if (filters.status) result = result.filter(a => a.status === filters.status);
    if (filters.department) result = result.filter(a => a.department === filters.department);
    if (filters.email) result = result.filter(a => a.email.toLowerCase() === filters.email.toLowerCase());
    if (filters.date) result = result.filter(a => a.preferredDate === filters.date);
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const start = (page - 1) * limit;
    return {
      data: result.slice(start, start + limit).map(a => a.toJSON()),
      total: result.length,
      page,
      limit,
      totalPages: Math.ceil(result.length / limit)
    };
  },

  update(id, updates) {
    const appt = this.findById(id);
    if (!appt) return null;
    Object.keys(updates).forEach(key => {
      if (["patientName", "email", "phone", "department", "doctorId", "preferredDate", "preferredTime", "notes"].includes(key)) {
        appt[key] = updates[key];
      }
    });
    appt.updatedAt = new Date().toISOString();
    return appt;
  },

  delete(id) {
    const idx = appointments.findIndex(a => a.id === id);
    if (idx === -1) return false;
    appointments.splice(idx, 1);
    return true;
  },

  countByStatus() {
    const counts = {};
    Object.values(STATUS).forEach(s => { counts[s] = 0; });
    appointments.forEach(a => { counts[a.status] = (counts[a.status] || 0) + 1; });
    return counts;
  },

  getStats() {
    return {
      total: appointments.length,
      byStatus: this.countByStatus(),
      byDepartment: appointments.reduce((acc, a) => {
        acc[a.department] = (acc[a.department] || 0) + 1;
        return acc;
      }, {})
    };
  },

  clear() {
    appointments.length = 0;
  },

  STATUS
};

module.exports = { Appointment, AppointmentStore, STATUS };
