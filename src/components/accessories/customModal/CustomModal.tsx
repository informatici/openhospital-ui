import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Box, DialogContent, DialogTitle, IconButton } from "@material-ui/core";
import "./styles.scss";
import { GridCloseIcon } from "@material-ui/data-grid";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    display: "inline-block",
    width: "auto",
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
}));

interface ICustomModal {
  title: string;
  description: string;
  content: React.ReactElement;
  open: boolean;
  onClose: () => void;
}

export const CustomModal: FC<ICustomModal> = ({
  title,
  description,
  content,
  open,
  onClose,
}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

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
      <div style={modalStyle} className={classes.paper}>
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
