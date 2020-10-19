import React, { FunctionComponent, useState } from "react";
import { Redirect } from "react-router";
import profilePicturePlaceholder from "../../../assets/profilePicturePlaceholder.png";
import { IPatientSearchItemProps, TRouteActionState } from "./types";

const PatientSearchItem: FunctionComponent<IPatientSearchItemProps> = ({
  patient,
}) => {
  const [routeActionState, setRouteActionState] = useState<TRouteActionState>(
    "IDLE"
  );

  switch (routeActionState) {
    case "TO_PATIENT_DETAILS":
      return <Redirect to={`/details/1234`} />; //TODO: use actual patient id instead
    default:
      return (
        <div className="patientSearchItem center-xs col-md-4 col-sm-6 col-xs-12">
          <div
            className="patientSearchItem__panel"
            onClick={() => setRouteActionState("TO_PATIENT_DETAILS")}
          >
            <div className="patientSearchItem__header">
              <div>
                <strong>PID:</strong> 32040
              </div>
              <div>
                <strong>OPD:</strong> 32240321
              </div>
            </div>
            <div className="patientSearchItem__content">
              <div className="patientSearchItem__profile">
                <div className="patientSearchItem__profile__name">
                  {`${patient.firstName} ${patient.secondName}`}
                </div>
                <div>
                  <img src={profilePicturePlaceholder} alt="profilePicture" />
                </div>
                <div className="patientSearchItem__profile__admission">
                  Last admission: <strong>24/27/2020</strong>
                </div>
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
  }
};

export default PatientSearchItem;
