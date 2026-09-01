/**
 * Application configuration for VitalCare Healthcare Platform
 */
module.exports = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || "development",
  clinicName: "VitalCare",
  supportEmail: "support@vitalcare.health",
  emergencyPhone: "+1-800-555-0199",
  appointmentLeadTimeHours: 2,
  maxAppointmentsPerDay: 80,
  departments: [
    "Cardiology", "Pediatrics", "Orthopedics", "Neurology",
    "Dermatology", "Oncology", "Gastroenterology", "Endocrinology",
    "Pulmonology", "Nephrology", "Rheumatology", "Ophthalmology",
    "ENT", "Urology", "Psychiatry", "Family Medicine",
    "Internal Medicine", "Obstetrics & Gynecology", "Emergency Medicine"
  ],
  workingHours: {
    monday: { open: "08:00", close: "20:00" },
    tuesday: { open: "08:00", close: "20:00" },
    wednesday: { open: "08:00", close: "20:00" },
    thursday: { open: "08:00", close: "20:00" },
    friday: { open: "08:00", close: "18:00" },
    saturday: { open: "09:00", close: "14:00" },
    sunday: { open: null, close: null }
  },
  insuranceProviders: [
    "Aetna", "Blue Cross Blue Shield", "Cigna", "UnitedHealthcare",
    "Humana", "Kaiser Permanente", "Medicare", "Medicaid"
  ]
};
