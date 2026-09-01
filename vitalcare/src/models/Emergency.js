/**
 * Emergency SOS & Live Ambulance Dispatch Model
 */

const ambulanceUnits = [
  { id: "AMB-01", vehicleNumber: "EMS-9901", type: "Advanced Life Support (ALS)", driver: "Marcus Vance", paramedic: "Lt. Sarah Connor, RN", phone: "+1 (800) 555-0911", baseLocation: "Downtown Trauma Center", status: "available" },
  { id: "AMB-02", vehicleNumber: "EMS-9902", type: "Basic Life Support (BLS)", driver: "David Miller", paramedic: "James Wilson, EMT-P", phone: "+1 (800) 555-0912", baseLocation: "Northside Medical Hub", status: "available" },
  { id: "AMB-03", vehicleNumber: "EMS-9903", type: "Cardiac Mobile Intensive Care (MICU)", driver: "Carlos Santana", paramedic: "Elena Rostova, EMT-CC", phone: "+1 (800) 555-0913", baseLocation: "Eastside Emergency Hospital", status: "available" }
];

const emergencyDispatches = [];

function generateEmergencyCode() {
  return "SOS-" + Math.floor(100000 + Math.random() * 900000);
}

const EmergencyStore = {
  getAvailableAmbulance() {
    return ambulanceUnits[Math.floor(Math.random() * ambulanceUnits.length)];
  },

  createSOSDispatch(payload) {
    const sosCode = generateEmergencyCode();
    const assignedAmbulance = this.getAvailableAmbulance();
    const etaMinutes = Math.floor(5 + Math.random() * 8); // 5 - 12 mins ETA

    const dispatchRecord = {
      sosCode,
      callerName: payload.callerName || "Emergency Caller",
      callerPhone: payload.callerPhone || "+1 (555) 000-0000",
      location: payload.location || "1240 Health Ave Area",
      emergencyType: payload.emergencyType || "Critical Medical Emergency",
      severity: payload.severity || "HIGH_PRIORITY",
      status: "DISPATCHED_EN_ROUTE",
      ambulanceUnit: assignedAmbulance.id,
      vehicleNumber: assignedAmbulance.vehicleNumber,
      ambulanceType: assignedAmbulance.type,
      paramedic: assignedAmbulance.paramedic,
      driver: assignedAmbulance.driver,
      hotline: assignedAmbulance.phone,
      etaMinutes: etaMinutes,
      destinationHospital: "VitalCare Central Trauma Center (Level 1)",
      timestamp: new Date().toISOString()
    };

    emergencyDispatches.push(dispatchRecord);
    return dispatchRecord;
  },

  getDispatch(sosCode) {
    const code = (sosCode || "").trim().toUpperCase();
    return emergencyDispatches.find(d => d.sosCode === code) || null;
  },

  getRecentDispatches() {
    return emergencyDispatches.slice(-10);
  }
};

module.exports = { EmergencyStore, ambulanceUnits, emergencyDispatches };
