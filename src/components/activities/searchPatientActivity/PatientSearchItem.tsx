import React, { FunctionComponent } from "react";
import { IPatientSearchItemProps } from "./types";
import profilePicturePlaceholder from "../../../assets/profilePicturePlaceholder.png";

const PatientSearchItem: FunctionComponent<IPatientSearchItemProps> = ({
  patient,
}) => {
  const path = "/patientDetails/" + patient.id;
  return (
    <div className="patientSearchItem center-xs col-md-4 col-sm-6 col-xs-12">
      <div className="patientSearchItem__panel">
        <div className="patientSearchItem__header">
          <div>PID: 32040</div>
          <div>OPD: 32240321</div>
        </div>
        <div className="patientSearchItem__content">
          <div className="patientSearchItem__profile">
            <div className="patientSearchItem__profile__name">name</div>
            <div>
              <img src={profilePicturePlaceholder} alt="profilePicture" />
            </div>
            <div>last admission</div>
          </div>
          <div className="patientSearchItem__divider" />
          <div className="patientSearchItem__info">
            reason for visit: pneumonia
          </div>
          <div className="patientSearchItem__info">
            treatment made: pneumonia
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSearchItem;
