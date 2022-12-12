import { useState, useEffect } from "react";
import { Container } from "./styles";
import Backdrop from "../../components/Backdrop";
import PatientForm from "../../components/PatientForm";

export default function RegisterPatients() {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [patientData, setPatientData] = useState({
    patientName: "",
    email: "",
    birthDate: "",
    cep: "",
    uf: "",
    city: "",
    publicPlace: "",
    district: "",
    complement: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("patientData");
    if (data) {
      const serializedData = JSON.parse(data);
      setPatientData(serializedData);
    }
  }, []);

  useEffect(() => {
    let storageData = {};
    Object.keys(patientData).map((key, index) => {
      const value = Object.values(patientData)[index];
      if (value) {
        storageData = { ...storageData, [key]: value };
      }
    });
    if (Object.keys(storageData).length > 0) {
      window.localStorage.setItem("patientData", JSON.stringify(storageData));
    }
  }, [patientData]);

  return (
    <Container>
      <h1>Registrar Novo Paciente</h1>
      <p>Registre um novo paciente</p>
      <Backdrop backdropState={openBackdrop} />
      <PatientForm
        patientData={patientData}
        setPatientData={setPatientData}
        setOpenBackdrop={setOpenBackdrop}
        required={true}
      />
    </Container>
  );
}
