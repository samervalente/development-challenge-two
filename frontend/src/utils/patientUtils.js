import { getPatientAddress } from "../services/address.ts";
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
  if (data.erro) {
    toast.error("Não foi possível carregar o endereço deste CEP");
    return false;
  }
  return true;
}

async function formatUpdateData(patientData) {
  const formatedData = Object.keys(patientData)
    .map((updateKey, index) => {
      const updateValue = Object.values(patientData)[index];
      if (updateKey !== "patientId") {
        return { updateKey, updateValue };
      }
    })
    .filter((newValue) => newValue);

  return formatedData;
}

export { formatPatientData, validatePatientCEP, formatUpdateData };
