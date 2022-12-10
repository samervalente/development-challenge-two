const { insertPatientData } = require("../services/patientService");

async function registerPatientData(req, res) {
  const requestBody = req.body;
  await insertPatientData(requestBody);
  res.status(201).send("Patient registered successfully.");
}

module.exports(registerPatientData);
