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
  try {
    const { data } = await api.post("/patients", payload);
    toast.success("Paciente registrado com sucesso.");
    return data;
  } catch (error) {
    toast.error("Não foi possível registrar o paciente.");
  }
}

async function getPatientById(patientId) {
  try {
    const { data } = await api.get(`/patients/${patientId}`);
    return data;
  } catch (error) {
    toast.error("Não foi possível carregar os dados do paciente.");
  }
}

async function updatePatientData(patientId, newPatientData) {
  try {
    await api.patch(`/patients/${patientId}`, newPatientData);
    toast.success(
      "Os dados do paciente foram atualizados com sucesso. Redirecionando..."
    );
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do paciente.");
  }
}

async function deletePatientsData(payload) {
  try {
    const body = { data: payload };
    await api.delete("/patients", body);
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

export {
  getAllPatients,
  registerPatientData,
  getPatientById,
  deletePatientsData,
  updatePatientData,
};
