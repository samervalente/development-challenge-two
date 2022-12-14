const {wrongSchemaError} = require ("../utils/errorUtils.js")
const {updatePatientSchema} = require("../schemas/patientSchema")

async function validatePatientRequestBody(req, res, next){
    const {birthDate} = req.body
    if(typeof birthDate !== 'string'){
      const error = wrongSchemaError("birthDate must be a string")
      return res.status(error.statusCode).send(error)
    }
    
    next()
}

async function validatePatientUpdateRequestBody(req, res, next){
  const {newPatientData} = req.body
  for(const newData of newPatientData){
    const {updateKey, updateValue} = newData
    const updateData = {[updateKey]: updateValue}
    const { error } = updatePatientSchema.validate(updateData, {abortEarly:false});

    if (error) {
      const errors = error.details.map((detail) => (detail.message).replaceAll('"', ""));
      res.status(422).send(errors)
      
    }
  }
  
  next()
}

module.exports = {validatePatientRequestBody, validatePatientUpdateRequestBody}