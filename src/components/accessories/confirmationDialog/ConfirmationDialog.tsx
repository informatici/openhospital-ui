import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { FunctionComponent } from "react";
import SmallButton from "../smallButton/SmallButton";
import TextButton from "../textButton/TextButton";
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
        <div className="dialog__title">{title}</div>
      </DialogTitle>
      <DialogContent>
        <div className="dialog__content">
          <div className="dialog__divider" />
          <img className="dialog__icon" alt="dialog-icon" src={icon} />
          <div className="dialog__info">{info}</div>
          <div className="dialog__buttonSet">
            <div className="return_button">
              <SmallButton onClick={handlePrimaryButtonClick}>
                {primaryButtonLabel}
              </SmallButton>
            </div>
            {secondaryButtonLabel ? (
              <div className="reset_button">
                <TextButton onClick={handleSecondaryButtonClick}>
                  {secondaryButtonLabel}
                </TextButton>
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
