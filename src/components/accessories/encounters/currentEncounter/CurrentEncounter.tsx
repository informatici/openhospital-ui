import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FunctionComponent } from "react";
import { updateEncounterStatus } from "state/encounter";
import { IState } from "../../../../types";
import { CurrentEncounterData } from "./currentEncounterData/CurrentEncounterData";
import "./styles.scss";
import { IOwnProps } from "./types";

export const CurrentEncounter: FunctionComponent<IOwnProps> = ({
  onEditChange,
}) => {
  const dispatch = useAppDispatch();
  const currentEncounter = useAppSelector((state: IState) =>
    state.encounters.getEncountersByPatient.data
      ? state.encounters.getEncountersByPatient.data[0]
      : undefined
  );

  const handleEdit = () => {
    dispatch(updateEncounterStatus(currentEncounter?.code!!));
  };

  return (
    <div className="currentEncounter">
      {currentEncounter && (
        <CurrentEncounterData
          onEdit={onEditChange ? handleEdit : undefined}
          encounter={currentEncounter}
        />
      )}
    </div>
  );
};
