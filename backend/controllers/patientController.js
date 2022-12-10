const patientService = require("../services/patientService");

async function registerPatientData(req, res) {
  const requestBody = req.body;
  await patientService.insertPatientData(requestBody);
  res.status(201).send("Patient registered successfully.");
}

async function getAllPatients(req, res, next) {
  try {
      const patients = await patientService.getPatients()
      res.status(200).send({patients})
  } catch (error) {
      next(error)
  }
}

async function getPatientById(req, res) {
  try {
    const {id} = req.params
      const response = await patientService.getPatientById(id)
      if(response.error){
        const {statusCode} = response.error
        return res.status(statusCode).send(response.error)
      }
      
      
      res.status(200).send({patients: response})
  } catch (error) {
      res.sendStatus(500)
  }
}

module.exports(registerPatientData, getAllPatients, getPatientById);
