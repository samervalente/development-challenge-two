const patientService  = require("../services/patientService");

async function registerPatientData(req, res, next) {
 try{
    const requestBody = req.body;
  
  const response = await patientService.insertPatientData(requestBody);
  if(response?.error){
    const {statusCode} = response.error
    return res.status(statusCode).send(response.error)
  }  
  
  res.status(201).send("Patient registered successfully.");
 }catch(error){
   res.sendStatus(500)
 }
}

async function getAllPatients(req, res) {
  try {
      const patients = await patientService.getPatients()
      res.status(200).send({patients})
  } catch (error) {
      res.sendStatus(500)
  }
}

async function getPatientById(req, res) {
  try {
    const {id} = req.params
      const response = await patientService.getPatientById(id)
      if(response?.error){
        const {statusCode} = response.error
        return res.status(statusCode).send(response.error)
      }
      
      
      res.status(200).send(response)
  } catch (error) {
      res.sendStatus(500)
  }
}

async function updatePatientData(req, res) {
  try {
    const { id } = req.params;
    const {newPatientData} = req.body;
    
    const response = await patientService.updatePatientData(id, newPatientData);
    if (response?.error) {
      const { statusCode } = response.error;
      return res.status(statusCode).send(response.error);
    }
  
    return res.status(200).send("Patient updated successfully.");
  } catch (error) {
    res.sendStatus(500);
  }
}

module.exports = {registerPatientData, getAllPatients, getPatientById, updatePatientData}
