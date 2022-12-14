import { IPatientData, INewPatientDataValues } from "../interfaces/patients";

export type TPatientDataValues = Omit<IPatientData, "patientId">;

export type TPatients = {
  patients: Array<IPatientData>;
};

export type TNewPatientData = {
  newPatientData: Array<INewPatientDataValues>;
};
