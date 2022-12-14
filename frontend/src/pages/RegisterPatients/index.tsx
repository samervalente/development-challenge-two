import React from "react";
import { useState } from "react";
import { Container } from "./styles";
import Backdrop from "../../components/Backdrop/index";
import PatientForm from "../../components/PatientForm";

export default function RegisterPatients() {
  const [openBackdrop, setOpenBackdrop] = useState(false);

  return (
    <Container>
      <div className="title">
        <h1>Registrar Novo Paciente</h1>
        <p>Registre um novo paciente</p>
      </div>
      <Backdrop open={openBackdrop} />
      <PatientForm setOpenBackdrop={setOpenBackdrop} />
    </Container>
  );
}
