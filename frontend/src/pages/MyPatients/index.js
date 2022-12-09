import { DataGrid, ptBR } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Container, Button, DeleteButton, UpdateButton } from "./styles";
import { getAllPatients, deletePatientsData } from "../../services/patients";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

export default function MyPatients() {
  const [selectionModel, setSelectionModel] = useState([]);
  const [patients, setPatients] = useState([]);
  const [fetchDependecy, setFetchDependecy] = useState(false);
  const [openModal, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

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
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
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
    <Container>
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
            <Button>Cancelar</Button>
            Teste
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
    </Container>
  );
}
