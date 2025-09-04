import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { FunctionComponent, useState } from "react";
import "./styles.scss";
import { IProps } from "./types";
import Button from "components/accessories/button/Button";
import DateField from "components/accessories/dateField/DateField";

const CloseEncounterDialog: FunctionComponent<IProps & {
    withDateField?: boolean;
    handlePrimaryButtonClick: (date: Date) => void; // ← accepter la date
  }
> = ({
  isOpen,
  title,
  icon,
  info,
  primaryButtonLabel,
  secondaryButtonLabel,
  handlePrimaryButtonClick,
  handleSecondaryButtonClick,
  withDateField = false,
}) => {
  const [closureDate, setClosureDate] = useState<Date>(new Date());

  const handleConfirm = () => {
    handlePrimaryButtonClick(closureDate || new Date());
  };

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
          <div className="dialog__info" data-cy="dialog-info">
            {info}
          </div>

          {withDateField && (
            <div className="dialog__dateField">
              <DateField
                fieldName="closureDate"
                fieldValue={closureDate ? closureDate.toISOString() : ""}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy HH:mm"
                label="Date de clôture"
                onChange={(date: Date | null) => setClosureDate(date || new Date())}
                disabled={false}
                isValid={false}
                errorText=""
              />
            </div>
          )}

          <div className="dialog__buttonSet" data-cy="dialog-button-set">
            <div data-cy="dialog-return-button" className="return_button">
              <Button
                dataCy="approve-dialog"
                type="submit"
                variant="contained"
                onClick={handleConfirm}
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
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CloseEncounterDialog;
