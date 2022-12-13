import { useEffect, useState, useRef } from "react";
import { StyledContainer, DeleteButton, UpdateButton } from "./styles";
import Backdrop from "../../components/Backdrop";
import {
  getAllPatients,
  getPatientById,
  updatePatientData,
  deletePatientsData,
} from "../../services/patients";
import SimpleDialog from "../../components/Dialog";
import DataGridComponent from "../../components/DataGrid";
import {
  formatPatientData,
  validatePatientCEP,
} from "../../utils/patientUtils";
import Modal from "../../components/Modal";
import PatientForm from "../../components/PatientForm";

export default function MyPatients() {
  const [fetchDependecy, setFetchDependecy] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [patients, setPatients] = useState([]);
  const [patientDataUpdate, setPatientDataUpdate] = useState({});
  const [selectionModel, setSelectionModel] = useState([]);

  const [dialogOpenState, setDialogOpenState] = useState(false);
  const [modalOpenState, setOpenModal] = useState(false);
  const [backdropState, setOpenBackdrop] = useState(false);

  const patientEmail = useRef("");

  function handleCloseDialog() {
    setDialogOpenState(false);
  }

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      const patientsData = await getAllPatients();
      const formatedPatientData = patientsData.patients.map((patient) =>
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
    patientEmail.current = patient.email;
    setOpenModal(true);
    return patient;
  }

  async function deletePatients() {
    setDialogOpenState(true);
    const body = { patients: selectionModel };
    setOpenBackdrop(true);
    await deletePatientsData(body);
    await updatePatientList();
    setOpenBackdrop(false);
  }

  return (
    <StyledContainer>
      <h1>Meus Pacientes</h1>
      <p>
        Aqui você pode ver e gerenciar todos seus pacientes cadastrados. Faça
        também modificações como atualizar e excluir seus respectivos dados.{" "}
      </p>

      <SimpleDialog open={dialogOpenState} onClose={handleCloseDialog} />

      <Modal modalOpenState={modalOpenState} setModalOpenState={setOpenModal}>
        <Backdrop backdropState={backdropState} />
        <div>
          <h1>Atualize os dados do paciente</h1>
          <PatientForm
            setOpenBackdrop={setOpenBackdrop}
            context={"update"}
            setOpenModal={setOpenModal}
            setPatientData={{ setPatientDataUpdate }}
            updatePatientList={updatePatientList}
            patientData={patientDataUpdate}
            setSelectionModel={setSelectionModel}
          />
        </div>
      </Modal>

      <nav>
        <UpdateButton
          selectionModel={selectionModel}
          onClick={openUpdateModal}
          primary
        >
          Editar dados do paciente
        </UpdateButton>
        <DeleteButton selectionModel={selectionModel}>
          Remover
          {selectionModel.length > 1
            ? " pacientes selecionados"
            : " paciente selecionado"}{" "}
          ({selectionModel.length})
        </DeleteButton>
      </nav>
      <DataGridComponent
        isFetching={isFetching}
        rows={patients}
        setSelectionModel={setSelectionModel}
      />
    </StyledContainer>
  );
}
