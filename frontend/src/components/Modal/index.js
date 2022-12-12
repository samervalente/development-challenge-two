import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

export default function ModalComponent(props) {
  const { children, modalOpenState, setModalOpenState } = props;

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

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modalOpenState}
      onClose={() => setModalOpenState(false)}
      closeAfterTransition
    >
      <Fade in={modalOpenState}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  );
}
