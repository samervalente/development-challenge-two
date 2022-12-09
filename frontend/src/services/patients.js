import api from "./api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function getAllPatients() {
  try {
    const { data } = await api.get("/patients");

    return data;
  } catch (error) {
    toast.error("Não foi possível carregar a lista de pacientes.");
  }
}

async function registerPatientData(payload) {
  const { data } = await api.post("/patient", payload);
  toast.success("Paciente registrado com sucesso.");
  console.log(data);
  return data;
}

async function deletePatientsData(payload) {
  try {
    const body = { data: payload };
    await api.delete("/patient", body);
    const toastSucessMessage = `Sucesso ao deletar ${
      payload.patients.length > 1 ? "os pacientes" : "o paciente"
    }`;
    toast.success(toastSucessMessage);
  } catch (error) {
    const toastErrorMessage = `Erro ao deletar ${
      payload.patients.length > 1 ? "os pacientes" : "o paciente"
    }`;
    toast.error(toastErrorMessage);
  }
}

export { getAllPatients, registerPatientData, deletePatientsData };
