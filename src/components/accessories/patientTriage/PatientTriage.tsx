import { default as React, FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import checkIcon from "../../../assets/check-icon.png";
import { PatientExaminationDTO } from "../../../generated";
import { updateTriageFields } from "../../../libraries/formDataHandling/functions";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  createExamination,
  createExaminationReset,
  deleteExamination,
  deleteExaminationReset,
  updateExamination,
  updateExaminationReset,
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

  const [triageToEdit, setTriageToEdit] = useState({} as PatientExaminationDTO);

  const [creationMode, setCreationMode] = useState(true);

  const patientDataCode = useSelector(
    (state: IState) => state.patients.selectedPatient.data?.code
  );

  const examination = useSelector(
    (state: IState) => state.examinations.examinationsByPatientId.data
  );

  const createStatus = useSelector<IState, string | undefined>(
    (state) => state.examinations.createExamination.status
  );
  const updateStatus = useSelector<IState, string | undefined>(
    (state) => state.examinations.updateExamination.status
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
      dispatch(updateExaminationReset());
      dispatch(deleteExaminationReset());
      setShouldResetForm(true);
      setShouldUpdateTable(true);
    }
  }, [dispatch, activityTransitionState]);

  const onSubmit = (triage: PatientExaminationDTO) => {
    setShouldResetForm(false);
    triage.patientCode = patientDataCode;
    if (!creationMode && triage.pex_ID) {
      dispatch(updateExamination(triage.pex_ID, triage));
    } else {
      dispatch(createExamination(triage));
    }
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

  const onEdit = (row: PatientExaminationDTO) => {
    setTriageToEdit(row);
    setCreationMode(false);
    scrollToElement(null);
  };

  return (
    <div className="patientTriage">
      <PatientTriageForm
        fields={
          creationMode
            ? initialFields
            : updateTriageFields(initialFields, triageToEdit)
        }
        onSubmit={onSubmit}
        submitButtonLabel={
          creationMode ? t("common.savetriage") : t("common.update")
        }
        resetButtonLabel={t("common.discard")}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
        isLoading={createStatus === "LOADING"}
      />

      {(createStatus === "FAIL" ||
        updateStatus === "FAIL" ||
        deleteStatus === "FAIL") && (
        <div ref={infoBoxRef}>
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}

      <PatientTriageTable
        handleDelete={onDelete}
        handleEdit={onEdit}
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
        primaryButtonLabel="OK"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => {}}
      />
    </div>
  );
};

export default PatientTriage;
