import { useState } from "react";
import { DataGrid, ptBR } from "@mui/x-data-grid";

export default function DataGridComponent({ rows, setSelectionModel }) {
  const [pageSize, setPageSize] = useState(5);

  const columns = [
    { field: "patientName", headerName: "Nome", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "birthDate",
      headerName: "Data de Nascimento",
      width: 150,
      editable: true,
      type: "date",
    },
    { field: "address", headerName: "Endereço", width: 350 },
  ];

  return (
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
  );
}
