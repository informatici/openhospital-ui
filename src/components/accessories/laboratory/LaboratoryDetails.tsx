import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { IState } from "../../../types";
import { IStatus } from "../billTable/types";
import InfoBox from "../infoBox/InfoBox";
import { label } from "../patientTherapy/patientTherapyTable/consts";
import "./styles.scss";

export const LaboratoryDetails: FC = () => {
  const { t } = useTranslation();

  const lab = useSelector(
    (state: IState) => state.laboratories.getLabByCode.data
  );
  const status = useSelector(
    (state: IState) => state.laboratories.getLabByCode.status
  );
  const errorMessage = useSelector(
    (state: IState) => state.laboratories.getLabByCode.error?.message
  );

  switch (status) {
    case "LOADING":
      return <InfoBox type="warning" message={t("lab.loadingdetails")} />;
    case "SUCCESS":
      return (
        <div className="lab__details">
          <div className="section">
            <div className="section__title">{t("lab.patient")}</div>
            <div className="section__content">
              <div>
                <strong>{t("lab.code")}</strong> -{" "}
                <span>{lab?.patientCode}</span>
              </div>
              |
              <div>
                <strong>{t("lab.name")}</strong> - <span>{lab?.patName}</span>
              </div>
              |
              <div>
                <strong>{t("lab.sex")}</strong> - <span>{lab?.sex}</span>
              </div>
              |
              <div>
                <strong>{t("lab.age")}</strong> -{" "}
                <span>
                  {lab?.age} {t("lab.years")}
                </span>
              </div>
              |
              <div>
                <strong>{t("lab.status")}</strong> -{" "}
                <span>
                  {lab?.inOutPatient === "O"
                    ? t("lab.outpatient")
                    : t("lab.inpatient")}
                </span>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="section__title">{t("lab.exam")}</div>
            <div className="section__content">
              <div>
                <strong>{t("lab.labcode")}</strong> - <span>{lab?.code}</span>
              </div>
              |
              <div>
                <strong>{t("lab.registrationdate")}</strong> -{" "}
                <span>{renderDate(lab?.registrationDate ?? "")}</span>
              </div>
              |
              <div>
                <strong>{t("lab.examdate")}</strong> -{" "}
                <span>{renderDate(lab?.examDate ?? "")}</span>
              </div>
              |
              <div>
                <strong>{t("lab.examtype")}</strong> -{" "}
                <span>{lab?.exam?.examtype?.description}</span>
              </div>
              |
              <div>
                <strong>{t("lab.exam")}</strong> -{" "}
                <span>{lab?.exam?.description}</span>
              </div>
              |
              <div>
                <strong>{t("lab.material")}</strong> -{" "}
                <span>{lab?.material}</span>
              </div>
              |
              <div>
                <strong>{t("lab.result")}</strong> - <span>{lab?.result}</span>
              </div>
            </div>
            {lab?.note != null && (
              <div className="section">
                <div className="section__title">{t("lab.note")}</div>
                <div className="section__content_note">{lab?.note}</div>
              </div>
            )}
          </div>
        </div>
      );
    default:
      return <InfoBox type="error" message={errorMessage} />;
  }
};
