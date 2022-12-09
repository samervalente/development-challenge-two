import useAsync from "../useAsync";

import * as patients from "../../services/patients";

export default function useRegisterPatient() {
  const {
    loading: registerLoading,
    error: registerError,
    act: registerPatientData,
  } = useAsync(patients.registerPatientData, false);

  return {
    registerLoading,
    registerPatientData,
    registerError,
  };
}
