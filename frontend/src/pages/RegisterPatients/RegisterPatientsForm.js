import { useEffect, useState } from "react";
import { RegisterButton } from "../../pages/RegisterPatients/styles";
import TextField from "@mui/material/TextField";
import StyledForm from "../../components/Form";
import { registerPatientData } from "../../services/patients";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import formatDayJSDate from "../../utils/dateUtils";
import FormControl from "@mui/material/FormControl";
import { getPatientAddress, getStates } from "../../services/address";

export default function RegisterPatientForm({ setOpenBackdrop }) {
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
  const [selectedState, setSelectedState] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setOpenBackdrop(true);
    await registerPatientData(patientData);
    setOpenBackdrop(false);
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getStates();
      setStates(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let { cep } = patientData;
      cep = cep.replace("-", "");
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
    fetchData();
  }, [patientData.cep]);

  function listStates() {
    if (states && states.length > 0) {
      return states.map((state) => {
        return <MenuItem value={state.sigla}>{state.sigla}</MenuItem>;
      });
    }
  }

  // function handleSelectedStateChange(e){

  // }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormControl sx={{ m: 1, minWidth: 120, gap: 4 }}>
        <TextField
          id="standard-basic"
          label="Nome"
          required
          type="name"
          variant="standard"
          onChange={(e) =>
            setPatientData({ ...patientData, patientName: e.target.value })
          }
        />
        <TextField
          id="standard-basic"
          label="Email"
          required
          variant="standard"
          type="email"
          onChange={(e) =>
            setPatientData({ ...patientData, email: e.target.value })
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
      </FormControl>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 120, gap: 4 }}
        required
        maxLength={9}
      >
        <TextField
          id="standard-basic"
          label="CEP"
          inputProps={{ maxLength: "9" }}
          required
          value={patientData.cep}
          variant="standard"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => {
            setPatientData({ ...patientData, cep: e.target.value });
          }}
        />
        <FormControl variant="standard" required>
          <InputLabel id="demo-simple-select-standard-label">UF</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={patientData.uf}
            label={"UF"}
            onChange={(e) => {
              setSelectedState(e.target.value);
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
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 120, gap: 4 }}
        required
      >
        <TextField
          id="standard-basic"
          label="Logradouro"
          required
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
