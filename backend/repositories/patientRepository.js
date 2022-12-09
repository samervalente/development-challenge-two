const dynamoClient = require("../config/dynamo");
const dynamoDBTableName = "patients";
const { v4: uuidv4 } = require("uuid");

async function getPatientByEmail(patientEmail) {
  const params = {
    TableName: dynamoDBTableName,
    FilterExpression: `email = :emailValue`,
    ExpressionAttributeValues: {
      ":emailValue": patientEmail,
    },
  };

  const patient = await dynamoClient.scan(params).promise();
  return patient;
}

async function insertPatientData(requestBody) {
  const patientId = uuidv4();
  const patientData = { patientId, ...requestBody };

  const params = {
    TableName: dynamoDBTableName,
    Item: patientData,
  };
  await dynamoClient.put(params).promise();
}

module.exports = { getPatientByEmail, insertPatientData };
