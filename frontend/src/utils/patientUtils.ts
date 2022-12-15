import { getPatientAddress } from "../services/address";
import { toast } from "react-toastify";
import { IAddress } from "../services/address";
import { IPatientData, IFormatedPatientData } from "../interfaces/patients";

function formatPatientData(patientData: IPatientData): IFormatedPatientData {
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

async function validatePatientCEP(cep: number) {
  const data: IAddress | any = await getPatientAddress(cep);
  if (data?.erro) {
    toast.error(
      "Não foi possível carregar o endereço do paciente através deste CEP."
    );
    return false;
  }
  return true;
}

async function formatUpdateData(patientData: IPatientData) {
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
