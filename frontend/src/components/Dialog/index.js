import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

export default function SimpleDialog(props) {
  const { setOpenDialog, openDialog, deletePatients } = props;

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog onClose={handleClose} open={openDialog}>
      <Box>
        <DialogTitle>Deseja mesmo remover este paciente?</DialogTitle>
        <Button onClick={() => deletePatients()}>Confirmar</Button>
        <Button onClick={handleClose}>Cancelar</Button>
      </Box>
    </Dialog>
  );
}
