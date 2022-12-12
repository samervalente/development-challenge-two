import * as Yup from "yup";

const minDate = "1900-01-01";
const maxDate = "2022-12-12";

const patientSchema = Yup.object().shape({
  patientName: Yup.string("O nome do paciente deve ser um texto válido")
    .min(3, "Nome deve haver pelo menos 3 caracteres")
    .required("O nome do paciente é obrigatório"),
  email: Yup.string("O email do paciente deve ser um texto válido")
    .email("Insira um email válido")
    .required("O email do paciente é obrigatório"),
  birthDate: Yup.date("Data inválida")
    .min(minDate, "Data inválida")
    .max(maxDate, "Data inválida")
    .required("A data de nascimento do paciente é obrigatória"),
  cep: Yup.string()
    .min(8, "O CEP do paciente é inválido")
    .max(8)
    .required("O CEP do paciente é obrigatório"),
  uf: Yup.string().min(2).max(2).required("O estado do paciente é obrigatório"),
  city: Yup.string().required("A cidade do paciente é obrigatória"),
  publicPlace: Yup.string().required("O logradouro do paciente é obrigatório"),
  district: Yup.string().required("O bairro do paciente é obrigatório"),
  complement: Yup.string(),
});

export { patientSchema };
