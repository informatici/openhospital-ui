import React, { FunctionComponent, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { ProfilePicture } from "../../accessories/profilePicture/ProfilePicture";
import { IPatientSearchItemProps, TActivityTransitionState } from "./types";
import { T } from '@transifex/react';

const PatientSearchItem: FunctionComponent<IPatientSearchItemProps> = ({
  patient,
  getPatientSuccessCallback,
}) => {
  const [activityTransitionState, setActivityTransitionState] = useState<
    TActivityTransitionState
  >("IDLE");

  useEffect(() => {
    if (activityTransitionState === "TO_PATIENT_DETAILS") {
      getPatientSuccessCallback(patient);
    }
  }, [activityTransitionState, getPatientSuccessCallback, patient]);

  switch (activityTransitionState) {
    case "TO_PATIENT_DETAILS":
      return <Redirect to={`/details/${patient.code}`} />; //TODO: use actual patient id instead
    default:
      return (
        <div className="patientSearchItem center-xs col-md-4 col-sm-6 col-xs-12">
          <div
            className="patientSearchItem__panel"
            onClick={() => setActivityTransitionState("TO_PATIENT_DETAILS")}
          >
            <div className="patientSearchItem__header">
              <div>
                <strong><T _str="PID" />:</strong> {patient.code}
              </div>
              <div>
                <strong><T _str="OPD" />:</strong> 32240321
              </div>
            </div>
            <div className="patientSearchItem__content">
              <div className="patientSearchItem__profile">
                <div className="patientSearchItem__profile__name">
                  {`${patient.firstName || ''} ${patient.secondName || ''}`}
                </div>
                <div className="patientSearchItem__profile__picture">
                  <ProfilePicture
                    isEditable={false}
                    preLoadedPicture={patient.blobPhoto}
                  />
                </div>
                <div className="patientSearchItem__profile__admission">
                <T _str="Last admission" />: <strong>24/27/2020</strong>
                </div>
              </div>
              <div className="patientSearchItem__divider" />
              <div className="patientSearchItem__info">
                <strong><T _str="Reason for visit" />:</strong> Pneumonia
              </div>
              <div className="patientSearchItem__info">
                <strong><T _str="Treatment made" />:</strong> Pneumonia
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default PatientSearchItem;
