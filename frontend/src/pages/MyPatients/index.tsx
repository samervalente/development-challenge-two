import React from "react";
import { useEffect, useState } from "react";
import { StyledContainer, DeleteButton, UpdateButton } from "./styles";
import Backdrop from "../../components/Backdrop";
import SimpleDialog from "../../components/Dialog";
import Modal from "../../components/Modal";
import DataGridComponent from "../../components/DataGrid";
import PatientForm from "../../components/PatientForm";
import {
  DialogTitle,
  DialogActions,
  Button as GenericButton,
} from "@mui/material";

import {
  getAllPatients,
  getPatientById,
  deletePatientsData,
} from "../../services/patients";
import { formatPatientData } from "../../utils/patientUtils";
import { TPatients } from "../../@types/patient";
import { IPatientData, IFormatedPatientData } from "../../interfaces/patients";

export default function MyPatients() {
  const [fetchDependecy, setFetchDependecy] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [patients, setPatients] = useState<Array<TPatients>>([]);
  const [patientDataUpdate, setPatientDataUpdate] = useState({});
  const [selectionModel, setSelectionModel] = useState([]);

  const [dialogOpenState, setDialogOpenState] = useState(false);
  const [modalOpenState, setOpenModal] = useState(false);
  const [backdropState, setOpenBackdrop] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      const patientsData: TPatients = await getAllPatients();
      const formatedPatientData: IFormatedPatientData[] | any =
        patientsData?.patients.map((patient: IPatientData) =>
          formatPatientData(patient)
        );
      setPatients(formatedPatientData);
      if (patientsData) {
        setIsFetching(false);
      }
    }

    fetchData();
  }, [fetchDependecy]);

  async function updatePatientList() {
    setFetchDependecy(!fetchDependecy);
  }

  async function openUpdateModal() {
    const patientId = selectionModel[0];
    const patient = await getPatientById(patientId);

    setPatientDataUpdate(patient);
    setOpenModal(true);
    return patient;
  }

  function closeModal() {
    setOpenModal(false);
  }

  async function deletePatients() {
    setDialogOpenState(false);
    setOpenBackdrop(true);
    const body = { patients: selectionModel };
    await deletePatientsData(body);
    await updatePatientList();
    setSelectionModel([]);
    setOpenBackdrop(false);
  }

  function cancelDeletePatients() {
    setDialogOpenState(false);
  }

  return (
    <StyledContainer>
      <h1>Meus Pacientes</h1>
      <p>
        Aqui você pode ver e gerenciar todos seus pacientes cadastrados. Faça
        também modificações como atualizar e excluir seus respectivos dados.{" "}
      </p>

      <Modal open={modalOpenState} onClose={closeModal}>
        <div>
          <Backdrop open={backdropState} />
          <h1>Atualize os dados do paciente</h1>
          <PatientForm
            setOpenBackdrop={setOpenBackdrop}
            context={"update"}
            setOpenModal={setOpenModal}
            updatePatientList={updatePatientList}
            updatePatientData={patientDataUpdate}
            setSelectionModel={setSelectionModel}
          />
        </div>
      </Modal>
      <nav>
        <UpdateButton selectionModel={selectionModel} onClick={openUpdateModal}>
          Editar dados do paciente
        </UpdateButton>
        <DeleteButton
          variant={"delete"}
          selectionModel={selectionModel}
          onClick={() => setDialogOpenState(true)}
        >
          Remover
          {selectionModel.length > 1
            ? " pacientes selecionados"
            : " paciente selecionado"}{" "}
          ({selectionModel.length})
        </DeleteButton>
      </nav>
      <SimpleDialog
        open={dialogOpenState}
        onClose={() => setDialogOpenState(false)}
      >
        <DialogTitle>Deseja mesmo remover este paciente?</DialogTitle>
        <DialogActions>
          <GenericButton autoFocus onClick={cancelDeletePatients}>
            Cancelar
          </GenericButton>
          <GenericButton onClick={() => deletePatients()}>Ok</GenericButton>
        </DialogActions>
      </SimpleDialog>
      <DataGridComponent
        isFetching={isFetching}
        rows={patients}
        setSelectionModel={setSelectionModel}
      />
    </StyledContainer>
  );
}