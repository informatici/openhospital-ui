import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import PatientTriageForm from "./patientTriageForm/PatientTriageForm";
import PatientTriageTable from "./patientTriageTable/PatientTriageTable";
import checkIcon from "../../../assets/check-icon.png";
import { initialFields } from "./consts";
import {
  createExamination,
  createExaminationReset,
} from "../../../state/examinations/actions";
import "./styles.scss";
import { PatientExaminationDTO } from "../../../generated";
import { IState } from "../../../types";
import {
  IDispatchProps,
  IStateProps,
  TActivityTransitionState,
  TProps,
} from "./types";
import { connect } from "react-redux";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import InfoBox from "../infoBox/InfoBox";

const PatientTriage: FunctionComponent<TProps> = ({
  createExamination,
  createExaminationReset,
  isLoading,
  hasSucceeded,
  hasFailed,
}) => {
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [
    activityTransitionState,
    setActivityTransitionState,
  ] = useState<TActivityTransitionState>("IDLE");

  useEffect(() => {
    if (hasFailed) {
      scrollToElement(infoBoxRef.current);
    }
  }, [hasFailed]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      createExaminationReset();
      setShouldResetForm(true);
      setShouldUpdateTable(true);
    }
  }, [activityTransitionState, createExaminationReset]);

  const onSubmit = (triage: PatientExaminationDTO) => {
    setShouldResetForm(false);
    createExamination(triage);
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  return (
    <div className="patientTriage">
      <PatientTriageForm
        fields={initialFields}
        onSubmit={onSubmit}
        submitButtonLabel="Save triage"
        shouldResetForm={shouldResetForm}
        resetButtonLabel="Discard"
        resetFormCallback={resetFormCallback}
        isLoading={isLoading}
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
        title="Patient Created"
        icon={checkIcon}
        info="The examination registration was successful."
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
      <PatientTriageTable shouldUpdateTable={shouldUpdateTable} />
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  isLoading: state.examinations.createExamination.status === "LOADING",
  hasSucceeded: state.examinations.createExamination.status === "SUCCESS",
  hasFailed: state.examinations.createExamination.status === "FAIL",
});

const mapDispatchToProps: IDispatchProps = {
  createExamination,
  createExaminationReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientTriage);
