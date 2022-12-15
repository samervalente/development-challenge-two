import * as Yup from "yup";

//const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
const regexCEP = /^[0-9]{5}[0-9]{3}$/;

const patientSchema = Yup.object().shape({
  patientName: Yup.string()
    .min(3, "Nome deve haver pelo menos 3 caracteres")
    .required("O nome do paciente é obrigatório"),
  email: Yup.string()
    .email("Insira um email válido")
    .required("O email do paciente é obrigatório"),
  birthDate: Yup.string().required(
    "A data de nascimento do paciente é obrigatória"
  ),
  cep: Yup.string()
    .matches(regexCEP, "CEP inválido")
    .required("O CEP do paciente é obrigatório"),
  uf: Yup.string().min(2).max(2).required("O estado do paciente é obrigatório"),
  city: Yup.string().required("A cidade do paciente é obrigatória"),
  publicPlace: Yup.string().required("O logradouro do paciente é obrigatório"),
  district: Yup.string().required("O bairro do paciente é obrigatório"),
  complement: Yup.string(),
});

export { patientSchema };
