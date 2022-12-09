const patientRepository = require("../repositories/patientRepository");


async function registerPatientData(requestBody) {
    try {
        const validationResponse = await validateSchema(patientSchema, requestBody);
        if(validationResponse.error){
          return buildResponse(422, validationResponse);
        }
       
        const patient = await patientRepository.getPatientByEmail(requestBody.email);
        
        if (patient.Items.length > 0) {
          const {statusCode, errorType, message } = conflictError('Patient already exists with this email.');
          const response = {errorData: {statusCode, errorType, message}} ;
          return buildResponse(statusCode, response);
        }
        
      await patientRepository.insertPatientData(requestBody);
      const response = {
        Message: "Patient registered successfully.",
        PatientData: requestBody,
      };
  
      return buildResponse(201, response);
    } catch (error) {
      return internalServerError(error);
    }
  }