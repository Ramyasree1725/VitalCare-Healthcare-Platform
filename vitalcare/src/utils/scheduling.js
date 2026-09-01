/**
 * Appointment scheduling helpers - slot generation, conflict detection, availability
 */

const SLOT_DURATION_MINUTES = 30;
const BUFFER_MINUTES = 5;

function parseTime(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

function formatTime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function generateDaySlots(openTime, closeTime, slotMinutes = SLOT_DURATION_MINUTES) {
  const slots = [];
  let current = parseTime(openTime);
  const end = parseTime(closeTime);
  while (current + slotMinutes <= end) {
    slots.push({
      start: formatTime(current),
      end: formatTime(current + slotMinutes),
      available: true
    });
    current += slotMinutes;
  }
  return slots;
}

function isSlotAvailable(existingAppointments, date, startTime, durationMin = 30) {
  const start = parseTime(startTime);
  const end = start + durationMin;
  for (const appt of existingAppointments) {
    if (appt.preferredDate !== date) continue;
    const aStart = parseTime(appt.preferredTime);
    const aEnd = aStart + (appt.durationMin || 30);
    if (start < aEnd + BUFFER_MINUTES && end + BUFFER_MINUTES > aStart) {
      return false;
    }
  }
  return true;
}

function findNextAvailableSlot(existingAppointments, date, openTime, closeTime) {
  const slots = generateDaySlots(openTime, closeTime);
  for (const slot of slots) {
    if (isSlotAvailable(existingAppointments, date, slot.start)) {
      return slot;
    }
  }
  return null;
}

function getWeekdayName(dateStr) {
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const d = new Date(dateStr + "T12:00:00");
  return days[d.getDay()];
}

function isWorkingDay(dateStr, workingHours) {
  const day = getWeekdayName(dateStr);
  const hours = workingHours[day];
  return hours && hours.open && hours.close;
}

function suggestAppointmentDates(workingHours, daysAhead = 14) {
  const suggestions = [];
  const today = new Date();
  for (let i = 1; i <= daysAhead; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    if (isWorkingDay(dateStr, workingHours)) {
      const day = getWeekdayName(dateStr);
      suggestions.push({
        date: dateStr,
        dayName: day,
        open: workingHours[day].open,
        close: workingHours[day].close
      });
    }
  }
  return suggestions;
}

module.exports = {
  generateDaySlots,
  isSlotAvailable,
  findNextAvailableSlot,
  getWeekdayName,
  isWorkingDay,
  suggestAppointmentDates,
  parseTime,
  formatTime,
  SLOT_DURATION_MINUTES
};
