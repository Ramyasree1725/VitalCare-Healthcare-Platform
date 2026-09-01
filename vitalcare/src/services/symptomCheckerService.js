/**
 * Clinical Symptom Checker & Triage Intelligence Service
 */

const symptomKnowledgeBase = {
  "chest_pain": {
    name: "Chest Pain / Pressure",
    department: "Cardiology / Emergency",
    urgency: "HIGH_EMERGENCY",
    badge: "Immediate Attention",
    advice: "Severe chest tightness, pain radiating to arm or jaw requires immediate emergency medical evaluation. Avoid physical exertion and call 911 or our Emergency SOS.",
    possibleConditions: ["Angina", "Acute Coronary Syndrome", "Costochondritis", "Gastroesophageal Reflux"]
  },
  "shortness_of_breath": {
    name: "Shortness of Breath / Wheezing",
    department: "Pulmonology",
    urgency: "HIGH_EMERGENCY",
    badge: "Urgent Care Required",
    advice: "Difficulty breathing or persistent wheezing should be evaluated promptly. Sit upright, take prescribed bronchodilator if asthmatic, and seek urgent consultation.",
    possibleConditions: ["Bronchial Asthma", "Bronchitis", "Allergic Reaction", "Pneumonia"]
  },
  "high_fever": {
    name: "High Fever (> 101°F / 38.3°C)",
    department: "General Medicine / Pediatrics",
    urgency: "MODERATE_URGENT",
    badge: "Urgent Doctor Visit",
    advice: "Stay hydrated with oral fluids, use antipyretics (acetaminophen / ibuprofen) as advised, and monitor temperature every 4 hours.",
    possibleConditions: ["Viral Infection", "Influenza", "Bacterial Pharyngitis", "Urinary Tract Infection"]
  },
  "joint_pain": {
    name: "Joint Pain & Morning Stiffness",
    department: "Orthopedics & Rheumatology",
    urgency: "ROUTINE_CONSULT",
    badge: "Schedule Consultation",
    advice: "Apply warm or cold compress to relieve localized discomfort. Schedule an evaluation with our Orthopedic specialist for imaging and mobility check.",
    possibleConditions: ["Osteoarthritis", "Tendinitis", "Rheumatoid Arthritis", "Sprain"]
  },
  "skin_rash": {
    name: "Skin Rash, Itching or Hives",
    department: "Dermatology",
    urgency: "ROUTINE_CONSULT",
    badge: "Dermatology Evaluation",
    advice: "Avoid scratching to prevent secondary skin infection. Use soothing calamine lotion or antihistamines. Book a specialist skin visit.",
    possibleConditions: ["Contact Dermatitis", "Urticaria / Hives", "Eczema", "Psoriasis"]
  },
  "severe_headache": {
    name: "Severe Headache or Migraine",
    department: "Neurology",
    urgency: "MODERATE_URGENT",
    badge: "Specialist Visit",
    advice: "Rest in a quiet, dark room. Maintain adequate hydration. If accompanied by vision changes, numbness, or stiffness in the neck, seek emergency care.",
    possibleConditions: ["Migraine with Aura", "Tension Headache", "Cluster Headache", "Sinusitis"]
  },
  "acid_reflux": {
    name: "Acid Reflux, Heartburn or Stomach Ache",
    department: "Gastroenterology",
    urgency: "ROUTINE_CONSULT",
    badge: "Routine Care",
    advice: "Eat smaller meals, avoid spicy or acidic triggers, avoid lying down immediately after eating, and consider over-the-counter antacids.",
    possibleConditions: ["GERD", "Gastritis", "Peptic Ulcer Disease", "Indigestion"]
  }
};

function analyzeSymptoms(symptomKeys = [], durationDays = 1, severity = "moderate") {
  if (!Array.isArray(symptomKeys) || symptomKeys.length === 0) {
    return {
      urgency: "ROUTINE_CONSULT",
      triageLevel: "Routine Primary Care",
      triageColor: "#10b981",
      recommendedDepartment: "Family Medicine",
      summary: "General wellness consultation recommended.",
      advice: "Please select one or more specific symptoms for clinical evaluation.",
      conditions: ["General Health Evaluation"]
    };
  }

  const matched = symptomKeys.map(k => symptomKnowledgeBase[k]).filter(Boolean);
  
  const hasEmergency = matched.some(m => m.urgency === "HIGH_EMERGENCY") || severity === "severe";
  const hasUrgent = matched.some(m => m.urgency === "MODERATE_URGENT") || durationDays > 5;

  let urgency = "ROUTINE_CONSULT";
  let triageLevel = "Standard Clinical Consultation";
  let triageColor = "#0284c7";

  if (hasEmergency) {
    urgency = "HIGH_EMERGENCY";
    triageLevel = "Immediate Emergency / Urgent Care Priority";
    triageColor = "#ef4444";
  } else if (hasUrgent) {
    urgency = "MODERATE_URGENT";
    triageLevel = "Prompt Medical Review (Within 24-48 Hours)";
    triageColor = "#f59e0b";
  }

  const primaryDepartment = matched[0]?.department || "Internal Medicine";
  const combinedAdvice = matched.map(m => m.advice).join(" ") || "Schedule a consultation with our physicians.";
  const combinedConditions = [...new Set(matched.flatMap(m => m.possibleConditions || []))];

  return {
    urgency,
    triageLevel,
    triageColor,
    recommendedDepartment: primaryDepartment,
    symptomsAnalyzed: matched.map(m => m.name),
    advice: combinedAdvice,
    possibleConditions: combinedConditions.slice(0, 5)
  };
}

module.exports = { analyzeSymptoms, symptomKnowledgeBase };
