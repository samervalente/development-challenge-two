const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
const patientRouter = require("./routes/patientRouter");

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.use("/patients", patientRouter);
app.use(errorHandlerMiddleware);

module.exports.handler = serverless(app);
