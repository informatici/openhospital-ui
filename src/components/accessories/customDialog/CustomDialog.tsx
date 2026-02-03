import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import React, { FC } from "react";
import { ICustomDialog } from "./types";

export const CustomDialog: FC<ICustomDialog> = ({
  title,
  description,
  content,
  open,
  onClose,
}) => {
  const [scroll] = React.useState<DialogProps["scroll"]>("paper");

  return (
    <Dialog
      aria-labelledby={title}
      aria-describedby={description}
      open={open}
      onClose={onClose}
      BackdropProps={{
        timeout: 200,
      }}
      scroll={scroll}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            <strong>{title}</strong>
            <hr />
          </Box>
          <Box>
            <IconButton onClick={onClose}>
              <GridCloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};
