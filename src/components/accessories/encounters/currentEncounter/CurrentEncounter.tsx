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
  onCloseEncounter,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentEncounter = useAppSelector(
    (state: IState) => state.encounters.getCurrentEncounterByPatient.data
  );

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const closeEncounter = (closureDate: Date) => {
    if (!currentEncounter) return;

    dispatch(
      updateEncounter({
        code: currentEncounter.code!,
        body: {
          ...currentEncounter,
          closedAt: closureDate.toISOString(),
        },
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
    </div>
  );
};
