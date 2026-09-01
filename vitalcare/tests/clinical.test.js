const { describe, it } = require('node:test');
const assert = require('node:assert');
const { calculateBMI, calculateBSA, mapBloodPressureCategory } = require('../src/utils/clinicalCalculators');

describe('clinicalCalculators', () => {
  it('calculates BMI', () => {
    const r = calculateBMI(70, 175);
    assert.ok(r.bmi > 20 && r.bmi < 25);
    assert.strictEqual(r.category, 'Normal');
  });

  it('calculates BSA', () => {
    const bsa = calculateBSA(70, 175);
    assert.ok(bsa > 1.5 && bsa < 2.5);
  });

  it('maps blood pressure', () => {
    assert.strictEqual(mapBloodPressureCategory(115, 75), 'Normal');
    assert.strictEqual(mapBloodPressureCategory(135, 85), 'Stage 1 Hypertension');
  });
});
