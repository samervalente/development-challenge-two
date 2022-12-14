export interface IFormatedPatientData {
  patientId: string;
  patientName: string;
  email: string;
  birthDate: string;
  address: string;
}

export interface IPatientData {
  patientId: string;
  patientName: string;
  email: string;
  birthDate: string;
  cep: string;
  uf: string;
  city: string;
  publicPlace: string;
  district: string;
  complement?: string;
}

export interface INewPatientDataValues {
  updateKey: string;
  updateValue: string;
}
