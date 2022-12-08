import { DataGrid, ptBR } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Container, DeleteButton } from "./styles";
import { getAllPatients } from "../../services/patients";

export default function MyPatients() {
  const [selectionModel, setSelectionModel] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const patientsData = await getAllPatients();
      setPatients(patientsData.patients);
    }

    fetchData()
  }, []);

  const rows = patients

  const columns = [
    { field: "patientName", headerName: "Nome", width: 150, editable: true },
    { field: "email", headerName: "Email", width: 150, editable: true },
    {
      field: "birthDate",
      headerName: "Data de Nascimento",
      width: 150,
      editable: true,
      type: "date",
    },
    { field: "address", headerName: "Endereço", width: 200, editable: true },
  ];

  return (
    <Container>
      <h1>Meus Pacientes</h1>
      <p>
        Aqui você pode ver e gerenciar todos seus pacientes cadastrados. Faça
        também modificações como atualizar e excluir seus respectivos dados.{" "}
      </p>
      <div style={{ height: 300, width: "80%" }}>
        <DataGrid
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          getRowId={(row) => row.patientId}
          rows={rows}
          columns={columns}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
      <DeleteButton selectionModel={selectionModel}>
        Excluir {selectionModel.length > 1 ? "Selecionados" : "Selecionado"}
      </DeleteButton>
    </Container>
  );
}
