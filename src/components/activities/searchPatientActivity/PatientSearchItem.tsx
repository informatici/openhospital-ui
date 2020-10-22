import React, { FunctionComponent, useState } from "react";
import { Redirect } from "react-router";
import profilePicturePlaceholder from "../../../assets/profilePicturePlaceholder.png";
import { ProfilePicture } from "../../accessories/profilePicture/ProfilePicture";
import { IPatientSearchItemProps, TActivityTransitionState } from "./types";

const PatientSearchItem: FunctionComponent<IPatientSearchItemProps> = ({
  patient,
}) => {
  const [activityTransitionState, setActivityTransitionState] = useState<
    TActivityTransitionState
  >("IDLE");

  switch (activityTransitionState) {
    case "TO_PATIENT_DETAILS":
      return <Redirect to={`/details/1234`} />; //TODO: use actual patient id instead
    default:
      return (
        <div className="patientSearchItem center-xs col-md-4 col-sm-6 col-xs-12">
          <div
            className="patientSearchItem__panel"
            onClick={() => setActivityTransitionState("TO_PATIENT_DETAILS")}
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
                <div className="patientSearchItem__profile__picture">
                  <ProfilePicture
                    isEditable={false}
                    preLoadedPicture={patient.blobPhoto}
                  />
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
