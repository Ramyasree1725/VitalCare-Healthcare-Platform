/**
 * Clinical calculation utilities used across VitalCare
 * BMI, BSA, eGFR approximations, dosage helpers, risk scores (simplified educational versions)
 */

function calculateBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) {
    throw new Error("Valid weight (kg) and height (cm) required");
  }
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let category = "Unknown";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";
  return { bmi: Math.round(bmi * 10) / 10, category };
}

function calculateBSA(weightKg, heightCm) {
  // Mosteller formula
  if (!weightKg || !heightCm) throw new Error("Weight and height required");
  const bsa = Math.sqrt((heightCm * weightKg) / 3600);
  return Math.round(bsa * 100) / 100;
}

function estimateGFR(creatinine, age, isFemale, isBlack) {
  // Simplified CKD-EPI style approximation for demo only - NOT for clinical use
  if (!creatinine || !age) throw new Error("Creatinine and age required");
  let egfr = 141 * Math.pow(Math.min(creatinine / 0.9, 1), -0.411) * Math.pow(Math.max(creatinine / 0.9, 1), -1.209) * Math.pow(0.993, age);
  if (isFemale) egfr *= 1.018;
  if (isBlack) egfr *= 1.159;
  return Math.round(egfr);
}

function calculateIdealBodyWeight(heightCm, isMale) {
  const heightIn = heightCm / 2.54;
  if (isMale) return Math.round(50 + 2.3 * (heightIn - 60));
  return Math.round(45.5 + 2.3 * (heightIn - 60));
}

function mapBloodPressureCategory(systolic, diastolic) {
  if (systolic < 120 && diastolic < 80) return "Normal";
  if (systolic < 130 && diastolic < 80) return "Elevated";
  if (systolic < 140 || diastolic < 90) return "Stage 1 Hypertension";
  if (systolic >= 140 || diastolic >= 90) return "Stage 2 Hypertension";
  return "Hypertensive Crisis - Seek emergency care";
}

function calculateHeartRateZones(age) {
  const maxHR = 220 - age;
  return {
    maxHeartRate: maxHR,
    moderate: { min: Math.round(maxHR * 0.5), max: Math.round(maxHR * 0.7) },
    vigorous: { min: Math.round(maxHR * 0.7), max: Math.round(maxHR * 0.85) }
  };
}

function pediatricWeightBasedDose(weightKg, dosePerKg, maxDose) {
  if (!weightKg || weightKg <= 0) throw new Error("Valid weight required");
  let dose = weightKg * dosePerKg;
  if (maxDose && dose > maxDose) dose = maxDose;
  return Math.round(dose * 100) / 100;
}

function interpretGlucose(mgDl, fasting) {
  if (fasting) {
    if (mgDl < 100) return "Normal";
    if (mgDl < 126) return "Prediabetes";
    return "Diabetes range - consult physician";
  }
  if (mgDl < 140) return "Normal";
  if (mgDl < 200) return "Prediabetes range";
  return "Diabetes range - consult physician";
}

module.exports = {
  calculateBMI,
  calculateBSA,
  estimateGFR,
  calculateIdealBodyWeight,
  mapBloodPressureCategory,
  calculateHeartRateZones,
  pediatricWeightBasedDose,
  interpretGlucose
};
