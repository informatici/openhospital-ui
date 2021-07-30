import React, { FC, useEffect, useRef, useState } from "react";
import "./styles.scss";
import {
  createTherapy,
  getTherapiesByPatientId,
  createTherapyReset,
} from "../../../state/therapies/actions";
import { getMedicals } from "../../../state/medicals/actions";
import { TherapyTransitionState } from "./types";
import { initialFields } from "./consts";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { TherapyRowDTO } from "../../../generated";
import { connect, useSelector } from "react-redux";
import { IState } from "../../../types";

const PatientExam: FC = () => {
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TherapyTransitionState>("IDLE");

  const patientData = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  useEffect(() => {
    getMedicals();
  }, [getMedicals]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      createTherapyReset();
      setShouldResetForm(true);
      setShouldUpdateTable(true);
    }
  }, [activityTransitionState, createTherapyReset]);

  useEffect(() => {
    getTherapiesByPatientId(patientData?.code);
  }, [patientData, getTherapiesByPatientId]);

  const onSubmit = (therapy: TherapyRowDTO) => {
    setShouldResetForm(false);
    therapy.patID = patientData;
    createTherapy(therapy);
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  return (
    <div className="patientExam">
      <ExamForm
        fields={initialFields}
        onSubmit={onSubmit}
        submitButtonLabel={t("common.savetherapy")}
        resetButtonLabel={t("common.discard")}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
        isLoading={true}
      />
    </div>
  );
};

export default PatientExam;
