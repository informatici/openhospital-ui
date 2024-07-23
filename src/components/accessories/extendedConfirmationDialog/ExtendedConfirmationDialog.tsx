import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { FunctionComponent } from "react";
import Button from "../button/Button";
import "./styles.scss";
import { IProps } from "./types";

const ExtendedConfirmationDialog: FunctionComponent<IProps> = ({
  isOpen,
  title,
  icon,
  info,
  items,
}) => {
  return (
    <Dialog open={isOpen} className="extendedDialog">
      <DialogTitle>
        <div data-cy="dialog-title" className="dialog__title">
          {title}
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="dialog__content">
          <div className="dialog__divider" />
          <img className="dialog__icon" alt="dialog-icon" src={icon} />
          <div className="dialog__info" data-cy="dialog-info">
            {info}
          </div>
          <div className="dialog__buttonSet" data-cy="dialog-button-set">
            {items.map((e) => (
              <div data-cy="dialog-return-button" className="return_button">
                <Button type="submit" variant="contained" onClick={e.onClick}>
                  {e.label}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExtendedConfirmationDialog;
