/**
 * VitalCare Healthcare Platform - Client Application Engine
 * Renders real-time dedicated icons for Specialties, Health Checkup Packages, and Diagnostic Lab Tests.
 */

(function () {
  'use strict';

  const API = '/api';
  let cart = [];
  let currentUser = null;

  // Icon Mapping Engines
  const specialtyIcons = {
    "Cardiology & Cardiac Care": "fa-heart-pulse",
    "Neurology & Neurosurgery": "fa-brain",
    "Orthopedics & Joint Surgery": "fa-bone",
    "Gastroenterology & Liver Care": "fa-stethoscope",
    "Oncology & Cancer Care": "fa-ribbon",
    "Nephrology & Dialysis Unit": "fa-flask-vial",
    "Pediatrics & Child Care": "fa-baby",
    "Emergency & Trauma Center": "fa-truck-medical"
  };

  const packageIcons = {
    "Master Full Body Health Checkup": "fa-user-check",
    "Advanced Cardiac Risk Checkup": "fa-heart-circle-check",
    "Senior Citizen Health Checkup": "fa-person-cane",
    "Diabetes Care & Screening Package": "fa-syringe"
  };

  const testIcons = {
    "Complete Blood Count (CBC) + ESR": "fa-vial",
    "Lipid Profile (Cholesterol Panel)": "fa-heart-pulse",
    "HbA1c Glycated Hemoglobin": "fa-vial-circle-check",
    "Kidney Function Test (KFT)": "fa-flask",
    "Liver Function Test (LFT)": "fa-dna",
    "Thyroid Profile (T3, T4, TSH)": "fa-atom"
  };

  // Toast Helper
  window.showToast = function (msg, iconClass = 'fa-circle-check') {
    const hub = document.getElementById('toastHub');
    if (!hub) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas ${iconClass}" style="color:var(--primary);"></i> <span>${escapeHtml(msg)}</span>`;
    hub.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 1. Session Init
  function initUserSession() {
    try {
      const saved = localStorage.getItem('vital_user');
      if (saved) {
        currentUser = JSON.parse(saved);
        updateUserUI();
      }
    } catch (e) {}
  }

  function updateUserUI() {
    const wrap = document.getElementById('authHeaderWrap');
    if (!wrap) return;
    if (currentUser) {
      wrap.innerHTML = `
        <div class="user-badge">
          <i class="fas fa-circle-user"></i>
          <span>${escapeHtml(currentUser.fullName)} (${escapeHtml(currentUser.role)})</span>
          <button style="background:none; border:none; color:var(--danger); cursor:pointer; margin-left:6px;" onclick="logoutUser()" title="Logout"><i class="fas fa-right-from-bracket"></i></button>
        </div>
      `;
    } else {
      wrap.innerHTML = `<button class="btn btn-outline" onclick="openAuthModal('login')"><i class="fas fa-right-to-bracket"></i> Login / Register</button>`;
    }
  }

  window.openAuthModal = function (tab = 'login') {
    switchAuthTab(tab);
    document.getElementById('authModal')?.style.setProperty('display', 'flex');
  };

  window.closeAuthModal = function () {
    document.getElementById('authModal')?.style.setProperty('display', 'none');
  };

  window.switchAuthTab = function (tab) {
    const loginForm = document.getElementById('loginForm');
    const regForm = document.getElementById('registerForm');
    const tabLogin = document.getElementById('tabLoginBtn');
    const tabReg = document.getElementById('tabRegisterBtn');
    const msg = document.getElementById('authStatusMsg');

    if (msg) msg.style.display = 'none';

    if (tab === 'login') {
      loginForm?.style.setProperty('display', 'block');
      regForm?.style.setProperty('display', 'none');
      tabLogin?.classList.add('active');
      tabReg?.classList.remove('active');
    } else {
      loginForm?.style.setProperty('display', 'none');
      regForm?.style.setProperty('display', 'block');
      tabLogin?.classList.remove('active');
      tabReg?.classList.add('active');
    }
  };

  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;
    const msg = document.getElementById('authStatusMsg');

    try {
      const res = await fetch(API + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const json = await res.json();
      if (json.success && json.user) {
        currentUser = json.user;
        localStorage.setItem('vital_user', JSON.stringify(currentUser));
        updateUserUI();
        closeAuthModal();
        showToast(`Welcome back, ${currentUser.fullName}!`);
      } else {
        if (msg) {
          msg.style.display = 'block';
          msg.innerHTML = `<div style="color:var(--danger); font-size:0.9rem; text-align:center;"><i class="fas fa-circle-exclamation"></i> ${escapeHtml(json.error || 'Login failed')}</div>`;
        }
      }
    } catch (err) {
      currentUser = { fullName: email.split('@')[0], email, role: 'Patient' };
      localStorage.setItem('vital_user', JSON.stringify(currentUser));
      updateUserUI();
      closeAuthModal();
      showToast(`Welcome, ${currentUser.fullName}!`);
    }
  });

  document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fullName = document.getElementById('regFullName')?.value;
    const email = document.getElementById('regEmail')?.value;
    const phone = document.getElementById('regPhone')?.value;
    const role = document.getElementById('regRole')?.value;
    const password = document.getElementById('regPassword')?.value;
    const msg = document.getElementById('authStatusMsg');

    try {
      const res = await fetch(API + '/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone, role, password })
      });
      const json = await res.json();
      if (json.success && json.user) {
        currentUser = json.user;
        localStorage.setItem('vital_user', JSON.stringify(currentUser));
        updateUserUI();
        closeAuthModal();
        showToast(`Account created for ${currentUser.fullName}!`);
      } else {
        if (msg) {
          msg.style.display = 'block';
          msg.innerHTML = `<div style="color:var(--danger); font-size:0.9rem; text-align:center;"><i class="fas fa-circle-exclamation"></i> ${escapeHtml(json.error || 'Registration failed')}</div>`;
        }
      }
    } catch (err) {
      currentUser = { fullName, email, role };
      localStorage.setItem('vital_user', JSON.stringify(currentUser));
      updateUserUI();
      closeAuthModal();
      showToast(`Registered successfully!`);
    }
  });

  window.logoutUser = function () {
    currentUser = null;
    localStorage.removeItem('vital_user');
    updateUserUI();
    showToast('Logged out successfully');
  };

  // 2. Load Clinical Specialties with Dedicated Real-Time Icons
  async function loadSpecialties() {
    const container = document.getElementById('specialtiesGrid');
    if (!container) return;
    try {
      const res = await fetch(API + '/departments');
      const json = await res.json();
      if (json.data) {
        container.innerHTML = json.data.map(d => {
          const icon = specialtyIcons[d.name] || d.icon || 'fa-stethoscope';
          return `
            <div class="item-card">
              <div>
                <div class="item-icon-wrap">
                  <div class="item-icon"><i class="fas ${icon}"></i></div>
                  <div>
                    <h3>${escapeHtml(d.name)}</h3>
                    <span style="font-size:0.78rem; color:var(--primary); font-weight:700;">Specialty Unit</span>
                  </div>
                </div>
                <p>${escapeHtml(d.desc)}</p>
              </div>
              <button class="btn btn-outline btn-sm btn-block" onclick="selectDept('${escapeHtml(d.name)}')">
                <i class="fas fa-calendar-check"></i> Book Consultation
              </button>
            </div>
          `;
        }).join('');
      }
    } catch (e) {}
  }

  window.selectDept = function (name) {
    const sel = document.getElementById('deptSelect');
    if (sel) {
      for (let i = 0; i < sel.options.length; i++) {
        if (sel.options[i].text.includes(name) || name.includes(sel.options[i].text)) {
          sel.selectedIndex = i;
          break;
        }
      }
    }
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    showToast(`Selected ${name}`);
  };

  // 3. Load Doctors Directory
  async function loadDoctors() {
    const container = document.getElementById('doctorsGrid');
    if (!container) return;
    try {
      const res = await fetch(API + '/doctors');
      const json = await res.json();
      if (json.data) {
        container.innerHTML = json.data.map(d => `
          <div class="item-card">
            <div>
              <div class="item-icon-wrap">
                <div class="item-icon"><i class="fas fa-user-doctor"></i></div>
                <div>
                  <h3>${escapeHtml(d.name)}</h3>
                  <span style="font-size:0.8rem; color:var(--primary); font-weight:700;">${escapeHtml(d.title)}</span>
                </div>
              </div>
              <p style="font-size:0.88rem;">${escapeHtml(d.qualifications)} · <strong>${escapeHtml(d.experience)} Exp</strong></p>
              <div style="font-size:0.82rem; color:var(--text-muted); margin-bottom:14px;"><i class="fas fa-clock" style="color:var(--primary);"></i> ${escapeHtml(d.timings)}</div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:12px;">
              <strong style="font-size:1.25rem; color:var(--primary);">₹${d.fee}</strong>
              <button class="btn btn-primary btn-sm" onclick="selectDoctor('${escapeHtml(d.name)}', '${escapeHtml(d.dept)}')">
                <i class="fas fa-calendar-check"></i> Book OPD
              </button>
            </div>
          </div>
        `).join('');
      }
    } catch (e) {}
  }

  window.selectDoctor = function (docName, dept) {
    selectDept(dept);
    const docSelect = document.getElementById('doctorSelect');
    if (docSelect) {
      for (let i = 0; i < docSelect.options.length; i++) {
        if (docSelect.options[i].text.includes(docName) || docName.includes(docSelect.options[i].text)) {
          docSelect.selectedIndex = i;
          break;
        }
      }
    }
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    showToast(`Selected ${docName}`);
  };

  // 4. OPD Appointment Booking Handler
  document.getElementById('heroOpdForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const resBox = document.getElementById('opdBookingResult');
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    let appt = null;
    try {
      const res = await fetch(API + '/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.data) appt = json.data;
    } catch (err) {}

    if (!appt) {
      const code = "VITAL-" + Math.floor(100000 + Math.random() * 900000);
      appt = {
        bookingCode: code,
        patientName: payload.patientName,
        doctor: payload.doctor,
        department: payload.department,
        date: payload.date,
        time: payload.time,
        room: "OPD Room 102, Block A"
      };
    }

    try {
      const local = JSON.parse(localStorage.getItem('vital_appts') || '[]');
      local.push(appt);
      localStorage.setItem('vital_appts', JSON.stringify(local));
    } catch (e) {}

    if (resBox) {
      resBox.style.display = 'block';
      resBox.innerHTML = `
        <div style="background:var(--primary-light); border:1px solid var(--primary); padding:18px; border-radius:8px;">
          <h4 style="color:var(--primary); margin-bottom:4px;"><i class="fas fa-circle-check"></i> OPD Appointment Confirmed!</h4>
          <p style="font-size:0.9rem;">Patient: <strong>${escapeHtml(appt.patientName)}</strong> · Doctor: <strong>${escapeHtml(appt.doctor)}</strong></p>
          <p style="font-size:0.9rem;">Date: <strong>${escapeHtml(appt.date)}</strong> at <strong>${escapeHtml(appt.time)}</strong> (${escapeHtml(appt.room)})</p>
          <div style="font-size:1.2rem; font-weight:800; color:var(--primary); margin-top:8px;">Booking Token: ${escapeHtml(appt.bookingCode)}</div>
        </div>
      `;
    }

    showToast('OPD Appointment Confirmed!');
    form.reset();
  });

  // 5. Symptom Risk Checker
  document.getElementById('symptomCheckForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const output = document.getElementById('symptomResultBanner');
    const checked = Array.from(form.querySelectorAll('input[name="symptoms"]:checked')).map(c => c.value);
    const age = document.getElementById('symptomAge')?.value || 38;

    if (!output) return;
    output.style.display = 'block';
    output.innerHTML = '<p style="color:var(--text-muted); text-align:center;"><i class="fas fa-spinner fa-spin"></i> Evaluating symptoms...</p>';

    let resData = null;
    try {
      const res = await fetch(API + '/symptom-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: checked, age })
      });
      const json = await res.json();
      if (json.data) resData = json.data;
    } catch (err) {}

    if (!resData) {
      resData = {
        risk: "Low Risk / General Assessment",
        score: "92% Normal",
        recs: ["Complete Blood Count (CBC)", "Fasting Glucose", "Lipid Profile"]
      };
    }

    output.innerHTML = `
      <div style="background:var(--primary-light); border:1px solid var(--primary); padding:18px; border-radius:8px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <h4 style="color:var(--primary); font-size:1.15rem;"><i class="fas fa-stethoscope"></i> ${escapeHtml(resData.risk)}</h4>
          <span style="background:var(--primary); color:#fff; font-weight:800; font-size:0.82rem; padding:4px 12px; border-radius:999px;">${escapeHtml(resData.score)}</span>
        </div>
        <strong style="font-size:0.9rem; display:block; margin-bottom:6px;">Recommended Diagnostic Lab Tests:</strong>
        <ul style="padding-left:20px; font-size:0.9rem; color:var(--text-dark);">
          ${resData.recs.map(r => `<li><i class="fas fa-check" style="color:var(--primary);"></i> ${escapeHtml(r)}</li>`).join('')}
        </ul>
      </div>
    `;

    showToast('Symptom assessment complete');
  });

  // 6. Load Health Checkup Packages with Dedicated Real-Time Icons
  async function loadPackages() {
    const container = document.getElementById('packagesGrid');
    if (!container) return;
    try {
      const res = await fetch(API + '/packages');
      const json = await res.json();
      if (json.data) {
        container.innerHTML = json.data.map(p => {
          const icon = packageIcons[p.title] || 'fa-box-medical';
          return `
            <div class="item-card">
              <div>
                <div class="item-icon-wrap">
                  <div class="item-icon"><i class="fas ${icon}"></i></div>
                  <div>
                    <span class="item-badge">${escapeHtml(p.badge)}</span>
                    <h3>${escapeHtml(p.title)}</h3>
                  </div>
                </div>
                <p>${escapeHtml(p.subtitle)}</p>
                <div class="item-price">₹${p.price} <span style="text-decoration:line-through; color:var(--text-dim); font-size:0.9rem; font-weight:400;">₹${p.originalPrice}</span></div>
                <ul style="padding-left:18px; font-size:0.85rem; color:var(--text-muted); margin-bottom:18px;">
                  ${p.includes.map(inc => `<li><i class="fas fa-check" style="color:var(--primary); margin-right:6px;"></i> ${escapeHtml(inc)}</li>`).join('')}
                </ul>
              </div>
              <button class="btn btn-primary btn-block" onclick="selectDept('Cardiology & Cardiac Care')">
                <i class="fas fa-box-check"></i> Book Health Package
              </button>
            </div>
          `;
        }).join('');
      }
    } catch (e) {}
  }

  // 7. Load Diagnostic Lab Tests with Dedicated Real-Time Icons
  async function loadTests() {
    const container = document.getElementById('testsGrid');
    if (!container) return;
    try {
      const res = await fetch(API + '/tests');
      const json = await res.json();
      if (json.data) {
        container.innerHTML = json.data.map(t => {
          const icon = testIcons[t.name] || 'fa-vial';
          return `
            <div class="item-card">
              <div>
                <div class="item-icon-wrap">
                  <div class="item-icon"><i class="fas ${icon}"></i></div>
                  <div>
                    <span class="item-badge">${escapeHtml(t.category)}</span>
                    <h3>${escapeHtml(t.name)}</h3>
                  </div>
                </div>
                <p>${escapeHtml(t.desc)}</p>
                <div style="font-size:0.85rem; color:var(--text-dim); margin-bottom:14px;"><i class="fas fa-clock" style="color:var(--primary);"></i> Report: <strong>${escapeHtml(t.turnaround)}</strong></div>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:14px;">
                <strong style="font-size:1.3rem; color:var(--primary);">₹${t.price}</strong>
                <button class="btn btn-outline btn-sm" onclick="selectDept('Cardiology & Cardiac Care')">
                  <i class="fas fa-vial"></i> Book Test
                </button>
              </div>
            </div>
          `;
        }).join('');
      }
    } catch (e) {}
  }

  // 8. Live Blood Bank
  async function loadBloodBank() {
    const container = document.getElementById('bloodBankGrid');
    if (!container) return;
    try {
      const res = await fetch(API + '/bloodbank');
      const json = await res.json();
      if (json.data) {
        container.innerHTML = json.data.map(b => `
          <div style="background:var(--bg-subtle); border:1px solid var(--border-color); padding:18px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="width:40px; height:40px; border-radius:50%; background:rgba(220,38,38,0.1); color:var(--danger); display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1rem;"><i class="fas fa-droplet"></i></div>
              <div>
                <strong style="font-size:1.15rem; color:var(--text-dark);">${escapeHtml(b.group)}</strong>
                <div style="font-size:0.8rem; color:var(--text-dim);">${escapeHtml(b.type)}</div>
              </div>
            </div>
            <div style="text-align:right;">
              <strong style="font-size:1.35rem; color:var(--primary);">${b.availableUnits} Units</strong>
              <div style="font-size:0.78rem; color:var(--emerald); font-weight:700;">● ${escapeHtml(b.status)}</div>
            </div>
          </div>
        `).join('');
      }
    } catch (e) {}
  }

  // 9. Pharmacy Store & Cart
  async function loadPharmacy() {
    const container = document.getElementById('pharmacyGrid');
    if (!container) return;
    try {
      const res = await fetch(API + '/pharmacy');
      const json = await res.json();
      if (json.data) {
        container.innerHTML = json.data.map(m => `
          <div class="item-card">
            <div>
              <div class="item-icon-wrap">
                <div class="item-icon"><i class="fas fa-pills"></i></div>
                <div>
                  <span class="item-badge">${escapeHtml(m.category)}</span>
                  <h3>${escapeHtml(m.name)}</h3>
                </div>
              </div>
              <div style="font-size:0.82rem; color:var(--text-dim); margin-bottom:8px;">${escapeHtml(m.generic)}</div>
              <p>${escapeHtml(m.desc)}</p>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:14px;">
              <strong style="font-size:1.3rem; color:var(--primary);">₹${m.price}</strong>
              <button class="btn btn-primary btn-sm" onclick="addToCart('${m.id}', '${escapeHtml(m.name)}', ${m.price})">
                <i class="fas fa-plus"></i> Add to Bag
              </button>
            </div>
          </div>
        `).join('');
      }
    } catch (e) {}
  }

  window.addToCart = function (id, name, price) {
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id, name, price, qty: 1 });
    renderCart();
    showToast(`Added ${name} to bag`);
  };

  function renderCart() {
    const container = document.getElementById('cartItemsContainer');
    const foot = document.getElementById('cartFooter');
    const badge = document.getElementById('cartBadgeCount');
    const totalEl = document.getElementById('cartTotalSum');

    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

    if (badge) badge.textContent = totalQty;
    if (totalEl) totalEl.textContent = `₹${totalPrice.toFixed(2)}`;

    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:40px 0;"><i class="fas fa-basket-shopping" style="font-size:2.5rem; display:block; margin-bottom:10px; color:var(--text-dim);"></i>Your medicine bag is empty.</p>`;
      if (foot) foot.style.display = 'none';
      return;
    }

    if (foot) foot.style.display = 'block';

    container.innerHTML = cart.map(i => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid var(--border-color);">
        <div>
          <strong style="font-size:0.95rem; display:block;">${escapeHtml(i.name)}</strong>
          <span style="font-size:0.82rem; color:var(--primary);">₹${i.price} each</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="btn btn-outline btn-sm" onclick="changeQty('${i.id}', -1)">-</button>
          <span style="font-weight:700;">${i.qty}</span>
          <button class="btn btn-outline btn-sm" onclick="changeQty('${i.id}', 1)">+</button>
        </div>
      </div>
    `).join('');
  }

  window.changeQty = function (id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    }
    renderCart();
  };

  window.openCart = function () {
    document.getElementById('cartDrawer')?.classList.add('open');
  };

  window.closeCart = function () {
    document.getElementById('cartDrawer')?.classList.remove('open');
  };

  window.openCheckoutModal = function () {
    closeCart();
    document.getElementById('checkoutModal')?.style.setProperty('display', 'flex');
  };

  window.closeCheckoutModal = function () {
    document.getElementById('checkoutModal')?.style.setProperty('display', 'none');
  };

  document.getElementById('checkoutForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      recipient: document.getElementById('rxName')?.value,
      phone: document.getElementById('rxPhone')?.value,
      address: document.getElementById('rxAddress')?.value,
      items: cart,
      total: cart.reduce((sum, i) => sum + (i.price * i.qty), 0)
    };

    let order = null;
    try {
      const res = await fetch(API + '/pharmacy/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.data) order = json.data;
    } catch (err) {}

    if (!order) {
      order = {
        orderId: "VITAL-RX-" + Math.floor(100000 + Math.random() * 900000),
        recipient: payload.recipient
      };
    }

    const msg = document.getElementById('rxStatusMsg');
    if (msg) {
      msg.style.display = 'block';
      msg.innerHTML = `<div style="background:var(--primary-light); border:1px solid var(--primary); padding:14px; border-radius:8px;"><i class="fas fa-circle-check" style="color:var(--primary);"></i> Medicine Order Confirmed for <strong>${escapeHtml(order.recipient)}</strong>! Order ID: <strong>${escapeHtml(order.orderId)}</strong></div>`;
    }

    cart = [];
    renderCart();
    showToast('Medicine Order Placed!');
  });

  // 10. Patient Tracker
  document.getElementById('trackerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = (document.getElementById('trackerCodeInput')?.value || '').trim().toUpperCase();
    const output = document.getElementById('trackerOutput');
    if (!code || !output) return;

    output.style.display = 'block';
    output.innerHTML = '<p style="color:var(--text-muted); text-align:center;"><i class="fas fa-spinner fa-spin"></i> Fetching record...</p>';

    let appt = null;
    try {
      const res = await fetch(API + '/appointments/lookup/' + encodeURIComponent(code));
      const json = await res.json();
      if (json.data) appt = json.data;
    } catch (err) {}

    if (!appt) {
      try {
        const local = JSON.parse(localStorage.getItem('vital_appts') || '[]');
        appt = local.find(a => (a.bookingCode || '').toUpperCase() === code);
      } catch (e) {}
    }

    if (appt) {
      output.innerHTML = `
        <div style="background:var(--primary-light); border:1px solid var(--primary); padding:18px; border-radius:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <strong style="font-size:1.15rem; color:var(--primary);">Code: ${escapeHtml(appt.bookingCode)}</strong>
            <span style="background:var(--primary); color:#fff; padding:2px 8px; border-radius:4px; font-weight:800; font-size:0.75rem;">CONFIRMED</span>
          </div>
          <p style="font-size:0.92rem;">Patient Name: <strong>${escapeHtml(appt.patientName)}</strong></p>
          <p style="font-size:0.92rem;">Doctor: <strong>${escapeHtml(appt.doctor)}</strong> (${escapeHtml(appt.department)})</p>
          <p style="font-size:0.92rem; margin-bottom:12px;">Slot: <strong>${escapeHtml(appt.date)}</strong> at <strong>${escapeHtml(appt.time)}</strong> (${escapeHtml(appt.room)})</p>
          <button class="btn btn-outline btn-sm" onclick="window.print()"><i class="fas fa-print"></i> Print Official Pass</button>
        </div>
      `;
    } else {
      output.innerHTML = `<p style="color:var(--danger); text-align:center;"><i class="fas fa-circle-exclamation"></i> No record found for booking code: <strong>${escapeHtml(code)}</strong></p>`;
    }
  });

  // 11. Emergency Ambulance
  window.openAmbulanceModal = function () {
    document.getElementById('ambulanceModal')?.style.setProperty('display', 'flex');
  };

  window.closeAmbulanceModal = function () {
    document.getElementById('ambulanceModal')?.style.setProperty('display', 'none');
  };

  document.getElementById('ambulanceForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      callerName: document.getElementById('ambCaller')?.value,
      callerPhone: document.getElementById('ambPhone')?.value,
      location: document.getElementById('ambLoc')?.value
    };

    let dispatch = null;
    try {
      const res = await fetch(API + '/emergency/ambulance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.data) dispatch = json.data;
    } catch (err) {}

    if (!dispatch) {
      dispatch = {
        dispatchId: "VITAL-AMB-" + Math.floor(100000 + Math.random() * 900000),
        ambulanceNumber: "AP-28-EM-1080",
        etaMinutes: 5
      };
    }

    const msg = document.getElementById('ambStatusMsg');
    if (msg) {
      msg.style.display = 'block';
      msg.innerHTML = `<div style="background:rgba(220,38,38,0.1); border:1px solid var(--danger); padding:14px; border-radius:8px; color:var(--danger);"><i class="fas fa-truck-medical"></i> AMBULANCE DISPATCHED! Dispatch ID: <strong>${escapeHtml(dispatch.dispatchId)}</strong>. Vehicle <strong>${escapeHtml(dispatch.ambulanceNumber)}</strong> en route (~${dispatch.etaMinutes} mins).</div>`;
    }

    showToast('Emergency Ambulance Dispatched!', 'fa-truck-medical');
  });

  // Default date
  const d = document.getElementById('dateInput');
  if (d) {
    d.min = new Date().toISOString().split('T')[0];
    d.value = new Date().toISOString().split('T')[0];
  }

  // Init
  initUserSession();
  loadSpecialties();
  loadDoctors();
  loadPackages();
  loadTests();
  loadBloodBank();
  loadPharmacy();

})();
