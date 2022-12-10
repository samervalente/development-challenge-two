import { useEffect, useState } from "react";
import { RegisterButton } from "../../pages/RegisterPatients/styles";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/fr";
import dayjs from "dayjs";
import { StyledForm } from "./styles";
import { updatePatientData, getPatientById } from "../../services/patients";

export default function UpdatePatientsForm({ patientId }) {
  const [value, setValue] = useState(dayjs("2014-08-18T21:11:54"));
  const [patientData, setPatientData] = useState({
    patientName: "",
    email: "",
    birthDate: "18/08/2014",
    address: "",
  });

  useEffect(() => {
    async function fetchData() {
      const patient = await getPatientById(patientId);
      setPatientData(patient);
    }

    fetchData();
  }, []);

  function handleChange(newValue) {
    setValue(newValue);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const {patientId} = patientData
    let newValues = Object.keys(patientData).map((updateKey, index) => {
      const updateValue = Object.values(patientData)[index];
      return { updateKey, updateValue };
    });

    newValues = { newPatientData: newValues.slice(1, 5) };
   
    await updatePatientData(patientId, newValues);
  }

  console.log(patientData);
  return (
    <StyledForm onSubmit={handleSubmit}>
      <TextField
        value={patientData.patientName}
        id="standard-basic"
        variant="standard"
        label="Nome"
        InputLabelProps={{
          shrink: true,
        }}
        required
        onChange={(e) =>
          setPatientData({ ...patientData, patientName: e.target.value })
        }
      />
      <TextField
        value={patientData.email}
        id="standard-basic"
        variant="standard"
        label="Email"
        InputLabelProps={{
          shrink: true,
        }}
        type="email"
        required
        onChange={(e) =>
          setPatientData({ ...patientData, email: e.target.value })
        }
      />

      <div>
        <TextField
          id="standard-basic"
          value={patientData.address}
          variant="standard"
          label="Endereço"
          InputLabelProps={{
            shrink: true,
          }}
          type="address"
          required
          onChange={(e) =>
            setPatientData({ ...patientData, address: e.target.value })
          }
        />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"fr"}>
          <DesktopDatePicker
            inputFormat="DD/MM/YYYY"
            value={patientData.birthDate}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
            required
            dateAdapter={AdapterDayjs}
          />
        </LocalizationProvider>
      </div>
      <RegisterButton type="submit">Salvar Alterações</RegisterButton>
    </StyledForm>
  );
}
