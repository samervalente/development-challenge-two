import { useEffect, useState, useRef } from "react";
import { RegisterButton } from "../../pages/RegisterPatients/styles";
import TextField from "@mui/material/TextField";
import { updatePatientData, getPatientById } from "../../services/patients";
import StyledForm from "../../components/Form";
import formatDayJSDate from "../../utils/dateUtils";
import { Edit, Cancel, CheckCircle } from "@mui/icons-material/";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export default function UpdatePatientsForm({ patientId, setOpenModal, updatePatientList }) {
  const [patientData, setPatientData] = useState({
    patientName: "",
    email: "",
    birthDate: "18/08/2014",
    address: "",
  });
  const [isEmailEditing, setIsEmailEditing] = useState(true);
  const patientEmail = useRef("");
  const [backdropState, setBackdropState] = useState(false);

  const openBackdrop = () => {
    setBackdropState(true);
  };
  const closeBackdrop = () => {
    setBackdropState(false);
  };

  useEffect(() => {
    async function fetchData() {
      const patient = await getPatientById(patientId);
      setPatientData(patient);
      patientEmail.current = patient.email;
    }

    fetchData();
  }, []);

  function verifyEditEmail(newValues) {
    if (patientData.email === patientEmail.current) {
      console.log(patientEmail.current);
      return newValues.filter((newValue) => newValue.updateKey !== "email");
    } else {
      return newValues;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { patientId } = patientData;
    let newValues = Object.keys(patientData).map((updateKey, index) => {
      const updateValue = Object.values(patientData)[index];
      return { updateKey, updateValue };
    });

    newValues = newValues.slice(1, 5);
    newValues = verifyEditEmail(newValues);
    newValues = { newPatientData: newValues };
    console.log(newValues);
    openBackdrop();
    const response = await updatePatientData(patientId, newValues);
    closeBackdrop();
    if (!response?.error) {
      await updatePatientList()
      setOpenModal(false);
     
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h1>Atualizar dados do paciente</h1>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropState}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <TextField
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
      <div className="emailEdit">
        <TextField
          disabled={isEmailEditing}
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
        {!isEmailEditing ? (
          <>
            <Cancel
              isEmailEditing={isEmailEditing}
              onClick={() => {
                setIsEmailEditing(true);
                setPatientData({ ...patientData, email: patientEmail.current });
              }}
              className="icon closeIcon"
            />
            <CheckCircle
              className="icon checkIcon"
              onClick={() => setIsEmailEditing(true)}
            />
          </>
        ) : (
          <Edit
            onClick={() => setIsEmailEditing(false)}
            className="icon editIcon"
          />
        )}
      </div>

      <TextField
        id="standard-basic"
        value={patientData.address}
        variant="standard"
        label="Endereço"
        InputLabelProps={{
          shrink: true,
        }}
        type="address"
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
          placeholder="DD/MM/AAAA"
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
      <RegisterButton
        disabled={!isEmailEditing}
        isButtonDisabled={!isEmailEditing}
        type="submit"
      >
        Salvar Alterações
      </RegisterButton>
    </StyledForm>
  );
}
