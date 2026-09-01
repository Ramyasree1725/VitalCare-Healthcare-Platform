const { describe, it } = require('node:test');
const assert = require('node:assert');
const {
  isValidEmail,
  isValidPhone,
  isValidName,
  isFutureDate,
  validateAppointmentPayload
} = require('../src/utils/validators');

describe('validators', () => {
  it('validates emails', () => {
    assert.strictEqual(isValidEmail('user@example.com'), true);
    assert.strictEqual(isValidEmail('bad'), false);
    assert.strictEqual(isValidEmail(''), false);
  });

  it('validates phones', () => {
    assert.strictEqual(isValidPhone('+15551234567'), true);
    assert.strictEqual(isValidPhone('555-123-4567'), true);
    assert.strictEqual(isValidPhone('123'), false);
  });

  it('validates names', () => {
    assert.strictEqual(isValidName('John Doe'), true);
    assert.strictEqual(isValidName('A'), false);
  });

  it('validates future dates', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    assert.strictEqual(isFutureDate(tomorrow.toISOString().split('T')[0]), true);
    assert.strictEqual(isFutureDate('2020-01-01'), false);
  });

  it('validates appointment payload', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    const result = validateAppointmentPayload({
      patientName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '5551234567',
      department: 'Cardiology',
      preferredDate: tomorrow.toISOString().split('T')[0],
      preferredTime: '10:00'
    });
    assert.strictEqual(result.valid, true);
  });
});
