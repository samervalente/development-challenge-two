import { useEffect, useState } from "react";
import StyledForm from "./styles";
import { MenuItem, FormControl, TextField } from "@mui/material";
import Button from "../Button";
import { getStates } from "../../services/address";
import { useFormik } from "formik";
import { patientSchema } from "../../schemas/patientSchema";
import { validatePatientCEP, formatUpdateData } from "../../utils/patientUtils";
import formatDate from "../../utils/dateUtils";
import { useNavigate } from "react-router-dom";
import {
  updatePatientData,
  registerPatientData,
} from "../../services/patients";

export default function PatientForm({
  patientData,
  setOpenBackdrop,
  setOpenModal,
  updatePatientList,
  setSelectionModel,
  context,
}) {
  const [states, setStates] = useState([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: patientData,
    validationSchema: patientSchema,
    onSubmit: async (values) => {
      setOpenBackdrop(true);

      values = { ...values, birthDate: formatDate(values.birthDate) };
      await validatePatientCEP(values.cep);

      if (context === "update") {
        const patientId = patientData.patientId;
        const updatedValues = await formatUpdateData(values);
        const { status } = await updatePatientData(patientId, {
          newPatientData: updatedValues,
        });
        if (status === 200) {
          setSelectionModel([]);
          updatePatientList();
          setOpenModal(false);
        }
      } else {
        const { status } = await registerPatientData(values);
        if (status === 201) {
          navigate("/");
        }
      }
      setOpenBackdrop(false);
    },
  });

  let { handleSubmit, handleChange, errors, values, touched, setFieldValue } =
    formik;

  function onBlurCep(ev, setFieldValue) {
    const { value } = ev.target;

    const cep = value?.replace(/[^0-9]/g, "");

    if (cep?.length !== 8) {
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setFieldValue("publicPlace", data.logradouro);
        setFieldValue("district", data.bairro);
        setFieldValue("city", data.localidade);
        setFieldValue("uf", data.uf);
        setFieldValue("complement", data.complemento);
      });
  }

  useEffect(() => {
    async function fetchStates() {
      const fetchedStates = await getStates();
      setStates(fetchedStates);
    }
    fetchStates();
  }, []);

  function renderStates() {
    return states && states.length > 0 ? (
      states.map((state) => {
        return <MenuItem value={state.sigla}>{state.sigla}</MenuItem>;
      })
    ) : (
      <MenuItem value={"AC"}>AC</MenuItem>
    );
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div className="form-container">
        <FormControl sx={{ m: 1, minWidth: 120, gap: 4 }}>
          <TextField
            id="patientName"
            name="patientName"
            label="Nome Completo"
            type="name"
            value={values.patientName}
            variant="standard"
            onChange={handleChange}
            error={touched.patientName && errors.patientName}
            helperText={touched.patientName && errors.patientName}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={values.email}
            variant="standard"
            onChange={handleChange}
            error={touched.email && errors.email}
            helperText={touched.email && errors.email}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="birthDate"
            name="birthDate"
            label="Data de Nascimento"
            type="date"
            value={values.birthDate}
            variant="standard"
            error={touched.birthDate && errors.birthDate}
            helperText={touched.birthDate && errors.birthDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120, gap: 4 }}
          required
          maxLength={9}
        >
          <TextField
            id="cep"
            name="cep"
            label="CEP"
            onBlur={(ev) => onBlurCep(ev, setFieldValue)}
            type="zipCode"
            inputProps={{ maxLength: 8 }}
            value={values.cep}
            variant="standard"
            error={touched.cep && errors.cep}
            helperText={touched.cep && errors.cep}
            onChange={handleChange}
          />
          <TextField
            id="uf"
            name="uf"
            select
            label={"Estado"}
            value={values.uf}
            variant="standard"
            error={touched.uf && errors.uf}
            helperText={touched.uf && errors.uf}
            onChange={handleChange}
          >
            {renderStates()}
          </TextField>
          <TextField
            id="city"
            name="city"
            label="Cidade"
            value={values.city}
            variant="standard"
            error={touched.city && errors.city}
            helperText={touched.city && errors.city}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, gap: 4 }}>
          <TextField
            id="district"
            name="district"
            label="Bairro"
            value={values.district}
            variant="standard"
            error={touched.district && errors.district}
            helperText={touched.district && errors.district}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="publicPlace"
            name="publicPlace"
            label="Logradouro"
            value={values.publicPlace}
            variant="standard"
            error={touched.publicPlace && errors.publicPlace}
            helperText={touched.publicPlace && errors.publicPlace}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="complement"
            name="complement"
            label="Complemento"
            value={values.complement}
            variant="standard"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </div>
      <div>
        <Button type="submit">
          {context === "update" ? "Salvar Alterações" : "Registrar Paciente"}
        </Button>
      </div>
    </StyledForm>
  );
}
