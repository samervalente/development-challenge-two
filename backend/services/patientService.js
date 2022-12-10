const { conflictError } = require("../utils/errorUtils");
const patientRepository = require("../repositories/patientRepository");

async function insertPatientData(requestBody) {
  const patient = await patientRepository.getPatientByEmail(requestBody.email);

  if (patient.Items.length > 0) {
    const error = conflictError("Patient already exists with this email.");
    return { error };
  }

  await patientRepository.insertPatientData(requestBody);
}

async function getPatients() {
  const patients = await patientRepository.getPatients();
  return patients;
}

module.exports = { insertPatientData, getPatients };
