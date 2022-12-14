import React from "react";
import { ModalProps, Modal } from "@mui/material/";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import style from "./style";

export default function ModalComponent({
  children,
  open,
  onClose,
}: ModalProps) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  );
}
