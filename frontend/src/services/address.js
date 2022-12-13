import axios from "axios";
import { toast } from "react-toastify";

async function getStates() {
  try {
    const { data } = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
    );
    return data;
  } catch (error) {
    toast.error("Não foi possível listar os estados solicitados.");
    return { error };
  }
}

async function getPatientAddress(cep) {
  try {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return data;
  } catch (error) {
    return { error };
  }
}

export { getStates, getPatientAddress };
