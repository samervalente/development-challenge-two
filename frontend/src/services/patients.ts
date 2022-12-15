import api from "./api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TPatients,
  TPatientDataValues,
  TNewPatientData,
} from "../@types/patient";
import { AxiosResponse } from "axios";

interface IDeletePatientId {
  patientId: string;
}

async function getAllPatients(): Promise<TPatients> {
  try {
    const { data } = await api.get("/patients");

    return data;
  } catch (error) {
    toast.error("Não foi possível carregar a lista de pacientes.");
    return error;
  }
}

async function registerPatientData(
  payload: TPatientDataValues
): Promise<AxiosResponse> {
  try {
    const response = await api.post("/patients", payload);
    toast.success("Paciente registrado com sucesso.");
    return response;
  } catch (error) {
    if (error.response.status === 409) {
      toast.error("Este email já está cadastrado no sistema.");
    } else if (error.response.status === 422) {
      toast.error("Dados inválidos, por favor verifique.");
    }
    return error;
  }
}

async function getPatientById(patientId: string) {
  try {
    const { data } = await api.get(`/patients/${patientId}`);
    return data;
  } catch (error) {
    toast.error("Não foi possível carregar os dados do paciente.");
  }
}

async function updatePatientData(
  patientId: number,
  newPatientData: TNewPatientData | any
): Promise<AxiosResponse> {
  try {
    const response = await api.patch(`/patients/${patientId}`, newPatientData);
    toast.success("Os dados do paciente foram atualizados com sucesso.");
    return response;
  } catch (error) {
    if (error.response?.status === 409) {
      toast.error("Este email já está cadastrado no sistema.");
    } else if (error.response?.status === 422) {
      toast.error("Dados inválidos, por favor verifique.");
    }

    return error;
  }
}

async function deletePatientsData(payload: {
  patients: Array<IDeletePatientId>;
}) {
  try {
    const body = { data: payload };
    await api.delete("/patients", body);
    const toastSucessMessage = `Sucesso ao remover ${
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
