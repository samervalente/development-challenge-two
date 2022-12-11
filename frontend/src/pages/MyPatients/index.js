import { DataGrid, ptBR } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { StyledContainer, DeleteButton, UpdateButton } from "./styles";
import { getAllPatients, deletePatientsData } from "../../services/patients";
import Modal from "@mui/material/Modal";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import UpdatePatientsForm from "./UpdatePatientsForm";

export default function MyPatients() {
  const [selectionModel, setSelectionModel] = useState([]);
  const [fetchDependecy, setFetchDependecy] = useState(false);
  const [patients, setPatients] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [backdropState, setOpenBackdrop] = useState(false);
  const [pageSize, setPageSize] = useState(5);

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

  function formatPatientData(patientData) {
    const {
      patientId,
      patientName,
      email,
      birthDate,
      publicPlace,
      district,
      city,
      uf,
      cep,
    } = patientData;
    const formatedAddress = `${publicPlace}, ${district}, ${city} - ${uf} ${cep}`;
    return {
      patientId,
      patientName,
      email,
      birthDate,
      address: formatedAddress,
    };
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "70%",
    width: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const rows = patients;
  const columns = [
    { field: "patientName", headerName: "Nome", width: 220 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "birthDate",
      headerName: "Data de Nascimento",
      width: 150,
      editable: true,
      type: "date",
    },
    { field: "address", headerName: "Endereço", width: 350 },
  ];

  async function updatePatientList() {
    setFetchDependecy(!fetchDependecy);
  }

  async function deletePatients() {
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropState}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <div>
              <h1>Atualize os dados do paciente</h1>
              <UpdatePatientsForm
                patientId={selectionModel[0]}
                setOpenModal={setOpenModal}
                updatePatientList={updatePatientList}
              />
            </div>
          </Box>
        </Fade>
      </Modal>
      <nav>
        <UpdateButton
          selectionModel={selectionModel}
          onClick={() => setOpenModal(true)}
          primary
        >
          Editar dados do paciente
        </UpdateButton>
        <DeleteButton
          selectionModel={selectionModel}
          onClick={() => deletePatients()}
        >
          Remover
          {selectionModel.length > 1
            ? " pacientes selecionados"
            : " paciente selecionado"}{" "}
          ({selectionModel.length})
        </DeleteButton>
      </nav>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          pagination
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          editMode="row"
          getRowId={(row) => row.patientId}
          rows={rows}
          columns={columns}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </StyledContainer>
  );
}
