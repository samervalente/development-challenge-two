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

async function getPatients(){
  const params = {
    TableName: dynamoDBTableName,
  };

  const allPatients = await scanDynamoRecords(params, []);
  return allPatients
}

async function scanDynamoRecords(params, records) {
    const dynamoData = await dynamoClient.scan(params).promise();
    records = records.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      params.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(params, records);
    }
    return records;
}

module.exports = { getPatientByEmail, insertPatientData, getPatients };
