import React, { FunctionComponent } from "react";
import { IPatientSearchItemProps } from "./types";
import profilePicturePlaceholder from "../../../assets/profilePicturePlaceholder.png";

const PatientSearchItem: FunctionComponent<IPatientSearchItemProps> = ({
  patient,
}) => {
  const handleClick = () => {
    const path = "/details/1234"; //TODO: use actual patient id instead
    window.location.href = path;
  };
  return (
    <div className="patientSearchItem center-xs col-md-4 col-sm-6 col-xs-12">
      <div className="patientSearchItem__panel" onClick={handleClick}>
        <div className="patientSearchItem__header">
          <div><strong>PID:</strong> 32040</div>
          <div><strong>OPD:</strong> 32240321</div>
        </div>
        <div className="patientSearchItem__content">
          <div className="patientSearchItem__profile">
            <div className="patientSearchItem__profile__name">Name and Surname</div>
            <div>
              <img src={profilePicturePlaceholder} alt="profilePicture" />
            </div>
            <div className="patientSearchItem__profile__admission">Last admission: <strong>24/27/2020</strong></div>
          </div>
          <div className="patientSearchItem__divider" />
          <div className="patientSearchItem__info">
            <strong>Reason for visit:</strong> Pneumonia
          </div>
          <div className="patientSearchItem__info">
            <strong>Treatment made:</strong> Pneumonia
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSearchItem;
