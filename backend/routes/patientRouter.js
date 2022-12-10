const { Router } = require("express");
const schemaValidator= require("../middlewares/schemaValidatorMiddleware");
const {validatePatientRequestBody, validatePatientUpdateRequestBody} = require("../middlewares/patientMiddleware");

const {
  patientSchema,
} = require("../schemas/patientSchema");
const {
  registerPatientData,
  getAllPatients,
  getPatientById,
  updatePatientData,
} = require("../controllers/patientController");

const patientRouter = Router();

patientRouter.post(
  "/",
  validatePatientRequestBody,
  schemaValidator(patientSchema),
  registerPatientData
);

patientRouter.get("/", getAllPatients);

patientRouter.get("/:id", getPatientById);

patientRouter.patch(
  "/:id",
  validatePatientUpdateRequestBody,
  updatePatientData
);

module.exports = patientRouter;
