import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function BackdropComponent({ backdropState }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={backdropState}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
