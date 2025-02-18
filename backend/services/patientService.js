const { conflictError, notFoundError } = require("../utils/errorUtils");
const patientRepository = require("../repositories/patientRepository");

async function insertPatientData(requestBody) {
  const {Items} = await patientRepository.getPatientByEmail(requestBody.email);

  if (Items.length > 0) {
       const error = conflictError("Patient already exists with this email.");
      return { error };
  }

  return await patientRepository.insertPatientData(requestBody);
}

async function getPatients() {
  const patients = await patientRepository.getPatients()
  return patients
}

async function getPatientById(patientId){
  const {Item} = await patientRepository.getPatientById(patientId);
  
  if(!Item){
    const error = notFoundError("Patient not found");
     return { error };
  }

  return Item
}

async function updatePatientData(patientId, newPatientData){
  const {Item} = await patientRepository.getPatientById(patientId);
  
  if(!Item){
    const error = notFoundError("Patient not found");
     return { error };
  }

  const newEmailUpdateValue = newPatientData.find(newValue => newValue.updateKey === "email")

  if(newEmailUpdateValue?.updateKey === "email"){
       const {Items} = await patientRepository.getPatientByEmail(newEmailUpdateValue.updateValue);

  if (Items?.length > 0 && Items[0].patientId !== patientId) {
       const error = conflictError("Patient already exists with this email.");
      return { error };
  }
  
  }
 
  
  return await patientRepository.updatePatientData(patientId, newPatientData)
}


async function deletePatientData(patients){


    for(let patientId of patients){
      const {Item} = await patientRepository.getPatientById(patientId);
  
  if(!Item){
    const error = notFoundError("Patient not found");
     return { error };
  }
    }
     return await patientRepository.deletePatientData(patients);
   
}

module.exports = { insertPatientData, getPatients, getPatientById, updatePatientData, deletePatientData };
