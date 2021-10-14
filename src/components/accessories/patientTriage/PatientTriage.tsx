import { default as React, FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import checkIcon from "../../../assets/check-icon.png";
import { PatientExaminationDTO } from "../../../generated";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  createExamination,
  createExaminationReset,
  deleteExamination,
  deleteExaminationReset,
} from "../../../state/examinations/actions";
import { IState } from "../../../types";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import InfoBox from "../infoBox/InfoBox";
import { initialFields } from "./consts";
import PatientTriageForm from "./patientTriageForm/PatientTriageForm";
import PatientTriageTable from "./patientTriageTable/PatientTriageTable";
import "./styles.scss";
export type TActivityTransitionState = "IDLE" | "TO_RESET" | "FAIL";

const PatientTriage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

  const [deletedObjCode, setDeletedObjCode] = useState("");

  const patientDataCode = useSelector(
    (state: IState) => state.patients.selectedPatient.data?.code
  );

  const createStatus = useSelector<IState, string | undefined>(
    (state) => state.examinations.createExamination.status
  );
  const deleteStatus = useSelector<IState, string | undefined>(
    (state) => state.examinations.deleteExamination.status
  );

  useEffect(() => {
    if (createStatus === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [createStatus]);

  useEffect(() => {
    dispatch(createExaminationReset());
    dispatch(deleteExaminationReset());
  }, [dispatch]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(createExaminationReset());
      dispatch(deleteExaminationReset());
      setShouldResetForm(true);
      setShouldUpdateTable(true);
    }
  }, [dispatch, activityTransitionState]);

  const onSubmit = (triage: PatientExaminationDTO) => {
    setShouldResetForm(false);
    triage.patientCode = patientDataCode;
    dispatch(createExamination(triage));
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    dispatch(createExaminationReset());
    dispatch(deleteExaminationReset());
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  const onDelete = (code: number | undefined) => {
    setDeletedObjCode(code?.toString() ?? "");
    dispatch(deleteExamination(code));
  };

  return (
    <div className="patientTriage">
      <PatientTriageForm
        fields={initialFields}
        onSubmit={onSubmit}
        submitButtonLabel={t("common.savetriage")}
        resetButtonLabel={t("common.reset")}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
        isLoading={createStatus === "LOADING"}
      />

      {(createStatus === "FAIL" || deleteStatus === "FAIL") && (
        <div ref={infoBoxRef}>
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}

      <PatientTriageTable
        handleDelete={onDelete}
        shouldUpdateTable={shouldUpdateTable}
      />
      <ConfirmationDialog
        isOpen={createStatus === "SUCCESS"}
        title={t("examination.created")}
        icon={checkIcon}
        info={t("examination.createsuccess")}
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
      <ConfirmationDialog
        isOpen={deleteStatus === "SUCCESS"}
        title={t("opd.deleted")}
        icon={checkIcon}
        info={t("common.deletesuccess", { code: deletedObjCode })}
        primaryButtonLabel={t("common.ok")}
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => {}}
      />
    </div>
  );
};

export default PatientTriage;
