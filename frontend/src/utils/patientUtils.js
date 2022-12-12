import { getPatientAddress } from "../services/address";
import { toast } from "react-toastify";

function formatPatientData(patientData) {
  const {
    patientId,
    patientName,
    email,
    birthDate,
    publicPlace,
    district,
    city,
    uf,
    cep,
  } = patientData;
  const formatedAddress = `${publicPlace}, ${district}, ${city} - ${uf} ${cep}`;
  return {
    patientId,
    patientName,
    email,
    birthDate,
    address: formatedAddress,
  };
}

async function validatePatientCEP(cep) {
  const data = await getPatientAddress(cep);
  if (!data) {
    toast.error("Insira um CEP válido.");
    return false;
  }
  return true;
}

export { formatPatientData, validatePatientCEP };
