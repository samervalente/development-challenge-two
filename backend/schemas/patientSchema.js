const joi = require("joi");

const joiBase = require("joi");
const joiDate = require("@joi/date");

const joi = joiBase.extend(joiDate);

const patientSchema = joi.object({
  patientName: joi.string().required(),
  email: joi.string().email().required(),
  birthDate: joi.date().format("DD/MM/YYYY").less("1-12-2022").required(),
  address: joi.string().required(),
});

const updatePatientSchema = joi.object({
  patientName: joi.string(),
  email: joi.string().email(),
  birthDate: joi.date().format("DD/MM/YYYY").less("1-12-2022"),
  address: joi.string(),
});

module.exports = { patientSchema, updatePatientSchema };
