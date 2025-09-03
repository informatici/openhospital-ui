import { useAppSelector } from "libraries/hooks/redux";
import React, { FunctionComponent, useEffect, useState } from "react";
import { IState } from "types";
import { CurrentMedicalHistoryData } from "./currentMedicalHistoryData/CurrentMedicalHistoryData";
import "./styles.scss";
import { IOwnProps } from "./types";

export const CurrentMedicalHistory: FunctionComponent<IOwnProps> = ({
  onEditChange,
  onEditMedicalHistory,
}) => {
  const [editionMode, setEditionMode] = useState(false);
  const currentMedicalHistory = useAppSelector(
    (state: IState) => state.medicalhistory.getMedicalHistoryByPatientCode.data
  );

  const handleEdit = () => {
    setEditionMode(true);
    onEditMedicalHistory && onEditMedicalHistory(currentMedicalHistory!);
  };

  useEffect(() => {
    if (onEditChange) {
      onEditChange(editionMode);
    }
  }, [editionMode, onEditChange]);

  return (
    <div className="currentMedicalHistory">
      {currentMedicalHistory && !editionMode && (
        <CurrentMedicalHistoryData
          onEdit={onEditChange ? handleEdit : undefined}
          medicalHistory={currentMedicalHistory}
        />
      )}
    </div>
  );
};
