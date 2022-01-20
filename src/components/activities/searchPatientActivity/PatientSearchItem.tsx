import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { ProfilePicture } from "../../accessories/profilePicture/ProfilePicture";
import { IPatientSearchItemProps, TActivityTransitionState } from "./types";

const PatientSearchItem: FunctionComponent<IPatientSearchItemProps> = ({
  patient,
  getPatientSuccessCallback,
  hideAdditionalInformation = false,
}) => {
  const { t } = useTranslation();
  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

  useEffect(() => {
    if (
      getPatientSuccessCallback &&
      activityTransitionState === "TO_PATIENT_DETAILS"
    ) {
      getPatientSuccessCallback(patient);
    }
  }, [activityTransitionState, getPatientSuccessCallback, patient]);

  const patientDate = renderDate(patient.birthDate ?? "");

  switch (activityTransitionState) {
    case "TO_PATIENT_DETAILS":
      return getPatientSuccessCallback ? (
        <Redirect to={`/details/${patient.code}`} />
      ) : null; //TODO: use actual patient id instead
    default:
      return (
        <div className="patientSearchItem col-xs-12">
          <div
            className="patientSearchItem__panel"
            onClick={() => setActivityTransitionState("TO_PATIENT_DETAILS")}
          >
            <div className="patientSearchItem__profile">
              <div className="patientSearchItem__profile__picture">
                <ProfilePicture
                  isEditable={false}
                  preLoadedPicture={patient.blobPhoto}
                />
              </div>
              <div className="patientSearchItem__profile__content">
                <div className="patientSearchItem__profile__content__name">
                  {`${patient.firstName || ""} ${patient.secondName || ""}`}
                </div>
                <div className="patientSearchItem__profile__content__info">
                  <div className="patientSearchItem__profile__content__item">
                    <strong>{t("patient.patientID")}:</strong> {patient.code}
                  </div>
                  <div className="patientSearchItem__profile__content__item">
                    <strong>{t("patient.sex")}:</strong> {patient.sex || "-"}
                  </div>
                  {!hideAdditionalInformation && (
                    <div className="patientSearchItem__profile__content__item">
                      <strong>{t("patient.birthdate")}:</strong> {patientDate}
                    </div>
                  )}
                  {!hideAdditionalInformation && (
                    <div className="patientSearchItem__profile__content__item">
                      <strong>{t("patient.hasinsurance")}:</strong>{" "}
                      {patient.hasInsurance || "-"}
                    </div>
                  )}
                </div>
                <div className="patientSearchItem__profile__content__contact">
                  {!hideAdditionalInformation && (
                    <div className="patientSearchItem__profile__content__item">
                      <strong>{t("patient.address")}:</strong>{" "}
                      {`${patient.address || ""} ${
                        patient.city ? " - " + patient.city : ""
                      }`}
                    </div>
                  )}
                  <div className="patientSearchItem__profile__content__item">
                    <strong>{t("patient.telephone")}:</strong>{" "}
                    {patient.telephone || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default PatientSearchItem;
