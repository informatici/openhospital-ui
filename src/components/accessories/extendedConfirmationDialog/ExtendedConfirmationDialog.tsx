import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
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
    <Dialog open={isOpen}>
      <DialogTitle>
        <div className="dialog__title">{title}</div>
      </DialogTitle>
      <DialogContent>
        <div className="dialog__content">
          <div className="dialog__divider" />
          <img className="dialog__icon" alt="dialog-icon" src={icon} />
          <div className="dialog__info">{info}</div>
          <div className="dialog__buttonSet">
            {items.map((e) => (
              <div className="return_button">
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
