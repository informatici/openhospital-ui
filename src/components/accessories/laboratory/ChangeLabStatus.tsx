import { Check, Close } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChangeLabStatusProps } from "./types";

export const ChangeLabStatus: React.FC<ChangeLabStatusProps> = ({
  status,
  labCode,
  onClick,
  onClose,
  isOpen = false,
}) => {
  const [open, setOpen] = useState(isOpen);

  const { t } = useTranslation();
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setOpen(false);
  };

  const handleClick = () => {
    onClick();
    handleClose();
  };

  return (
    <Dialog
      id="lab_change_status-dialog"
      title="Lab Exam Status Chnage Dialog"
      open={open}
      onClose={handleClose}
    >
      <AppBar style={{ position: "relative" }}>
        <Toolbar>
          <Typography style={{ flex: 1 }} variant="h6" component="div">
            {t("lab.changestatus")}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={(event: any) => {
              handleClose();
            }}
            aria-label="close"
          >
            <GridCloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <div>
          <p>
            {t("lab.changelabstatusto", {
              code: labCode,
              status: t("lab.statuses." + status.toLowerCase()),
            })}
            . {t("common.continue")}
          </p>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          <Close /> {t("common.cancel")}
        </Button>
        <Button
          color="primary"
          variant="contained"
          autoFocus
          onClick={handleClick}
          style={{ marginLeft: "15px" }}
        >
          <Check /> {t("common.ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
