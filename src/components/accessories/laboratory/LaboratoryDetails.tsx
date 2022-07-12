import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { Person, Notes } from "@material-ui/icons";
import React, { FC, useState } from "react";
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
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleOnExpanded = (section: string) => {
    setExpanded(section === expanded ? false : section);
  };

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
        <div className="labDetails">
          <div className="labDetails__content">
            <Accordion expanded={true}>
              <AccordionSummary>
                <Person fontSize="small" style={{ color: "white" }} />
                <span>{t("lab.patient")}</span>
              </AccordionSummary>
              <AccordionDetails>
                <div className="labDetails__content__item">
                  <div className="labDetails__content__item__label">
                    {t("lab.code")}:
                  </div>
                  <div className="labDetails__content__item__value">
                    {lab?.patientCode}
                  </div>
                </div>
                <div className="labDetails__content__item">
                  <div className="labDetails__content__item__label">
                    {t("lab.name")}:
                  </div>
                  <div className="labDetails__content__item__value">
                    {lab?.patName}
                  </div>
                </div>
                <div className="labDetails__content__item">
                  <div className="labDetails__content__item__label">
                    {t("lab.sex")}:
                  </div>
                  <div className="labDetails__content__item__value">
                    {lab?.sex}
                  </div>
                </div>
                <div className="labDetails__content__item">
                  <div className="labDetails__content__item__label">
                    {t("lab.age")}:
                  </div>
                  <div className="labDetails__content__item__value">
                    {lab?.age} {t("lab.years")}
                  </div>
                </div>
                <div className="labDetails__content__item">
                  <div className="labDetails__content__item__label">
                    {t("lab.status")}:
                  </div>
                  <div className="labDetails__content__item__value">
                    {lab?.inOutPatient === "O"
                      ? t("lab.outpatient")
                      : t("lab.inpatient")}
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={true}>
              <AccordionSummary>
                <Person fontSize="small" style={{ color: "white" }} />
                <span>{t("lab.exam")}</span>
              </AccordionSummary>
              <AccordionDetails>
                <div className="labDetails__content__item">
                  <div className="labDetails__content__item__label">
                    {t("lab.labcode")}:
                  </div>
                  <div className="labDetails__content__item__value">
                    {lab?.code}
                  </div>
                </div>
                {lab?.registrationDate && (
                  <div className="labDetails__content__item">
                    <div className="labDetails__content__item__label">
                      {t("lab.registrationdate")}:
                    </div>
                    <div className="labDetails__content__item__value">
                      {renderDate(lab?.registrationDate || "-")}
                    </div>
                  </div>
                )}
                <div className="labDetails__content__item">
                  <div className="labDetails__content__item__label">
                    {t("lab.examdate")}:
                  </div>
                  <div className="labDetails__content__item__value">
                    {renderDate(lab?.examDate || "-")}
                  </div>
                </div>
                <div className="labDetails__content__item">
                  <div className="labDetails__content__item__label">
                    {t("lab.examtype")}:
                  </div>
                  <div className="labDetails__content__item__value">
                    {lab?.exam?.examtype?.description ?? ""}
                  </div>
                </div>
                <div className="labDetails__content__item">
                  <div className="labDetails__content__item__label">
                    {t("lab.exam")}:
                  </div>
                  <div className="labDetails__content__item__value">
                    {lab?.exam?.description ?? ""}
                  </div>
                </div>
                <div className="labDetails__content__item">
                  <div className="labDetails__content__item__label">
                    {t("lab.material")}:
                  </div>
                  <div className="labDetails__content__item__value">
                    {lab?.material ?? ""}
                  </div>
                </div>
                <div className="labDetails__content__item">
                  <div className="labDetails__content__item__label">
                    {t("lab.result")}:
                  </div>
                  <div className="labDetails__content__item__value">
                    {lab?.result ?? ""}
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            {lab?.note ? (
              <Accordion expanded={true}>
                <AccordionSummary>
                  <Notes fontSize="small" style={{ color: "white" }} />
                  <span>{t("lab.note")}:</span>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="labDetails__content__item_long_text">
                    <div className="labDetails__content__item__value">
                      {lab.note}
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    default:
      return <InfoBox type="error" message={errorMessage} />;
  }
};
