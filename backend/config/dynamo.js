const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoClient;
