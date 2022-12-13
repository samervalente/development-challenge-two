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


  function storageDraft(values){
    let storagedData = JSON.parse(localStorage.getItem("patientData"));

    if (storagedData) {
        Object.keys(values).map((key, index) => {
          const value = Object.values(values)[index];
          if (value) {
            storagedData = { ...storagedData, [key]: value };
          }
        });
     }else{
      storagedData = values
     }
      localStorage.setItem("patientData", JSON.stringify(storagedData));
  }

  return (
    <Container>
      <div className="title">
      <h1>Registrar Novo Paciente</h1>
      <p>Registre um novo paciente</p>
      </div>
      <Backdrop backdropState={openBackdrop} />
      <PatientForm
        patientData={patientData}
        setPatientData={setPatientData}
        setOpenBackdrop={setOpenBackdrop}
        storageDraft={storageDraft}
        required={true}
      />
    </Container>
  );
}
