import { downloadBlob } from "libraries/downloadUtils/downloadUtils";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { FC, default as React, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import checkIcon from "../../../assets/check-icon.png";
import { PatientExaminationDTO } from "../../../generated";
import { updateTriageFields } from "../../../libraries/formDataHandling/functions";
import { Permission } from "../../../libraries/permissionUtils/Permission";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  createExamination,
  createExaminationReset,
  deleteExamination,
  deleteExaminationReset,
  getDefaultPatientExamination,
  getLastByPatientId,
  printExamination,
  printExaminationReset,
  updateExamination,
  updateExaminationReset,
} from "../../../state/examinations";
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
  const dispatch = useAppDispatch();

  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

  const [deletedObjCode, setDeletedObjCode] = useState("");

  const [triageToEdit, setTriageToEdit] = useState({} as PatientExaminationDTO);

  const [creationMode, setCreationMode] = useState(true);

  const [isPrinting, setPrinting] = useState(false);

  //const [triage, setTriage] = useState({} as PatientExaminationDTO | undefined);

  const lastExamination = useAppSelector(
    (state) => state.examinations.getLastByPatientId.data
  );

  const patientDataCode = useAppSelector(
    (state: IState) => state.patients.selectedPatient.data?.code
  );

  const deleteStatus = useAppSelector(
    (state) => state.examinations.deleteExamination.status
  );
  const status = useAppSelector((state) => {
    /*
      Apart from "IDLE" create and update cannot reach "LOADING", "SUCCESS" and "FAIL" 
      status at the same time,
      because we use the same form for creation and modification. 
    */
    return state.examinations.createExamination.status !== "IDLE"
      ? state.examinations.createExamination.status
      : state.examinations.updateExamination.status;
  });

  const errorMessage = useAppSelector(
    (state) =>
      state.examinations.createExamination.error?.message ||
      state.examinations.updateExamination.error?.message ||
      state.examinations.deleteExamination.error?.message ||
      state.examinations.printExamination.error?.message ||
      t("common.somethingwrong")
  ) as string;

  useEffect(() => {
    if (status === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
    if (status === "SUCCESS" && patientDataCode) {
      dispatch(getLastByPatientId(patientDataCode));
    }
  }, [dispatch, patientDataCode, status]);

  useEffect(() => {
    if (deleteStatus === "SUCCESS" && patientDataCode) {
      dispatch(getLastByPatientId(patientDataCode));
    }
  }, [deleteStatus, dispatch, patientDataCode]);

  useEffect(() => {
    if (deleteStatus === "SUCCESS" && patientDataCode) {
      dispatch(getLastByPatientId(patientDataCode));
    }
  }, [deleteStatus, dispatch, patientDataCode]);

  useEffect(() => {
    dispatch(createExaminationReset());
    dispatch(updateExaminationReset());
    dispatch(deleteExaminationReset());
    dispatch(printExaminationReset());
    setCreationMode(true);
  }, [dispatch]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(createExaminationReset());
      dispatch(updateExaminationReset());
      dispatch(deleteExaminationReset());
      dispatch(printExaminationReset());
      setShouldResetForm(true);
      setShouldUpdateTable(true);
    }
  }, [dispatch, activityTransitionState]);

  useEffect(() => {
    if (patientDataCode) {
      dispatch(getLastByPatientId(patientDataCode));
      dispatch(getDefaultPatientExamination(patientDataCode));
    }
  }, [dispatch, patientDataCode]);

  useEffect(() => {
    if (isPrinting) {
      dispatch(printExamination(triageToEdit?.pex_ID))
        .unwrap()
        .then((result) => {
          if (result instanceof Blob) {
            downloadBlob(
              result,
              `patient-examination-${
                triageToEdit?.pex_ID
              }-${new Date().getTime()}.pdf`
            );
          }
        })
        .catch((error) => {})
        .finally(() => setPrinting(false));
    }
    setActivityTransitionState("TO_RESET");
  }, [dispatch, isPrinting, triageToEdit?.pex_ID]);

  const onSubmit = (triage: PatientExaminationDTO) => {
    setShouldResetForm(false);
    triage.patientCode = patientDataCode ?? -1;
    if (triageToEdit.pex_ID) triage.pex_ID = triageToEdit.pex_ID;
    if (!creationMode && triageToEdit.pex_ID) {
      triage.lock = triageToEdit.lock;
      dispatch(
        updateExamination({
          id: triageToEdit.pex_ID,
          patientExaminationDTO: triage,
        })
      )
        .unwrap()
        .then((result) => {
          if (!result) return;
          setTriageToEdit(result);
        });
    } else {
      dispatch(createExamination(triage))
        .unwrap()
        .then((result) => {
          if (!result) return;
          setTriageToEdit(result);
        });
    }
  };

  const handlePrint = () => {
    setPrinting(true);
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
    if (code) {
      setDeletedObjCode(code.toString());
      dispatch(deleteExamination(code));
    }
  };

  const onEdit = (row: PatientExaminationDTO) => {
    setTriageToEdit(row);
    setCreationMode(false);
    scrollToElement(null);
  };

  const printExaminationStatus = useAppSelector(
    (state) => state.examinations.printExamination.status
  );

  const printExaminationErrorMessage = useAppSelector(
    (state) =>
      state.examinations.printExamination.error?.message ||
      t("common.failedtodownloadthereport")
  ) as string;

  const onPrint = (row: any) => {
    dispatch(printExamination(row.pex_ID))
      .unwrap()
      .then((result) => {
        if (result instanceof Blob)
          downloadBlob(result, `patient-examexamination-${new Date()}.pdf`);
      });
  };
  return (
    <div className="patientTriage">
      <Permission
        require={creationMode ? "examinations.create" : "examinations.update"}
      >
        <PatientTriageForm
          fields={
            creationMode
              ? {
                  ...initialFields,
                  pex_height: {
                    ...initialFields.pex_height,
                    value: lastExamination?.pex_height?.toString() ?? "",
                  },
                  pex_weight: {
                    ...initialFields.pex_weight,
                    value: lastExamination?.pex_weight?.toString() ?? "",
                  },
                }
              : updateTriageFields(initialFields, {
                  ...triageToEdit,
                  pex_height:
                    triageToEdit.pex_height ?? lastExamination?.pex_height,
                  pex_weight:
                    triageToEdit.pex_weight ?? lastExamination?.pex_weight,
                })
          }
          creationMode={creationMode}
          onSubmit={onSubmit}
          submitButtonLabel={
            creationMode ? t("common.savetriage") : t("common.update")
          }
          resetButtonLabel={t("common.reset")}
          printButtonLabel={
            creationMode ? t("common.saveandprint") : t("common.updateandprint")
          }
          saveAndPrint={handlePrint}
          shouldResetForm={shouldResetForm}
          resetFormCallback={resetFormCallback}
          isLoading={status === "LOADING"}
        />
        {(status === "FAIL" || deleteStatus === "FAIL") && (
          <div ref={infoBoxRef}>
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        {printExaminationStatus === "FAIL" && (
          <div ref={infoBoxRef}>
            <InfoBox type="error" message={printExaminationErrorMessage} />
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
          handlePrimaryButtonClick={handlePrint}
          handleSecondaryButtonClick={() => ({})}
        />
      </Permission>

      <Permission require="examinations.read">
        <PatientTriageTable
          handleDelete={onDelete}
          handleEdit={onEdit}
          shouldUpdateTable={shouldUpdateTable}
          handlePrint={onPrint}
        />
      </Permission>

      <Permission require="examinations.delete">
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
