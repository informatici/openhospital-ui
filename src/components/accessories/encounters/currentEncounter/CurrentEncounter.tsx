import ConfirmationDialog from "components/accessories/confirmationDialog/ConfirmationDialog";
import { EncounterDTO } from "generated";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { updateEncounter } from "state/encounter";
import warningIcon from "../../../../assets/warning-icon.png";
import { IState } from "../../../../types";
import CloseEncounterDialog from "../closeEncounterDialog/CloseEncounterDialog";
import { CurrentEncounterData } from "./currentEncounterData/CurrentEncounterData";
import "./styles.scss";
import { IOwnProps } from "./types";

export const CurrentEncounter: FunctionComponent<IOwnProps> = ({
  onEditChange,
  onEditCode,
  onDelete,
  onCloseEncounter,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentEncounter = useAppSelector(
    (state: IState) => state.encounters.getCurrentEncounterByPatient.data
  );

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);
  const [
    isConfirmDeleteEncounterDialogOpen,
    setIsConfirmDeleteEncounterDialogOpen,
  ] = useState(false);

  const closeEncounter = (closureDate: string) => {
    if (!currentEncounter) return;
    const encounterToUpdate = {
      ...currentEncounter,
      closedAt: closureDate,
    } as EncounterDTO;
    dispatch(
      updateEncounter({
        code: currentEncounter.code!,
        body: encounterToUpdate,
      })
    );
    setOpenResetConfirmation(false);
    onCloseEncounter && onCloseEncounter();
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
          onDelete={() => {
            setIsConfirmDeleteEncounterDialogOpen(true);
          }}
          encounter={currentEncounter}
        />
      )}
      <CloseEncounterDialog
        isOpen={openResetConfirmation}
        title={t("encounter.closedtitle").toUpperCase()}
        info={t("encounter.closeddate")}
        icon={warningIcon}
        primaryButtonLabel={t("common.yes")}
        secondaryButtonLabel={t("common.no")}
        handlePrimaryButtonClick={closeEncounter}
        handleSecondaryButtonClick={() => setOpenResetConfirmation(false)}
        withDateField={true}
      />

      <ConfirmationDialog
        isOpen={isConfirmDeleteEncounterDialogOpen}
        title={t("encounter.delete")}
        icon={warningIcon}
        info={t("encounter.deletemessage")}
        primaryButtonLabel={t("common.delete")}
        secondaryButtonLabel={t("common.discard")}
        handlePrimaryButtonClick={() => {
          onDelete && onDelete();
          setIsConfirmDeleteEncounterDialogOpen(false);
        }}
        handleSecondaryButtonClick={() =>
          setIsConfirmDeleteEncounterDialogOpen(false)
        }
      />
    </div>
  );
};
