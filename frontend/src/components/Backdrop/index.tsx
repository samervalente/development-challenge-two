import React from 'react'
import { BackdropProps, Backdrop } from "@mui/material/";
import CircularProgress from "@mui/material/CircularProgress";

export default function BackdropComponent({ open }: BackdropProps) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
