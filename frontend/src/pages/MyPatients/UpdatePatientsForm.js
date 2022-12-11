import { useEffect, useState, useRef } from "react";
import { RegisterButton } from "../../pages/RegisterPatients/styles";
import TextField from "@mui/material/TextField";
import { updatePatientData, getPatientById } from "../../services/patients";
import StyledForm from "../../components/Form";
import formatDayJSDate from "../../utils/dateUtils";
import { Edit, Cancel, CheckCircle } from "@mui/icons-material/";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { getPatientAddress, getStates } from "../../services/address";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export default function UpdatePatientsForm({
  patientId,
  setOpenModal,
  updatePatientList,
}) {
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
  const [states, setStates] = useState([]);
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
      const data = await getStates();
      setStates(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function getPatientAddressByCep() {
      const cep = patientData.cep?.replace("-", "");
      if (cep?.length === 8) {
        const data = await getPatientAddress(cep);
        const {
          cep: apiCep,
          uf,
          localidade: city,
          bairro: district,
          logradouro: publicPlace,
          complemento: complement,
        } = data;
        setPatientData({
          ...patientData,
          cep: apiCep,
          uf,
          city,
          district,
          publicPlace,
          complement,
        });
      }
    }
    getPatientAddressByCep();
  }, [patientData.cep]);

  useEffect(() => {
    async function fetchData() {
      const patient = await getPatientById(patientId);
      setPatientData(patient);
      patientEmail.current = patient.email;
    }

    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const isValidCEP = await validatePatientCEP();
    if (isValidCEP) {
      const { patientId } = patientData;
      let newValues = Object.keys(patientData)
        .map((updateKey, index) => {
          if (updateKey !== "patientId") {
            const updateValue = Object.values(patientData)[index];
            if (updateValue !== patientEmail.current)
              return { updateKey, updateValue };
          }
        })
        .filter((updateValue) => updateValue);

      const updatedValues = { newPatientData: newValues };
      openBackdrop();
      const response = await updatePatientData(patientId, updatedValues);
      closeBackdrop();
      if (!response?.error) {
        await updatePatientList();
        setOpenModal(false);
      }
    }
  }

  async function validatePatientCEP() {
    const { cep } = patientData;
    const data = await getPatientAddress(cep);
    if (!data) {
      toast.error("Insira um CEP válido.");
      return false;
    }
    return true;
  }

  function listStates() {
    if (states && states.length > 0) {
      return states.map((state) => {
        return <MenuItem value={state.sigla}>{state.sigla}</MenuItem>;
      });
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropState}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <FormControl sx={{ m: 2, minWidth: 120, gap: 4 }}>
        <TextField
          id="standard-basic"
          label="Nome"
          type="name"
          InputLabelProps={{
            shrink: true,
          }}
          value={patientData.patientName}
          variant="standard"
          onChange={(e) =>
            setPatientData({ ...patientData, patientName: e.target.value })
          }
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
                  setPatientData({
                    ...patientData,
                    email: patientEmail.current,
                  });
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

        <div className="birthDateSection">
          <label>Data de nascimento</label>
          <input
            type="date"
            min="1997-01-01"
            max="2030-12-31"
            value={dayjs(patientData.birthDate).format("YYYY-DD-MM")}
            placeholder="DD/MM/AAAA"
            onChange={(e) => {
              console.log(e.target.value);
              setPatientData({
                ...patientData,
                birthDate: formatDayJSDate(e.target.value),
              });
            }}
          />
        </div>
        <RegisterButton type="submit">Salvar alterações</RegisterButton>
      </FormControl>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 120, gap: 4 }}
        maxLength={9}
      >
        <TextField
          id="standard-basic"
          label="CEP"
          inputProps={{ maxLength: "9" }}
          value={patientData.cep}
          variant="standard"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => {
            setPatientData({ ...patientData, cep: e.target.value });
          }}
        />
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-standard-label">UF</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={patientData.uf}
            label={"UF"}
            onChange={(e) => {
              setPatientData({ ...patientData, uf: e.target.value });
            }}
          >
            {listStates()}
          </Select>
        </FormControl>
        <TextField
          id="standard-basic"
          label="Cidade"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={patientData.city}
          onChange={(e) =>
            setPatientData({ ...patientData, city: e.target.value })
          }
        />
        <TextField
          id="standard-basic"
          label="Bairro"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={patientData.district}
          onChange={(e) =>
            setPatientData({ ...patientData, district: e.target.value })
          }
        />
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, gap: 4 }}>
        <TextField
          id="standard-basic"
          label="Logradouro"
          value={patientData.publicPlace}
          variant="standard"
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            setPatientData({ ...patientData, publicPlace: e.target.value })
          }
        />
        <TextField
          id="standard-basic"
          label="Complemento (opcional)"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={patientData.complement}
          onChange={(e) =>
            setPatientData({ ...patientData, complement: e.target.value })
          }
        />
      </FormControl>
    </StyledForm>
  );
}
