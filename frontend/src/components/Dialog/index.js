import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/system";

export default function SimpleDialog(props) {
  const { children, onClose, openDialog } = props;

  return (
    <Dialog onClose={onClose} open={openDialog}>
      <Box>{children}</Box>
    </Dialog>
  );
}
