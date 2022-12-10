import { useState } from "react";
import { RegisterButton } from "../../pages/RegisterPatients/styles";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { StyledForm } from "./styles";
import { registerPatientData } from "../../services/patients";

export default function RegisterPatientForm() {
  const [value, setValue] = useState(dayjs("2014-08-18T21:11:54"));
  const [patientData, setPatientData] = useState({
    patientName: "",
    email: "",
    birthDate: "18/08/2014",
    address: "",
  });

  function handleChange(newValue){
    setValue(newValue)
  }
 
  async function handleSubmit(e){
    e.preventDefault()
    await registerPatientData(patientData)
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
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
        id="standard-basic"
        label="Email *"
        variant="standard"
        type="email"
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
    </StyledForm>
  );
}
