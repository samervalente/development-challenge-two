import React from "react";
import { useEffect, useState, useRef } from "react";
import StyledForm from "./styles";
import Button from "../Button/index";

import { useFormik } from "formik";
import { MenuItem, FormControl, TextField } from "@mui/material";

import { patientSchema } from "../../schemas/patientSchema";
import { validatePatientCEP, formatUpdateData } from "../../utils/patientUtils";

import { useNavigate } from "react-router-dom";
import {
  updatePatientData as updatePatient,
  registerPatientData,
} from "../../services/patients";
import { getStates, onBlurCep } from "../../services/address";
import dayjs from "dayjs";

interface IState {
  sigla: string;
}

export default function PatientForm({
  updatePatientData,
  setOpenBackdrop,
  setOpenModal,
  updatePatientList,
  setSelectionModel,
  context,
}) {
  const [states, setStates] = useState<Array<IState>>([]);
  const birthDate = useRef("");
  const navigate = useNavigate();

  function getInitialValues() {
    const patientData = {
      patientName: "",
      email: "",
      birthDate: "",
      cep: "",
      uf: "",
      city: "",
      publicPlace: "",
      district: "",
      complement: "",
    };

    if (context !== "update") {
      const data = localStorage.getItem("patientData");
      if (data) {
        const unserializedData = JSON.parse(data);
        return unserializedData;
      } else {
        return patientData;
      }
    }
    birthDate.current = updatePatientData.birthDate;
    return updatePatientData;
  }

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: patientSchema,
    onSubmit: async (values) => {
      setOpenBackdrop(true);

      const isValidCEP = await validatePatientCEP(values.cep);
      if (!isValidCEP) {
        setOpenBackdrop(false);
        return;
      }


      if (values.birthDate !== birthDate.current || context !== "update") {
        values = {
          ...values,
          birthDate: dayjs(values.birthDate).format("DD/MM/YYYY"),
        };
      }

      if (context === "update") {
        const patientId = values.patientId;

        const updatedValues = await formatUpdateData(values);
        const { status } = await updatePatient(patientId, {
          newPatientData: updatedValues,
        });

        if (status === 200) {
          setSelectionModel([]);
          updatePatientList();
          setOpenModal(false);
        }
      } else {
        delete values.patientId;

        const { status } = await registerPatientData(values);

        if (status === 201) {
          localStorage.removeItem("patientData");
          navigate("/");
        }
      }
      setOpenBackdrop(false);
    },
  });

  const { handleSubmit, handleChange, errors, values, touched, setFieldValue } =
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
    context !== "update" &&
      localStorage.setItem("patientData", JSON.stringify(values));
  }, [values]);

  function clearFields() {
    localStorage.removeItem("patientData");
    window.location.reload();
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <div className="form-container">
          <FormControl sx={{ minWidth: 120, gap: 4 }}>
            <TextField
              id="patientName"
              name="patientName"
              label="Nome Completo"
              type="name"
              value={values.patientName}
              variant="standard"
              onChange={handleChange}
              error={touched.patientName && Boolean(errors.patientName)}
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
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="birthDate"
              name="birthDate"
              type="date"
              label="Data de Nascimento (DD/MM/AAAA)"
              value={values.birthDate}
              variant="standard"
              error={touched.birthDate && Boolean(errors.birthDate)}
              helperText={touched.birthDate && errors.birthDate}
              onChange={handleChange}
              inputProps={{ maxLength: 10 }}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120, gap: 4 }}
            required
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
              error={touched.cep && Boolean(errors.cep)}
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
              error={touched.uf && Boolean(errors.uf)}
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
              error={touched.city && Boolean(errors.city)}
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
              error={touched.district && Boolean(errors.district)}
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
              error={touched.publicPlace && Boolean(errors.publicPlace)}
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
      {context !== "update" && (
        <Button onClick={clearFields} variant="secondary">
          Limpar campos
        </Button>
      )}
    </>
  );
}
