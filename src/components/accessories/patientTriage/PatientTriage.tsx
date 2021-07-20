import {
  default as React,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";
import checkIcon from "../../../assets/check-icon.png";
import { PatientExaminationDTO } from "../../../generated";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  createExamination,
  createExaminationReset,
} from "../../../state/examinations/actions";
import { IState } from "../../../types";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import InfoBox from "../infoBox/InfoBox";
import { initialFields } from "./consts";
import PatientTriageForm from "./patientTriageForm/PatientTriageForm";
import PatientTriageTable from "./patientTriageTable/PatientTriageTable";
import "./styles.scss";
import {
  IDispatchProps,
  IStateProps,
  TActivityTransitionState,
  TProps,
} from "./types";

const PatientTriage: FunctionComponent<TProps> = ({
  createExamination,
  createExaminationReset,
  isLoading,
  hasSucceeded,
  hasFailed,
}) => {
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

  const patientDataCode = useSelector(
    (state: IState) => state.patients.selectedPatient.data?.code
  );
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
    triage.patientCode = patientDataCode;
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
        submitButtonLabel={t("common.savetriage")}
        resetButtonLabel={t("common.discard")}
        shouldResetForm={shouldResetForm}
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
