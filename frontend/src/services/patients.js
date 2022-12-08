import api from "./api";
import { toast } from "react-toastify";

async function getAllPatients() {
  try {
    const { data } = await api.get("/patients", );
    return data;
  } catch (error) {
    toast("Não foi possível carregar a lista de pacientes.");
  }
}

export { getAllPatients };
