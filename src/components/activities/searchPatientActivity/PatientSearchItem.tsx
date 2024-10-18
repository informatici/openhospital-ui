import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { PatientDTOStatusEnum } from "../../../generated";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { ProfilePicture } from "../../accessories/profilePicture/ProfilePicture";
import { IPatientSearchItemProps, TActivityTransitionState } from "./types";

const PatientSearchItem: FunctionComponent<IPatientSearchItemProps> = ({
  patient,
  getPatientSuccessCallback,
  hideAdditionalInformation = false,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

  useEffect(() => {
    if (activityTransitionState === "TO_PATIENT_DETAILS") {
      if (getPatientSuccessCallback) {
        getPatientSuccessCallback(patient);
      } else {
        navigate(`/patients/details/${patient.code}`);
      }
    }
  }, [activityTransitionState, getPatientSuccessCallback, navigate, patient]);

  const patientDate = renderDate(patient.birthDate ?? "");

  return (
    <div data-cy="patient-search-item" className="patientSearchItem col-xs-12">
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
            <div className="patientSearchItem__profile__content__status">
              {patient?.status === PatientDTOStatusEnum.I ? (
                <div className="patientDetails_status_wrapper patientDetails_status_in">
                  <h6>
                    {t("patient.status")}: <span>{t("patient.instatus")}</span>
                  </h6>
                </div>
              ) : (
                <div className="patientDetails_status_wrapper patientDetails_status_out">
                  <h6>
                    {t("patient.status")}: <span>{t("patient.outstatus")}</span>
                  </h6>
                </div>
              )}
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
};

export default PatientSearchItem;
