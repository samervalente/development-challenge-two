import { useEffect, useState } from "react";
import { RegisterButton } from "../../pages/RegisterPatients/styles";
import TextField from "@mui/material/TextField";
import { updatePatientData, getPatientById } from "../../services/patients";
import StyledForm from "../../components/Form";
import formatDayJSDate from "../../utils/dateUtils";

export default function UpdatePatientsForm({ patientId }) {
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

  async function handleSubmit(e) {
    e.preventDefault();
    const { patientId } = patientData;
    let newValues = Object.keys(patientData).map((updateKey, index) => {
      const updateValue = Object.values(patientData)[index];
      return { updateKey, updateValue };
    });

    newValues = { newPatientData: newValues.slice(1, 5) };

    await updatePatientData(patientId, newValues);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h1>Atualizar dados do paciente</h1>
      <TextField
        disabled
        value={patientData.patientName}
        id="standard-basic"
        variant="standard"
        label="Nome"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) =>
          setPatientData({ ...patientData, patientName: e.target.value })
        }
        sx={{
          width: 300,
        }}
      />
      <TextField
        disabled
        value={patientData.email}
        id="standard-basic"
        variant="standard"
        label="Email"
        InputLabelProps={{
          shrink: true,
        }}
        type="email"
        onChange={(e) =>
          setPatientData({ ...patientData, email: e.target.value })
        }
        sx={{
          width: 300,
        }}
      />

      <TextField
        id="standard-basic"
        value={patientData.address}
        variant="standard"
        disabled
        label="Endereço"
        InputLabelProps={{
          shrink: true,
        }}
        type="address"
        required
        onChange={(e) =>
          setPatientData({ ...patientData, address: e.target.value })
        }
        sx={{
          width: 300,
        }}
      />
      <div className="birthDateSection">
        <label>Data de nascimento *</label>
        <input
          type="date"
          min="1910-01-01"
          max="2022-01-01"
          disabled
          placeholder="DD/MM/AAAA"
          value={"02/05/2003"}
          defaultValue={"02/05/2003"}
          onChange={(e) => {
            setPatientData({
              ...patientData,
              birthDate: formatDayJSDate(e.target.value),
            });
          }}
          sx={{
            width: 300,
          }}
        />
      </div>
      <RegisterButton type="submit">Salvar Alterações</RegisterButton>
    </StyledForm>
  );
}
