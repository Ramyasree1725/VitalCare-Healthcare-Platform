/**
 * Pharmacy & Medicine Inventory Model
 */

const crypto = require("crypto");

const medicines = [
  { id: "med-01", name: "Amoxicillin 500mg", genericName: "Amoxicillin", category: "Antibiotics", price: 18.50, stock: 120, requiresPrescription: true, form: "Capsule", packSize: "30 capsules", description: "Broad-spectrum penicillin antibiotic used to treat bacterial infections." },
  { id: "med-02", name: "Atorvastatin 20mg", genericName: "Atorvastatin Calcium", category: "Cardiovascular", price: 24.00, stock: 85, requiresPrescription: true, form: "Tablet", packSize: "30 tablets", description: "HMG-CoA reductase inhibitor used to lower cholesterol and reduce cardiovascular risk." },
  { id: "med-03", name: "Metformin 500mg", genericName: "Metformin Hydrochloride", category: "Diabetes", price: 12.00, stock: 200, requiresPrescription: true, form: "Tablet", packSize: "60 tablets", description: "First-line medication for the treatment of type 2 diabetes mellitus." },
  { id: "med-04", name: "Ibuprofen 400mg", genericName: "Ibuprofen", category: "Pain Relief", price: 9.50, stock: 350, requiresPrescription: false, form: "Tablet", packSize: "20 tablets", description: "Nonsteroidal anti-inflammatory drug (NSAID) for fever, mild to moderate pain." },
  { id: "med-05", name: "Lisinopril 10mg", genericName: "Lisinopril", category: "Cardiovascular", price: 15.20, stock: 90, requiresPrescription: true, form: "Tablet", packSize: "30 tablets", description: "ACE inhibitor used to treat hypertension and heart failure." },
  { id: "med-06", name: "Albuterol Inhaler 90mcg", genericName: "Albuterol Sulfate", category: "Respiratory", price: 32.00, stock: 45, requiresPrescription: true, form: "Inhaler", packSize: "200 doses", description: "Bronchodilator for rapid relief of asthma and bronchospasm symptoms." },
  { id: "med-07", name: "Omeprazole 20mg", genericName: "Omeprazole", category: "Gastrointestinal", price: 14.80, stock: 110, requiresPrescription: false, form: "Capsule", packSize: "28 capsules", description: "Proton-pump inhibitor for acid reflux, heartburn and gastroesophageal reflux (GERD)." },
  { id: "med-08", name: "Vitamin D3 2000 IU", genericName: "Cholecalciferol", category: "Vitamins & Wellness", price: 11.00, stock: 180, requiresPrescription: false, form: "Softgel", packSize: "90 softgels", description: "High-potency essential vitamin supporting bone density and immune function." },
  { id: "med-09", name: "Cetirizine 10mg", genericName: "Cetirizine Hydrochloride", category: "Allergy", price: 8.50, stock: 140, requiresPrescription: false, form: "Tablet", packSize: "30 tablets", description: "Non-drowsy second-generation antihistamine for seasonal allergies and hay fever." }
];

const pharmacyOrders = [];

function generateOrderCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "RX-";
  for (let i = 0; i < 7; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const PharmacyStore = {
  listMedicines(query = {}) {
    let result = [...medicines];
    if (query.category) {
      result = result.filter(m => m.category.toLowerCase() === query.category.toLowerCase());
    }
    if (query.search) {
      const q = query.search.toLowerCase();
      result = result.filter(m => m.name.toLowerCase().includes(q) || m.genericName.toLowerCase().includes(q));
    }
    return result;
  },

  getMedicineById(id) {
    return medicines.find(m => m.id === id) || null;
  },

  getCategories() {
    return [...new Set(medicines.map(m => m.category))];
  },

  createOrder(payload) {
    const orderId = "order-" + Date.now();
    const orderCode = generateOrderCode();
    const items = payload.items || [];
    
    let subtotal = 0;
    const validatedItems = items.map(item => {
      const med = medicines.find(m => m.id === item.id);
      const qty = parseInt(item.quantity, 10) || 1;
      const price = med ? med.price : 10.0;
      subtotal += price * qty;
      return {
        id: item.id,
        name: med ? med.name : (item.name || "Medicine Item"),
        quantity: qty,
        unitPrice: price,
        total: price * qty
      };
    });

    const deliveryFee = subtotal > 50 ? 0 : 5.00;
    const total = subtotal + deliveryFee;

    const newOrder = {
      id: orderId,
      orderCode,
      customerName: payload.customerName || "Valued Patient",
      email: payload.email,
      phone: payload.phone,
      deliveryAddress: payload.deliveryAddress || "Standard Home Delivery",
      items: validatedItems,
      subtotal: parseFloat(subtotal.toFixed(2)),
      deliveryFee: parseFloat(deliveryFee.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      paymentMethod: payload.paymentMethod || "Cash on Delivery",
      status: "processing",
      estimatedDelivery: "1-2 Business Days",
      createdAt: new Date().toISOString()
    };

    pharmacyOrders.push(newOrder);
    return newOrder;
  },

  getOrder(codeOrId) {
    return pharmacyOrders.find(o => o.orderCode === codeOrId.toUpperCase() || o.id === codeOrId) || null;
  }
};

module.exports = { PharmacyStore, medicines, pharmacyOrders };
