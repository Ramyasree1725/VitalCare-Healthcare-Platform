/**
 * Diagnostic Laboratory Tests & Reports Model
 */

const availableLabTests = [
  {
    id: "lab-01",
    name: "Comprehensive Metabolic & Lipid Panel",
    code: "CMP-LIPID",
    department: "Clinical Biochemistry",
    sampleType: "Blood (Serum)",
    fastingRequired: true,
    turnaroundHours: 12,
    price: 85.00,
    parametersCount: 14,
    description: "Evaluates liver/kidney function, electrolytes, total cholesterol, HDL, LDL, and triglycerides."
  },
  {
    id: "lab-02",
    name: "Complete Blood Count (CBC) with Differential",
    code: "CBC-DIFF",
    department: "Hematology",
    sampleType: "Whole Blood (EDTA)",
    fastingRequired: false,
    turnaroundHours: 6,
    price: 35.00,
    parametersCount: 18,
    description: "Full assessment of red blood cells, white blood cell differential, platelets, and hemoglobin levels."
  },
  {
    id: "lab-03",
    name: "Thyroid Function Profile (Total T3, T4 & TSH)",
    code: "THYROID-TFT",
    department: "Endocrinology",
    sampleType: "Blood (Serum)",
    fastingRequired: false,
    turnaroundHours: 24,
    price: 60.00,
    parametersCount: 3,
    description: "Comprehensive screening for hyperthyroidism, hypothyroidism, and pituitary gland regulation."
  },
  {
    id: "lab-04",
    name: "HbA1c Glycated Hemoglobin (Diabetes Screen)",
    code: "HBA1C-DM",
    department: "Clinical Biochemistry",
    sampleType: "Whole Blood",
    fastingRequired: false,
    turnaroundHours: 6,
    price: 45.00,
    parametersCount: 2,
    description: "Evaluates average blood sugar control over the past 2 to 3 months."
  },
  {
    id: "lab-05",
    name: "Vitamin D3 & B12 Vitality Duo",
    code: "VIT-D-B12",
    department: "Special Chemistry",
    sampleType: "Blood (Serum)",
    fastingRequired: false,
    turnaroundHours: 24,
    price: 75.00,
    parametersCount: 2,
    description: "Assesses neuromuscular health, bone metabolism, red cell production, and energy levels."
  },
  {
    id: "lab-06",
    name: "Advanced Cardiac Risk & High-Sensitivity CRP",
    code: "CARD-HSCRP",
    department: "Cardiology Lab",
    sampleType: "Blood (Serum)",
    fastingRequired: true,
    turnaroundHours: 18,
    price: 95.00,
    parametersCount: 6,
    description: "Measures hs-CRP, Apolipoprotein B, and cardiac biomarkers to evaluate vascular inflammation risk."
  }
];

// Sample pre-generated reports for instant demo lookup
const sampleReports = [
  {
    reportId: "LAB-882104",
    patientName: "Jane Doe",
    age: 38,
    gender: "Female",
    testName: "Complete Blood Count (CBC) with Differential",
    collectionDate: "2026-08-28T09:15:00Z",
    reportedDate: "2026-08-28T14:30:00Z",
    pathologist: "Dr. Rachel Green, MD (Pathology)",
    overallStatus: "Normal Range",
    parameters: [
      { name: "Hemoglobin (Hb)", result: "13.8", unit: "g/dL", referenceRange: "12.0 - 15.5", status: "NORMAL" },
      { name: "Total White Blood Cells (WBC)", result: "6.8", unit: "x10^3/uL", referenceRange: "4.5 - 11.0", status: "NORMAL" },
      { name: "Platelet Count", result: "245", unit: "x10^3/uL", referenceRange: "150 - 450", status: "NORMAL" },
      { name: "Red Blood Cell Count (RBC)", result: "4.6", unit: "x10^6/uL", referenceRange: "4.0 - 5.2", status: "NORMAL" },
      { name: "Hematocrit (PCV)", result: "41.2", unit: "%", referenceRange: "37.0 - 48.0", status: "NORMAL" }
    ]
  },
  {
    reportId: "LAB-774912",
    patientName: "Robert Miller",
    age: 52,
    gender: "Male",
    testName: "Comprehensive Metabolic & Lipid Panel",
    collectionDate: "2026-08-29T08:00:00Z",
    reportedDate: "2026-08-29T18:00:00Z",
    pathologist: "Dr. Alan Sterling, MD (Biochemistry)",
    overallStatus: "Borderline High Cholesterol",
    parameters: [
      { name: "Fasting Blood Glucose", result: "94", unit: "mg/dL", referenceRange: "70 - 99", status: "NORMAL" },
      { name: "Total Cholesterol", result: "218", unit: "mg/dL", referenceRange: "< 200", status: "HIGH" },
      { name: "HDL (Good Cholesterol)", result: "48", unit: "mg/dL", referenceRange: "> 40", status: "NORMAL" },
      { name: "LDL (Bad Cholesterol)", result: "142", unit: "mg/dL", referenceRange: "< 100", status: "HIGH" },
      { name: "Triglycerides", result: "140", unit: "mg/dL", referenceRange: "< 150", status: "NORMAL" },
      { name: "Serum Creatinine", result: "0.92", unit: "mg/dL", referenceRange: "0.7 - 1.3", status: "NORMAL" }
    ]
  }
];

const labBookings = [];

const LabStore = {
  listTests() {
    return availableLabTests;
  },

  getTestById(id) {
    return availableLabTests.find(t => t.id === id) || null;
  },

  bookTest(payload) {
    const bookingId = "LB-" + Math.floor(100000 + Math.random() * 900000);
    const test = availableLabTests.find(t => t.id === payload.testId) || availableLabTests[0];
    const booking = {
      bookingId,
      patientName: payload.patientName,
      email: payload.email,
      phone: payload.phone,
      testId: test.id,
      testName: test.name,
      collectionType: payload.collectionType || "Home Sample Collection",
      scheduledDate: payload.scheduledDate,
      scheduledTime: payload.scheduledTime || "08:30 AM",
      address: payload.address || "Main Clinic",
      status: "sample_pending",
      price: test.price,
      createdAt: new Date().toISOString()
    };
    labBookings.push(booking);
    return booking;
  },

  getReport(reportId) {
    const rid = (reportId || "").trim().toUpperCase();
    return sampleReports.find(r => r.reportId === rid) || null;
  },

  getAllReports() {
    return sampleReports;
  }
};

module.exports = { LabStore, availableLabTests, sampleReports, labBookings };
