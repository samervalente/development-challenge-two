const { insertPatientData } = require("../services/patientService");

async function registerPatientData(req, res) {
  const requestBody = req.body;
  await insertPatientData(requestBody);
  res.status(201).send("Patient registered successfully.");
}

async function getAllPatients(req, res, next) {
  try {
      const patients = await getPatients()
      res.status(200).send({patients})
  } catch (error) {
      next(error)
  }
}

module.exports(registerPatientData, getAllPatients);
