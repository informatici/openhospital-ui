import {
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  Theme,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import { GridCloseIcon } from "@mui/x-data-grid";
import React, { FC } from "react";
import "./styles.scss";
import { ICustomModal } from "./types";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
}));

export const CustomModal: FC<ICustomModal> = ({
  title,
  description,
  content,
  open,
  onClose,
}) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby={title}
      aria-describedby={description}
      open={open}
      onClose={onClose}
      BackdropProps={{
        timeout: 200,
      }}
    >
      <div className={classes.paper + " custom__modal"}>
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
      </div>
    </Modal>
  );
};
