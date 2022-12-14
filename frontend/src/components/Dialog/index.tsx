import React from "react";
import { DialogProps, Dialog } from "@mui/material/";
import { Box } from "@mui/system";

export default function SimpleDialog({ children, onClose, open }: DialogProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <Box>{children}</Box>
    </Dialog>
  );
}
