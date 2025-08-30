import ConfirmationDialog from "components/accessories/confirmationDialog/ConfirmationDialog";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { updateEncounterStatus } from "state/encounter";
import warningIcon from "../../../../assets/warning-icon.png";
import { IState } from "../../../../types";
import { CurrentEncounterData } from "./currentEncounterData/CurrentEncounterData";
import "./styles.scss";
import { IOwnProps } from "./types";

export const CurrentEncounter: FunctionComponent<IOwnProps> = ({
  onEditChange,
  onEditCode,
  onUpdateStatusCode,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentEncounter = useAppSelector(
    (state: IState) => state.encounters.getCurrentEncounterByPatient.data
  );

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);
  const updateStatusCallback = () => {
    dispatch(updateEncounterStatus(currentEncounter?.code!!));
    setOpenResetConfirmation(false);
    onUpdateStatusCode && onUpdateStatusCode();
  };

  const handleEdit = () => {
    setOpenResetConfirmation(true);
  };

  return (
    <div className="currentEncounter">
      {currentEncounter && (
        <CurrentEncounterData
          onEdit={onEditChange ? handleEdit : undefined}
          onEditCode={onEditCode}
          encounter={currentEncounter}
        />
      )}
      <ConfirmationDialog
        isOpen={openResetConfirmation}
        title={t("encounter.updatestatus").toUpperCase()}
        info={t("encounter.updatestatusmessage")}
        icon={warningIcon}
        primaryButtonLabel={t("common.yes")}
        secondaryButtonLabel={t("common.no")}
        handlePrimaryButtonClick={updateStatusCallback}
        handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
      />
    </div>
  );
};
