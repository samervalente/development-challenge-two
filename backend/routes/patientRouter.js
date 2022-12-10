const { Router } = require("express");
const schemaValidatorMiddleware = require("../middlewares/schemaValidatorMiddleware");
const { patientSchema } = require("../schemas/patientSchema");
const { registerPatientData, getAllPatients, getPatientById } = require("../controllers/patientController");

const patientRouter = Router();

patientRouter.post(
  "/patients",
  schemaValidatorMiddleware(patientSchema),
  registerPatientData
);

patientRouter.get(
  "/patients", getAllPatients
);

patientRouter.get(
  "/patients/:id", getPatientById
);

module.exports = patientRouter;
