const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert');
const { AppointmentStore, STATUS } = require('../vitalcare/src/models/Appointment');

describe('AppointmentStore Root Test', () => {
  beforeEach(() => {
    AppointmentStore.clear();
  });

  it('creates an appointment successfully', () => {
    const appt = AppointmentStore.create({
      patientName: 'Test Patient',
      email: 'test@example.com',
      phone: '5550001111',
      department: 'Pediatrics',
      preferredDate: '2026-09-15',
      preferredTime: '09:00'
    });
    assert.ok(appt.id);
    assert.strictEqual(appt.status, STATUS.PENDING);
    assert.ok(appt.confirmationCode.startsWith('VC-'));
  });

  it('confirms appointment status', () => {
    const appt = AppointmentStore.create({
      patientName: 'Test',
      email: 't@example.com',
      phone: '5550001111',
      department: 'Cardiology',
      preferredDate: '2026-09-16',
      preferredTime: '10:00'
    });
    appt.confirm();
    assert.strictEqual(appt.status, STATUS.CONFIRMED);
  });
});
