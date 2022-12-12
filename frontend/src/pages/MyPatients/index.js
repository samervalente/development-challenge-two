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
  const [patients, setPatients] = useState([]);
  const [patientDataUpdate, setPatientDataUpdate] = useState({});
  const [selectionModel, setSelectionModel] = useState([]);

  const [dialogOpenState, setDialogOpenState] = useState(false);
  const [modalOpenState, setModalOpenState] = useState(false);
  const [backdropState, setBackdropState] = useState(false);

  const patientEmail = useRef("");

  function handleCloseDialog() {
    setDialogOpenState(false);
  }



  useEffect(() => {
    async function fetchData() {
      const patientsData = await getAllPatients();
      const formatedPatientData = patientsData.patients.map((patient) =>
        formatPatientData(patient)
      );
      setPatients(formatedPatientData);
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
    setModalOpenState(true);
    return patient;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setBackdropState(true);
    const isValidCEP = await validatePatientCEP(patientDataUpdate.cep);
    if (isValidCEP) {
      const { patientId } = patientDataUpdate;
      let newValues = Object.keys(patientDataUpdate)
        .map((updateKey, index) => {
          if (updateKey !== "patientId") {
            const updateValue = Object.values(patientDataUpdate)[index];
            if (updateValue !== patientEmail.current)
              return { updateKey, updateValue };
          }
        })
        .filter((updateValue) => updateValue);

      const updatedValues = { newPatientData: newValues };
      const response = await updatePatientData(patientId, updatedValues);
      setBackdropState(false);

      if (!response?.error) {
        updatePatientList();
        setModalOpenState(false);
      }
    } else {
      setBackdropState(false);
    }
  }

  async function deletePatients() {
    setDialogOpenState(true);
    const body = { patients: selectionModel };
    setBackdropState(true);
    await deletePatientsData(body);
    await updatePatientList();
    setBackdropState(false);
  }

  return (
    <StyledContainer>
      <h1>Meus Pacientes</h1>
      <p>
        Aqui você pode ver e gerenciar todos seus pacientes cadastrados. Faça
        também modificações como atualizar e excluir seus respectivos dados.{" "}
      </p>

      <SimpleDialog open={dialogOpenState} onClose={handleCloseDialog} />
      <Modal
        modalOpenState={modalOpenState}
        setModalOpenState={setModalOpenState}
      >
        <Backdrop backdropState={backdropState} />
        <div>
          <h1>Atualize os dados do paciente</h1>
          <PatientForm
            handleSubmit={handleSubmit}
            context={"update"}
            required={false}
            setPatientData={setPatientDataUpdate}
            patientData={patientDataUpdate}
            patientId={selectionModel[0]}
            setOpenModal={setModalOpenState}
            updatePatientList={updatePatientList}
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
        rows={patients}
        setSelectionModel={setSelectionModel}
      />
    </StyledContainer>
  );
}
