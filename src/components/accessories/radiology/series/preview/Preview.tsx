import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useAppSelector } from "libraries/hooks/redux";
import React from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";

interface IOwnProps {
  open: boolean;
  onClose: () => void;
}

export const Preview = ({ open, onClose }: IOwnProps) => {
  const { t } = useTranslation();

  const data = useAppSelector((state) => state.radiology.preview.data);

  return (
    <Dialog className="preview" onClose={onClose} open={open}>
      <DialogTitle>{t("radiology.instances.preview")}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        className="preview__close"
        color="secondary"
      >
        <Close />
      </IconButton>
      <DialogContent dividers>
        <img
          className="preview__image"
          src={`data:image/png;base64, ${data}`}
          alt="Preview"
        />
      </DialogContent>
    </Dialog>
  );
};
