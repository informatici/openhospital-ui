import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";
import { IState } from "../../../types";
import { initialFields } from "./consts";
import { createOpd, createOpdReset } from "../../../state/opds/actions";
import { getDiseasesOpd } from "../../../state/diseases/actions";
import PatientOPDForm from "./patientOPDForm/PatientOPDForm";
import {
  IDispatchProps,
  IStateProps,
  TActivityTransitionState,
  TProps,
} from "./types";
import { OpdDTO } from "../../../generated";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import InfoBox from "../infoBox/InfoBox";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../assets/check-icon.png";

const PatientOPD: FunctionComponent<TProps> = ({
  createOpd,
  createOpdReset,
  getDiseasesOpd,
  isLoading,
  hasSucceeded,
  hasFailed,
  diseasesData,
  patient,
}) => {
  const { t } = useTranslation();

  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

  useEffect(() => {
    if (hasFailed) {
      scrollToElement(infoBoxRef.current);
    }
  }, [hasFailed]);

  useEffect(() => {
    getDiseasesOpd();
  }, [getDiseasesOpd]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      createOpdReset();
      setShouldResetForm(true);
    }
  }, [activityTransitionState, createOpdReset]);

  const onSubmit = (createOpdValues: OpdDTO) => {
    setShouldResetForm(false);
    console.log("patient....", patient);
    createOpdValues.patientCode = patient?.code;
    createOpd(createOpdValues, diseasesData);
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };
  return (
    <div className="patientSummary">
      <PatientOPDForm
        fields={initialFields}
        onSubmit={onSubmit}
        submitButtonLabel={t("common.saveopd")}
        resetButtonLabel={t("common.discard")}
        isLoading={isLoading}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
      />
      <div ref={infoBoxRef}>
        {hasFailed && (
          <InfoBox
            type="error"
            message="Something went wrong, please retry later."
          />
        )}
      </div>
      <ConfirmationDialog
        isOpen={hasSucceeded}
        title="Opd Created"
        icon={checkIcon}
        info="The Opd registration was successful."
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
    </div>
  );
};
const mapStateToProps = (state: IState): IStateProps => ({
  isLoading: state.opds.createOpd === "LOADING",
  hasSucceeded: state.opds.createOpd.status === "SUCCESS",
  hasFailed: state.opds.createOpd.status === "FAIL",
  diseasesData: state.diseases.diseasesOpd.data,
  patient: state.patients.selectedPatient.data,
});

const mapDispatchToProps: IDispatchProps = {
  createOpd,
  createOpdReset,
  getDiseasesOpd,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientOPD);
