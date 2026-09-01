/**
 * VitalCare Healthcare Platform - Server Engine
 * Features White Theme support, Auth API (Login/Register), and Full Hospital Services on Port 9090.
 */

const path = require('path');
const fs = require('fs');
const http = require('http');

const PORT = process.env.PORT || 9090;
const publicDir = path.join(__dirname, '../public');

// Data Stores
const departmentsData = [
  { id: "dept-cardio", name: "Cardiology & Cardiac Care", icon: "fa-heart-pulse", desc: "Coronary care, catheterization lab, angioplasty, heart failure management, and 24/7 chest pain unit." },
  { id: "dept-neuro", name: "Neurology & Neurosurgery", icon: "fa-brain", desc: "Stroke treatment unit, brain tumor surgery, neuro-rehabilitation, and nerve velocity assessments." },
  { id: "dept-ortho", name: "Orthopedics & Joint Surgery", icon: "fa-bone", desc: "Knee and hip joint replacements, spine surgery, fracture care, and sports rehabilitation." },
  { id: "dept-gastro", name: "Gastroenterology & Liver Care", icon: "fa-stethoscope", desc: "Digestive endoscopies, liver disease management, gallbladder treatment, and GI oncology." },
  { id: "dept-oncology", name: "Oncology & Cancer Care", icon: "fa-ribbon", desc: "Medical oncology, targeted chemotherapy, surgical tumor excision, and radiation therapy." },
  { id: "dept-nephro", name: "Nephrology & Dialysis Unit", icon: "fa-vial", desc: "Hemodialysis center, kidney disease management, and renal transplant evaluations." },
  { id: "dept-pedia", name: "Pediatrics & Child Care", icon: "fa-baby", desc: "Neonatal intensive care (NICU), pediatric medicine, growth monitoring, and vaccinations." },
  { id: "dept-emergency", name: "Emergency & Trauma Center", icon: "fa-truck-medical", desc: "24/7 emergency care, Level-1 trauma response, and life support ambulance fleet." }
];

const doctorsData = [
  { id: "doc-101", name: "Dr. K. V. Ramana Rao", title: "Senior Consultant Cardiologist", dept: "Cardiology & Cardiac Care", experience: "22 Years", qualifications: "MBBS, MS, MCh (Cardiothoracic)", fee: 800, timings: "Mon - Sat (10:00 AM - 04:00 PM)", room: "OPD Room 102, Block A" },
  { id: "doc-102", name: "Dr. Ananya Sharma", title: "Chief Neurologist & Stroke Specialist", dept: "Neurology & Neurosurgery", experience: "16 Years", qualifications: "MBBS, MD, DM (Neurology)", fee: 750, timings: "Mon - Fri (09:30 AM - 03:00 PM)", room: "OPD Room 205, Block B" },
  { id: "doc-103", name: "Dr. Rajeshwar Varma", title: "Orthopedic & Spine Surgeon", dept: "Orthopedics & Joint Surgery", experience: "19 Years", qualifications: "MBBS, MS (Ortho), MCh", fee: 700, timings: "Mon - Sat (11:00 AM - 05:00 PM)", room: "OPD Room 114, Block A" },
  { id: "doc-104", name: "Dr. Meenakshi Sundaram", title: "Senior Pediatrician", dept: "Pediatrics & Child Care", experience: "14 Years", qualifications: "MBBS, MD (Pediatrics)", fee: 600, timings: "Daily (09:00 AM - 02:00 PM)", room: "Mother & Child Pavilion" },
  { id: "doc-105", name: "Dr. P. Suresh Kumar", title: "Consultant Gastroenterologist", dept: "Gastroenterology & Liver Care", experience: "18 Years", qualifications: "MBBS, MD, DM (Gastro)", fee: 750, timings: "Tue - Sat (10:30 AM - 04:30 PM)", room: "OPD Room 302, Block C" },
  { id: "doc-106", name: "Dr. S. Lakshmi Devi", title: "Senior Medical Oncologist", dept: "Oncology & Cancer Care", experience: "15 Years", qualifications: "MBBS, MD, DM (Oncology)", fee: 850, timings: "Mon - Fri (10:00 AM - 03:30 PM)", room: "Cancer Center Pavilion" }
];

const healthPackagesData = [
  {
    id: "pkg-master",
    title: "Master Full Body Health Checkup",
    subtitle: "Complete preventive screening for adults",
    originalPrice: 4500,
    price: 1999,
    badge: "Recommended",
    includes: [
      "Complete Blood Count (CBC) with ESR",
      "Lipid Profile (Total Cholesterol, HDL, LDL)",
      "Kidney Function Test (BUN, Creatinine)",
      "Liver Function Test (SGOT, SGPT, Bilirubin)",
      "Thyroid Profile Total (T3, T4, TSH)",
      "Fasting Glucose & HbA1c Average",
      "Resting 12-Lead ECG & Chest X-Ray",
      "Free Home Sample Collection & Doctor Consultation"
    ]
  },
  {
    id: "pkg-cardiac",
    title: "Advanced Cardiac Risk Checkup",
    subtitle: "In-depth heart and vascular evaluation",
    originalPrice: 6500,
    price: 2999,
    badge: "Heart Care",
    includes: [
      "2D Echocardiogram with Color Doppler Scan",
      "Treadmill Cardiac Stress Test (TMT)",
      "High-Sensitivity C-Reactive Protein (hs-CRP)",
      "Lipid Subfractions Panel",
      "Resting 12-Lead ECG",
      "Senior Cardiologist Diagnostic Consultation"
    ]
  },
  {
    id: "pkg-senior",
    title: "Senior Citizen Health Checkup",
    subtitle: "Comprehensive checkup for adults aged 50+",
    originalPrice: 5800,
    price: 2499,
    badge: "Senior Wellness",
    includes: [
      "Bone DEXA Mineral Density Screening",
      "Vitamin D3 & Vitamin B12 Duo",
      "Thyroid Function & Metabolic Screen",
      "Urine Microalbumin & Renal Clearance",
      "Abdomen & Pelvic Ultrasound Scan",
      "Geriatric Physician Evaluation"
    ]
  },
  {
    id: "pkg-diabetic",
    title: "Diabetes Care & Screening Package",
    subtitle: "Glycemic control and organ risk assessment",
    originalPrice: 3800,
    price: 1499,
    badge: "Diabetes Care",
    includes: [
      "Fasting & Post-Prandial Glucose",
      "Glycated Hemoglobin (HbA1c 90-Day Index)",
      "Serum Creatinine & EGFR Clearance",
      "Diabetic Foot Neuropathy Check",
      "Retinopathy Eye Inspection",
      "Endocrinologist Consultation"
    ]
  }
];

const diagnosticTestsData = [
  { id: "test-01", name: "Complete Blood Count (CBC) + ESR", category: "Blood Tests", price: 350, turnaround: "Same Day (4 Hours)", sample: "Blood (3 ml)", desc: "Measures red cells, white cells, hemoglobin, platelets, and infection." },
  { id: "test-02", name: "Lipid Profile (Cholesterol Panel)", category: "Cardiac Tests", price: 650, turnaround: "Same Day (6 Hours)", sample: "Blood (4 ml)", desc: "Measures Total Cholesterol, HDL Good, LDL Bad, and Triglycerides." },
  { id: "test-03", name: "HbA1c Glycated Hemoglobin", category: "Diabetes Tests", price: 450, turnaround: "Same Day (3 Hours)", sample: "Blood (2 ml)", desc: "Provides average blood glucose control rating over 3 months." },
  { id: "test-04", name: "Kidney Function Test (KFT)", category: "Renal Tests", price: 750, turnaround: "Same Day (5 Hours)", sample: "Blood & Urine", desc: "Checks Serum Creatinine, BUN, Uric Acid, and Electrolytes." },
  { id: "test-05", name: "Liver Function Test (LFT)", category: "Hepatic Tests", price: 800, turnaround: "Same Day (5 Hours)", sample: "Blood (4 ml)", desc: "Assesses SGOT, SGPT, Bilirubin, Protein, and Enzymes." },
  { id: "test-06", name: "Thyroid Profile (T3, T4, TSH)", category: "Endocrine Tests", price: 550, turnaround: "Same Day (4 Hours)", sample: "Blood (3 ml)", desc: "Screens for thyroid hormone balance and metabolic rate." }
];

const bloodBankData = [
  { group: "A+ (A Positive)", availableUnits: 34, status: "Available", type: "Whole Blood & PRBC" },
  { group: "A- (A Negative)", availableUnits: 8, status: "Limited", type: "PRBC & Platelets" },
  { group: "B+ (B Positive)", availableUnits: 40, status: "Available", type: "Whole Blood & PRBC" },
  { group: "B- (B Negative)", availableUnits: 6, status: "Critical", type: "PRBC Units" },
  { group: "O+ (O Positive)", availableUnits: 48, status: "Available", type: "Whole Blood & FFP" },
  { group: "O- (O Negative)", availableUnits: 12, status: "Limited", type: "Emergency PRBC" },
  { group: "AB+ (AB Positive)", availableUnits: 22, status: "Available", type: "Fresh Frozen Plasma" },
  { group: "AB- (AB Negative)", availableUnits: 5, status: "Critical", type: "Platelets On-Call" }
];

const pharmacyProductsData = [
  { id: "med-01", name: "Augmentin 625mg Duo", generic: "Amoxicillin + Clavulanic Acid", price: 210, category: "Antibiotics", form: "Strip of 10 Tablets", desc: "Antibacterial treatment for bacterial infections." },
  { id: "med-02", name: "Rosuvas 20mg", generic: "Rosuvastatin", price: 280, category: "Cardiac & Cholesterol", form: "Strip of 15 Tablets", desc: "Cholesterol management and cardiac protection." },
  { id: "med-03", name: "Glycomet-GP 2 Forte", generic: "Metformin + Glimepiride", price: 165, category: "Diabetes", form: "Strip of 15 Tablets", desc: "Oral blood glucose regulator for Type 2 diabetes." },
  { id: "med-04", name: "Dolo 650mg", generic: "Paracetamol", price: 34, category: "Fever & Pain", form: "Strip of 15 Tablets", desc: "Relieves fever, body aches, and headaches." },
  { id: "med-05", name: "Telma-H 40mg", generic: "Telmisartan + Hydrochlorothiazide", price: 195, category: "Blood Pressure", form: "Strip of 15 Tablets", desc: "Blood pressure regulation medicine." },
  { id: "med-06", name: "Pantocid DSR", generic: "Pantoprazole + Domperidone", price: 180, category: "Gastrointestinal", form: "Strip of 10 Capsules", desc: "Relieves acidity, GERD, and stomach upset." }
];

// Persistent Users & Appointments Datastores
let registeredUsersDb = [
  { id: "usr-01", fullName: "K. Venkat Rao", email: "venkat@example.com", phone: "+91 98480 22338", password: "password123", role: "Patient" }
];

let appointmentsDb = [
  {
    bookingCode: "VITAL-984210",
    patientName: "K. Venkat Rao",
    phone: "+91 98480 22338",
    email: "venkat@example.com",
    doctor: "Dr. K. V. Ramana Rao",
    department: "Cardiology & Cardiac Care",
    date: "2026-09-08",
    time: "10:30 AM",
    status: "Confirmed",
    room: "OPD Room 102, Block A",
    createdAt: new Date().toISOString()
  }
];

let pharmacyOrdersDb = [];
let ambulanceDispatchesDb = [];

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:9090'}`);
  const pathname = parsedUrl.pathname;
  const query = Object.fromEntries(parsedUrl.searchParams.entries());

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const sendJson = (statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  const getBody = () => new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });

  try {
    // 1. Health Status
    if (pathname === '/api/health' && req.method === 'GET') {
      return sendJson(200, {
        status: 'online',
        hospital: 'VitalCare Healthcare Platform',
        capacity: '750 Beds',
        emergencyLine: '108 / +91 (800) 425-VITAL',
        timestamp: new Date().toISOString()
      });
    }

    // 2. Auth: Register API
    if (pathname === '/api/auth/register' && req.method === 'POST') {
      const body = await getBody();
      if (!body.email || !body.password || !body.fullName) {
        return sendJson(400, { success: false, error: "Full Name, Email, and Password are required." });
      }
      const existing = registeredUsersDb.find(u => u.email.toLowerCase() === body.email.toLowerCase());
      if (existing) {
        return sendJson(400, { success: false, error: "An account with this email address already exists." });
      }
      const newUser = {
        id: "usr-" + Date.now(),
        fullName: body.fullName,
        email: body.email.toLowerCase(),
        phone: body.phone || "",
        password: body.password,
        role: body.role || "Patient",
        registeredAt: new Date().toISOString()
      };
      registeredUsersDb.push(newUser);
      return sendJson(201, { success: true, message: "Account registered successfully", user: { fullName: newUser.fullName, email: newUser.email, role: newUser.role } });
    }

    // 3. Auth: Login API
    if (pathname === '/api/auth/login' && req.method === 'POST') {
      const body = await getBody();
      const user = registeredUsersDb.find(u => u.email.toLowerCase() === (body.email || "").toLowerCase());
      if (user && user.password === body.password) {
        return sendJson(200, { success: true, message: "Login successful", user: { fullName: user.fullName, email: user.email, role: user.role } });
      }
      // Demo fallback login if credentials entered
      if (body.email && body.password) {
        return sendJson(200, { success: true, message: "Welcome back!", user: { fullName: body.email.split('@')[0], email: body.email, role: "Patient" } });
      }
      return sendJson(401, { success: false, error: "Invalid Email address or password." });
    }

    // 4. Departments API
    if (pathname === '/api/departments' && req.method === 'GET') {
      return sendJson(200, { success: true, data: departmentsData });
    }

    // 5. Doctors API
    if (pathname === '/api/doctors' && req.method === 'GET') {
      let filtered = [...doctorsData];
      if (query.search) {
        const s = query.search.toLowerCase();
        filtered = filtered.filter(d => d.name.toLowerCase().includes(s) || d.dept.toLowerCase().includes(s));
      }
      if (query.dept) {
        const dept = query.dept.toLowerCase();
        filtered = filtered.filter(d => d.dept.toLowerCase().includes(dept));
      }
      return sendJson(200, { success: true, data: filtered });
    }

    // 6. Packages & Tests
    if (pathname === '/api/packages' && req.method === 'GET') {
      return sendJson(200, { success: true, data: healthPackagesData });
    }
    if (pathname === '/api/tests' && req.method === 'GET') {
      let list = [...diagnosticTestsData];
      if (query.search) {
        const s = query.search.toLowerCase();
        list = list.filter(t => t.name.toLowerCase().includes(s) || t.category.toLowerCase().includes(s));
      }
      return sendJson(200, { success: true, data: list });
    }

    // 7. Appointments & OPD Bookings
    if (pathname === '/api/appointments' && req.method === 'POST') {
      const body = await getBody();
      const code = "VITAL-" + Math.floor(100000 + Math.random() * 900000);
      const appt = {
        bookingCode: code,
        patientName: body.patientName || "Patient",
        phone: body.phone || "",
        email: body.email || "",
        doctor: body.doctor || "Dr. K. V. Ramana Rao",
        department: body.department || "Cardiology & Cardiac Care",
        date: body.date || new Date().toISOString().split('T')[0],
        time: body.time || "10:00 AM",
        status: "Confirmed",
        room: "OPD Room 102, Block A",
        createdAt: new Date().toISOString()
      };
      appointmentsDb.push(appt);
      return sendJson(201, { success: true, data: appt });
    }

    if (pathname.startsWith('/api/appointments/lookup/') && req.method === 'GET') {
      const code = decodeURIComponent(pathname.replace('/api/appointments/lookup/', '')).trim().toUpperCase();
      const found = appointmentsDb.find(a => a.bookingCode.toUpperCase() === code);
      if (found) return sendJson(200, { success: true, data: found });
      return sendJson(404, { success: false, error: "Booking code not found: " + code });
    }

    // 8. Symptom Risk Checker
    if (pathname === '/api/symptom-checker' && req.method === 'POST') {
      const body = await getBody();
      const symptoms = body.symptoms || [];
      const age = parseInt(body.age) || 35;

      let risk = "Low Risk / General Assessment";
      let score = "92% Normal";
      let recs = ["Complete Blood Count (CBC)", "Fasting Glucose", "Lipid Profile"];

      if (symptoms.includes('chest_pain') || symptoms.includes('shortness_breath')) {
        risk = "Cardiac Concern - Specialist Check Suggested";
        score = "65% Risk Rating";
        recs = ["2D Echocardiogram", "Treadmill Stress Test (TMT)", "Troponin & hs-CRP"];
      } else if (symptoms.includes('fatigue') || symptoms.includes('thirst')) {
        risk = "Metabolic / Glycemic Sensitivity";
        score = "78% Risk Rating";
        recs = ["HbA1c Glycated Hemoglobin", "Fasting Blood Glucose", "Kidney Clearance Test"];
      }

      return sendJson(200, {
        success: true,
        data: { age, risk, score, recs, evaluatedAt: new Date().toISOString() }
      });
    }

    // 9. Blood Bank API
    if (pathname === '/api/bloodbank' && req.method === 'GET') {
      let data = [...bloodBankData];
      if (query.group) {
        const g = query.group.toLowerCase();
        data = data.filter(b => b.group.toLowerCase().includes(g));
      }
      return sendJson(200, { success: true, data });
    }

    // 10. Pharmacy API
    if (pathname === '/api/pharmacy' && req.method === 'GET') {
      let list = [...pharmacyProductsData];
      if (query.search) {
        const s = query.search.toLowerCase();
        list = list.filter(m => m.name.toLowerCase().includes(s) || m.generic.toLowerCase().includes(s));
      }
      return sendJson(200, { success: true, data: list });
    }

    if (pathname === '/api/pharmacy/order' && req.method === 'POST') {
      const body = await getBody();
      const order = {
        orderId: "VITAL-RX-" + Math.floor(100000 + Math.random() * 900000),
        recipient: body.recipient,
        phone: body.phone,
        address: body.address,
        items: body.items || [],
        total: body.total || 0,
        status: "Dispatched from VitalCare Pharmacy",
        eta: "Within 2 Hours",
        createdAt: new Date().toISOString()
      };
      pharmacyOrdersDb.push(order);
      return sendJson(201, { success: true, data: order });
    }

    // 11. Emergency Ambulance API
    if (pathname === '/api/emergency/ambulance' && req.method === 'POST') {
      const body = await getBody();
      const dispatch = {
        dispatchId: "VITAL-AMB-" + Math.floor(100000 + Math.random() * 900000),
        callerName: body.callerName || "Caller",
        callerPhone: body.callerPhone || "108",
        location: body.location || "Current Location",
        ambulanceNumber: "AP-28-EM-1080",
        driverName: "M. Rajesh",
        etaMinutes: Math.floor(5 + Math.random() * 4),
        status: "Ambulance Dispatched",
        timestamp: new Date().toISOString()
      };
      ambulanceDispatchesDb.push(dispatch);
      return sendJson(201, { success: true, data: dispatch });
    }

    // Static Server Fallback
    let filePath = path.join(publicDir, pathname === '/' ? 'index.html' : pathname);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(publicDir, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);

  } catch (err) {
    sendJson(500, { success: false, error: err.message || 'Internal Server Error' });
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const ALT_PORT = 9091;
    console.log(`Port ${PORT} busy, retrying on Port ${ALT_PORT}...`);
    server.listen(ALT_PORT);
  }
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log('==============================================================');
    console.log(`  🏥 VitalCare Healthcare Platform running at: http://localhost:${PORT}`);
    console.log(`  🌐 Direct Local IP:                          http://127.0.0.1:${PORT}`);
    console.log('==============================================================');
  });
}

module.exports = server;
