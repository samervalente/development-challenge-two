const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

app.use(errorHandlerMiddleware);

app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

module.exports.handler = serverless(app);
