import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { FunctionComponent } from "react";
import Button from "../button/Button";
import "./styles.scss";
import { IProps } from "./types";

const ConfirmationDialog: FunctionComponent<IProps> = ({
  isOpen,
  title,
  icon,
  info,
  primaryButtonLabel,
  secondaryButtonLabel,
  handlePrimaryButtonClick,
  handleSecondaryButtonClick,
}) => {
  return (
    <Dialog open={isOpen}>
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
            <div data-cy="dialog-return-button" className="return_button">
              <Button
                dataCy="approve-dialog"
                type="submit"
                variant="contained"
                onClick={handlePrimaryButtonClick}
              >
                {primaryButtonLabel}
              </Button>
            </div>
            {secondaryButtonLabel ? (
              <div className="reset_button">
                <Button
                  dataCy="close-dialog"
                  type="reset"
                  variant="text"
                  onClick={handleSecondaryButtonClick}
                >
                  {secondaryButtonLabel}
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
