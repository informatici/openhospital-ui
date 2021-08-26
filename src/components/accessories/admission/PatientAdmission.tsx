import React, { FC, useRef, useState } from "react";
import AdmissionsTable from "./admissionTable/AdmissionTable";
import AdmissionForm from "./admissionForm/AdmissionForm";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { useSelector } from "react-redux";
import { IState } from "../../../types";
import { AdmissionTransitionState } from "./types";
import { initialFields } from "./consts";
import { AdmissionDTO } from "../../../generated";

const PatientAdmission: FC = () => {
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<AdmissionTransitionState>("IDLE");

  const patientData = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );
  const onSubmit = (adm: AdmissionDTO) => {
    setShouldResetForm(false);
    adm.patient = patientData;
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  return (
    <div className="patientTherapy">
      <AdmissionForm
        fields={initialFields}
        onSubmit={onSubmit}
        submitButtonLabel={t("common.save")}
        resetButtonLabel={t("common.discard")}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
        isLoading={false}
      />
      <AdmissionsTable shouldUpdateTable={shouldUpdateTable} />
    </div>
  );
};

export default PatientAdmission;
