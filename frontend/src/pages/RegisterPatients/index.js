import useRegisterPatient from "../../hooks/api/useRegisterPatient";
import { Container, RegisterButton } from "./styles";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

export default function RegisterPatients() {
  const [patientData, setPatientData] = useState({
    patientName: "",
    email: "",
    birthDate: "18/08/2014",
    address: "",
  });

  const { registerLoading, registerPatientData, registerError } =
    useRegisterPatient;

  const [errorValue, setErrorValue] = useState(false);
  const [value, setValue] = useState(dayjs("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      async function fetchData() {
        console.log(await registerPatientData());
      }

      fetchData();
    } catch (error) {
      console.log(error);
    }
    // if (response.status === 409) {
    //   setErrorValue(true);
    //   return;
    // }
  }
  return (
    <Container>
      <h1>Registrar Novo Paciente</h1>
      <p>Registre um novo paciente</p>
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Nome"
          required
          variant="standard"
          onChange={(e) =>
            setPatientData({ ...patientData, patientName: e.target.value })
          }
        />
        <TextField
          error={errorValue}
          id="standard-basic"
          label="Email *"
          variant="standard"
          type="email"
          helperText={errorValue && "Email já existente."}
          onChange={(e) =>
            setPatientData({ ...patientData, email: e.target.value })
          }
        />

        <div>
          <TextField
            id="standard-basic"
            label="Endereço"
            variant="standard"
            type="address"
            required
            onChange={(e) =>
              setPatientData({ ...patientData, address: e.target.value })
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} locale={"fr"}>
            <DesktopDatePicker
              label="Data de Nascimento (DD/MM/AAAA) *"
              inputFormat="DD/MM/YYYY"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
              required
              dateAdapter={AdapterDayjs}
            />
          </LocalizationProvider>
        </div>
        <RegisterButton type="submit">Registrar Paciente</RegisterButton>
      </form>
    </Container>
  );
}
