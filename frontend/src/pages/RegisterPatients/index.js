import useRegisterPatient from "../../hooks/api/useRegisterPatient";
import { Container } from "./styles";
import { useState } from "react";
import RegisterPatientForm from "./RegisterPatientsForm";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function RegisterPatients() {
  const [openBackdrop, setOpenBackdrop] = useState(false);

  return (
    <Container>
      <h1>Registrar Novo Paciente</h1>
      <p>Registre um novo paciente</p>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
     
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <RegisterPatientForm setOpenBackdrop={setOpenBackdrop} />
    </Container>
  );
}
