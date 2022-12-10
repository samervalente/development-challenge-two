import { DataGrid, ptBR } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { StyledContainer, DeleteButton, UpdateButton } from "./styles";
import { getAllPatients, deletePatientsData } from "../../services/patients";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import UpdatePatientsForm from "./UpdatePatientsForm";

export default function MyPatients() {
  const [selectionModel, setSelectionModel] = useState([]);
  const [fetchDependecy, setFetchDependecy] = useState(false);
  const [patients, setPatients] = useState([]);
  const [openModal, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const patientsData = await getAllPatients();
      setPatients(patientsData.patients);
    }

    fetchData();
  }, [fetchDependecy]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "60%",
    flexDirection: "flex",
    justifyContent: "center",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const rows = patients;
  const columns = [
    { field: "patientName", headerName: "Nome", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    {
      field: "birthDate",
      headerName: "Data de Nascimento",
      width: 150,
      editable: true,
      type: "date",
    },
    { field: "address", headerName: "Endereço", width: 200 },
  ];

  async function updatePatientList() {
    setFetchDependecy(true);
  }

  async function deletePatients() {
    const body = { patients: selectionModel };
    await deletePatientsData(body);
    await updatePatientList();
  }

  return (
    <StyledContainer>
      <h1>Meus Pacientes</h1>
      <p>
        Aqui você pode ver e gerenciar todos seus pacientes cadastrados. Faça
        também modificações como atualizar e excluir seus respectivos dados.{" "}
      </p>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <div>
              <UpdatePatientsForm patientId={selectionModel[0]} />
              <Button
                onClick={() => {
                  setOpen(false);
                  setSelectionModel([]);
                }}
              >
                Cancelar
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
      <nav>
        <UpdateButton
          selectionModel={selectionModel}
          onClick={() => setOpen(true)}
          primary
        >
          Editar dados do paciente
        </UpdateButton>
        <DeleteButton
          selectionModel={selectionModel}
          onClick={() => deletePatients()}
        >
          Excluir {selectionModel.length > 1 ? "Selecionados" : "Selecionado"}
        </DeleteButton>
      </nav>
      <div style={{ height: 300, width: "80%" }}>
        <DataGrid
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          editMode="row"
          getRowId={(row) => row.patientId}
          rows={rows}
          columns={columns}
          processRowUpdate={(updatedRow, oldValues) => {
            console.log(updatedRow, oldValues);
          }}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </StyledContainer>
  );
}
