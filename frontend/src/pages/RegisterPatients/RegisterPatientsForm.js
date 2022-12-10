import { useState } from "react";
import { RegisterButton } from "../../pages/RegisterPatients/styles";
import TextField from "@mui/material/TextField";
import StyledForm from "../../components/Form";
import { registerPatientData } from "../../services/patients";
import formatDayJSDate from "../../utils/dateUtils";

export default function RegisterPatientForm({setOpenBackdrop}) {
  const [patientData, setPatientData] = useState({
    patientName: "",
    email: "",
    birthDate: "18/08/2014",
    address: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setOpenBackdrop(true)
    await registerPatientData(patientData);
    setOpenBackdrop(false)
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
      <div className="birthDateSection">
        <label>Data de nascimento *</label>
        <input
          type="date"
          min="1997-01-01"
          max="2030-12-31"
          placeholder="DD/MM/AAAA"
          required
          onChange={(e) => {
            console.log(e.target.value);
            setPatientData({
              ...patientData,
              birthDate: formatDayJSDate(e.target.value),
            });
          }}
        />
      </div>
      <RegisterButton type="submit">Registrar Paciente</RegisterButton>
    </StyledForm>
  );
}
