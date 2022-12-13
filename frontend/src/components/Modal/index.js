import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import style from "./style";

export default function ModalComponent(props) {
  const { children, modalOpenState, setModalOpenState } = props;

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
