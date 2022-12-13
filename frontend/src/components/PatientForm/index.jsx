import { useEffect, useState } from "react";
import StyledForm from "./styles";
import Button from "../Button";

import { useFormik } from "formik";
import { MenuItem, FormControl, TextField } from "@mui/material";

import { patientSchema } from "../../schemas/patientSchema";
import { validatePatientCEP, formatUpdateData } from "../../utils/patientUtils";

import { useNavigate } from "react-router-dom";
import {
  updatePatientData,
  registerPatientData,
} from "../../services/patients";
import { getStates, onBlurCep } from "../../services/address";

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

  function getInitialValues(){
    if(context !== 'update'){
      const data = localStorage.getItem("patientData");
        if(data){
          const unserializedData = JSON.parse(data);
          return unserializedData
        }
    }
    return patientData
  }


  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: patientSchema,
    onSubmit: async (values) => {
      setOpenBackdrop(true);

      const isValidCEP = await validatePatientCEP(values.cep);
      if(!isValidCEP) {
        setOpenBackdrop(false);
        return;
      }

      if (context === "update") {
        const patientId = values.patientId;
        const updatedValues = await formatUpdateData(values);
        const { status } = await updatePatientData(patientId, {
          newPatientData: updatedValues,
        });

        if(status === 200){
          updatePatientList()
          setOpenModal(false) 
        }
        setSelectionModel([]);
        
      } else {
        delete values.patientId
        const { status } = await registerPatientData(values);

        status === 201 && navigate("/");
      }
      setOpenBackdrop(false);
    },
  });

  let { handleSubmit, handleChange, errors, values, touched, setFieldValue } =
    formik;

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
  
  useEffect(() => {
      context !== "update" && localStorage.setItem("patientData", JSON.stringify(values))
  }, [values]);

  useEffect(() => {
    if(values.birthDate?.length === 2 || values.birthDate?.length === 5){
      values ={...values, birthDate: values.birthDate += '/'}
    }
  },[values.birthDate])

  function clearFields(){
    localStorage.removeItem("patientData")
    window.location.reload()
  }

  return (
    <>
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
            label="Data de Nascimento (DD/MM/AAAA)"
            value={values.birthDate}
            variant="standard"
            error={touched.birthDate && errors.birthDate}
            helperText={touched.birthDate && errors.birthDate}
            onChange={handleChange}
            inputProps={{maxLength:10}}
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
            label="Complemento (Opcional)"
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
    {context !== 'update' && 
    <Button 
      onClick={clearFields} variant="secondary">Limpar campos
    </Button>}
    </>
  );
}
