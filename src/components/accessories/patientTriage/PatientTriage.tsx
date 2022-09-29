import {
  default as React,
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import checkIcon from "../../../assets/check-icon.png";
import { PatientExaminationDTO } from "../../../generated";
import { updateTriageFields } from "../../../libraries/formDataHandling/functions";
import { Permission } from "../../../libraries/permissionUtils/Permission";
import { usePermission } from "../../../libraries/permissionUtils/usePermission";
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

  const deleteStatus = useSelector<IState, string | undefined>(
    (state) => state.examinations.deleteExamination.status
  );
  const status = useSelector<IState, string | undefined>((state) => {
    /*
      Apart from "IDLE" create and update cannot reach "LOADING", "SUCCESS" and "FAIL" 
      status at the same time,
      because we use the same form for creation and modification. 
    */
    return state.examinations.createExamination.status !== "IDLE"
      ? state.examinations.createExamination.status
      : state.examinations.updateExamination.status;
  });

  const errorMessage = useSelector<IState>(
    (state) =>
      state.examinations.createExamination.error?.message ||
      state.examinations.updateExamination.error?.message ||
      state.examinations.deleteExamination.error?.message ||
      t("common.somethingwrong")
  ) as string;

  useEffect(() => {
    if (status === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [status]);

  useEffect(() => {
    dispatch(createExaminationReset());
    dispatch(updateExaminationReset());
    dispatch(deleteExaminationReset());
    setCreationMode(true);
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
    if (triageToEdit.pex_ID) triage.pex_ID = triageToEdit.pex_ID;
    if (!creationMode && triageToEdit.pex_ID) {
      dispatch(updateExamination(triageToEdit.pex_ID, triage));
    } else {
      dispatch(createExamination(triage));
    }
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    dispatch(createExaminationReset());
    dispatch(updateExaminationReset());
    dispatch(deleteExaminationReset());
    setCreationMode(true);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  const onDelete = (code: number | undefined) => {
    setDeletedObjCode(code?.toString() ?? "");
    dispatch(deleteExamination(code));
  };

  const onEdit = (row: any) => {
    row.pex_date = row.date;
    setTriageToEdit(row);
    setCreationMode(false);
    scrollToElement(null);
  };

  return (
    <div className="patientTriage">
      <Permission
        require={creationMode ? "examination.create" : "examination.update"}
      >
        <PatientTriageForm
          fields={
            creationMode
              ? initialFields
              : updateTriageFields(initialFields, triageToEdit)
          }
          creationMode={creationMode}
          onSubmit={onSubmit}
          submitButtonLabel={
            creationMode ? t("common.savetriage") : t("common.update")
          }
          resetButtonLabel={t("common.reset")}
          shouldResetForm={shouldResetForm}
          resetFormCallback={resetFormCallback}
          isLoading={status === "LOADING"}
        />
        {(status === "FAIL" || deleteStatus === "FAIL") && (
          <div ref={infoBoxRef}>
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        <ConfirmationDialog
          isOpen={status === "SUCCESS"}
          title={
            creationMode ? t("examination.created") : t("examination.updated")
          }
          icon={checkIcon}
          info={
            creationMode
              ? t("examination.createsuccess")
              : t("examination.updatesuccess", { code: triageToEdit.pex_ID })
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() =>
            setActivityTransitionState("TO_RESET")
          }
          handleSecondaryButtonClick={() => ({})}
        />
      </Permission>

      <Permission require="examination.read">
        <PatientTriageTable
          handleDelete={onDelete}
          handleEdit={onEdit}
          shouldUpdateTable={shouldUpdateTable}
        />
      </Permission>

      <Permission require="examination.delete">
        <ConfirmationDialog
          isOpen={deleteStatus === "SUCCESS"}
          title={t("opd.deleted")}
          icon={checkIcon}
          info={t("common.deletesuccess", { code: deletedObjCode })}
          primaryButtonLabel={t("common.ok")}
          handlePrimaryButtonClick={() =>
            setActivityTransitionState("TO_RESET")
          }
          handleSecondaryButtonClick={() => {}}
        />
      </Permission>
    </div>
  );
};

export default PatientTriage;
