import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdmissionDTO, OpdDTO } from "../../../generated";
import { updateAdmission } from "../../../state/admissions/actions";
import { IState } from "../../../types";
import { useFields } from "../admission/useFields";
import { CurrentAdmissionData } from "./currentAdmissionData/CurrentAdmissionData";
import { CurrentAdmissionForm } from "./currentAdmissionForm/CurrentAdmissionForm";
import "./styles.scss";
import { IOwnProps } from "./types";

export const CurrentAdmission: FunctionComponent<IOwnProps> = ({
  onEditChange,
}) => {
  const dispatch = useDispatch();
  const [editionMode, setEditionMode] = useState(false);
  const currentAdmission = useSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.data
  );
  const lastOpd = useSelector<IState, OpdDTO | undefined>(
    (state) => state.opds.lastOpd.data
  );

  const handleEdit = () => {
    setEditionMode(true);
  };

  const handleDiscard = () => {
    setEditionMode(false);
  };

  const fields = useFields(currentAdmission, lastOpd?.disease);

  const onSubmit = (adm: AdmissionDTO) => {
    let admissionToSave: AdmissionDTO = {
      ...currentAdmission,
      deleted: "N",
      type: adm.type,
      admitted: adm.admitted,
      fhu: adm.fhu,
      admDate: adm.admDate,
      admType: adm.admType,
      diseaseIn: adm.diseaseIn,
      note: adm.note,
      ward: adm.ward,
    };
    dispatch(updateAdmission(admissionToSave));
  };

  useEffect(() => {
    if (onEditChange) {
      onEditChange(editionMode);
    }
  }, [editionMode, onEditChange]);

  return (
    <div className="currentAdmission">
      {currentAdmission && !editionMode && (
        <CurrentAdmissionData
          onEdit={onEditChange ? handleEdit : undefined}
          admission={currentAdmission}
        />
      )}
      {currentAdmission && editionMode && (
        <CurrentAdmissionForm
          fields={fields}
          onSubmit={onSubmit}
          onDiscard={handleDiscard}
        />
      )}
    </div>
  );
};
