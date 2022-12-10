const {wrongSchemaError} = require ("../utils/errorUtils.js")

async function validatePatientRequestBody(req, res, next){
    const {birthDate} = req.body
    if(typeof birthDate !== 'string'){
      const error = wrongSchemaError("birthDate must be a string")
      return res.status(error.statusCode).send(error)
    }
    
    next()
}

module.exports = validatePatientRequestBody