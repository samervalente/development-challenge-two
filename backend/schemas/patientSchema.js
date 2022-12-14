const joiBase = require("joi");
const joiDate = require("@joi/date");

const joi = joiBase.extend(joiDate);

const patientSchema = joi.object({
  patientName: joi.string().required(),
  email: joi.string().email().required(),
  birthDate: joi.date().format("DD/MM/YYYY").less("1-12-2022").required(),
  cep: joi.string().required(),
  uf: joi.string().required(),
  city: joi.string().required(),
  publicPlace: joi.string().required(),
  district: joi.string().required(),
  complement: joi.string(),
});

const updatePatientSchema = joi.object({
  patientName: joi.string(),
  email: joi.string().email(),
  birthDate: joi.date().format("DD/MM/YYYY").less("1-12-2022"),
  cep: joi.string(),
  uf: joi.string(),
  city: joi.string(),
  publicPlace: joi.string(),
  district: joi.string(),
  complement: joi.string(),
});

module.exports = { patientSchema, updatePatientSchema };
