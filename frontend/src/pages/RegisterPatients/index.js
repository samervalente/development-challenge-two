import useRegisterPatient from "../../hooks/api/useRegisterPatient";
import { Container } from "./styles";
import { useState } from "react";
import RegisterPatientForm from "./RegisterPatientsForm";

export default function RegisterPatients() {

  return (
    <Container>
      <h1>Registrar Novo Paciente</h1>
      <p>Registre um novo paciente</p>
      <RegisterPatientForm />
    </Container>
  );
}
