/**
 * Notification and message template builders for patients and staff
 */

function appointmentRequestReceived(appt) {
  return {
    subject: `Appointment Request Received - ${appt.confirmationCode}`,
    body: [
      `Dear ${appt.patientName},`,
      ``,
      `We have received your appointment request.`,
      ``,
      `Confirmation Code: ${appt.confirmationCode}`,
      `Department: ${appt.department}`,
      `Preferred Date: ${appt.preferredDate}`,
      `Preferred Time: ${appt.preferredTime}`,
      ``,
      `Our team will review and confirm within 24 hours.`,
      ``,
      `Thank you for choosing VitalCare.`,
      `VitalCare Patient Services`
    ].join("\n")
  };
}

function appointmentConfirmed(appt) {
  return {
    subject: `Appointment Confirmed - ${appt.confirmationCode}`,
    body: [
      `Dear ${appt.patientName},`,
      ``,
      `Your appointment has been confirmed.`,
      ``,
      `Confirmation Code: ${appt.confirmationCode}`,
      `Department: ${appt.department}`,
      `Date: ${appt.preferredDate}`,
      `Time: ${appt.preferredTime}`,
      ``,
      `Please arrive 15 minutes early and bring a photo ID and insurance card.`,
      ``,
      `To reschedule or cancel, contact us at least 24 hours in advance.`,
      ``,
      `VitalCare Clinic`
    ].join("\n")
  };
}

function appointmentCancelled(appt, reason) {
  return {
    subject: `Appointment Cancelled - ${appt.confirmationCode}`,
    body: [
      `Dear ${appt.patientName},`,
      ``,
      `Your appointment (${appt.confirmationCode}) on ${appt.preferredDate} at ${appt.preferredTime} has been cancelled.`,
      reason ? `Reason: ${reason}` : "",
      ``,
      `You may book a new appointment anytime through our website or by calling us.`,
      ``,
      `VitalCare Patient Services`
    ].join("\n")
  };
}

function appointmentReminder(appt) {
  return {
    subject: `Reminder: Appointment Tomorrow - ${appt.confirmationCode}`,
    body: [
      `Dear ${appt.patientName},`,
      ``,
      `This is a friendly reminder of your upcoming appointment.`,
      ``,
      `Date: ${appt.preferredDate}`,
      `Time: ${appt.preferredTime}`,
      `Department: ${appt.department}`,
      `Code: ${appt.confirmationCode}`,
      ``,
      `Please arrive 15 minutes early.`,
      ``,
      `VitalCare`
    ].join("\n")
  };
}

function welcomePatient(patient) {
  return {
    subject: "Welcome to VitalCare",
    body: [
      `Dear ${patient.firstName},`,
      ``,
      `Welcome to VitalCare. Your patient profile has been created successfully.`,
      ``,
      `You can now book appointments, view your records, and message your care team through the patient portal.`,
      ``,
      `If you have questions, reply to this email or call our support line.`,
      ``,
      `We're glad to have you with us.`,
      `The VitalCare Team`
    ].join("\n")
  };
}

module.exports = {
  appointmentRequestReceived,
  appointmentConfirmed,
  appointmentCancelled,
  appointmentReminder,
  welcomePatient
};
