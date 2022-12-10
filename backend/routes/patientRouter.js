const { Router } = require("express");
const schemaValidatorMiddleware = require("../middlewares/schemaValidatorMiddleware");
const { patientSchema } = require("../schemas/patientSchema");
const { registerPatientData, getAllPatients } = require("../controllers/patientController");

const patientRouter = Router();

patientRouter.post(
  "/patients",
  schemaValidatorMiddleware(patientSchema),
  registerPatientData
);

patientRouter.get(
  "/patients", getAllPatients
);

module.exports = patientRouter;
