import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import checkIcon from "../../../assets/check-icon.png";
import {
  LaboratoryDTO,
  LaboratoryDTOInOutPatientEnum,
  LaboratoryDTOStatusEnum,
} from "../../../generated";
import {
  parseDate,
  updateLabFields,
} from "../../../libraries/formDataHandling/functions";
import { Permission } from "../../../libraries/permissionUtils/Permission";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { getExamRows, getExams } from "../../../state/exams";
import {
  cancelLab,
  cancelLabReset,
  createLab,
  createLabReset,
  deleteLab,
  deleteLabReset,
  getLabWithRowsByCode,
  getLabWithRowsByCodeReset,
  getMaterials,
  updateLab,
  updateLabReset,
} from "../../../state/laboratories";
import { IState } from "../../../types";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import InfoBox from "../infoBox/InfoBox";
import { initialRequestFields } from "../laboratory/consts";
import ExamRequestForm from "../laboratory/examRequestForm/ExamRequestForm";
import ExamForm from "./ExamForm/ExamForm";
import { initialFields } from "./consts";
import PatientExamRequestsTable from "./patientExamRequestsTable/PatientExamRequestsTable";
import PatientExamsTable from "./patientExamsTable/PatientExamsTable";
import "./styles.scss";
import { TherapyTransitionState } from "./types";

const PatientExams: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [shouldUpdateRequestsTable, setShouldUpdateRequestsTable] =
    useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TherapyTransitionState>("IDLE");

  const [deletedObjCode, setDeletedObjCode] = useState("");
  const [canceledObjCode, setCanceledObjCode] = useState("");

  const [labToEdit, setLabToEdit] = useState({} as LaboratoryDTO);

  const [creationMode, setCreationMode] = useState(true);

  const labWithRows = useAppSelector(
    (state: IState) => state.laboratories.getLabWithRowsByCode.data ?? {}
  );

  const patientData = useAppSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getExams());
    dispatch(createLabReset());
    dispatch(updateLabReset());
    dispatch(deleteLabReset());
    dispatch(cancelLabReset());
    dispatch(getLabWithRowsByCodeReset());
    setCreationMode(true);
  }, [dispatch]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(createLabReset());
      dispatch(updateLabReset());
      dispatch(deleteLabReset());
      dispatch(cancelLabReset());
      dispatch(getLabWithRowsByCodeReset());
      setShouldResetForm(true);
      setShouldUpdateTable(true);
      setShouldUpdateRequestsTable(true);
    }
  }, [dispatch, activityTransitionState]);

  const labStore = useAppSelector((state: IState) => state.laboratories);
  const errorMessage = useAppSelector(
    (state) =>
      state.laboratories.createLab.error?.message ||
      state.laboratories.updateLab.error?.message ||
      state.laboratories.getLabWithRowsByCode.error?.message ||
      state.laboratories.deleteLab.error?.message ||
      t("common.somethingwrong")
  ) as string;
  const exams = useAppSelector((state: IState) => state.exams.examList.data);

  const onSuccess = useCallback(
    (shoudlReset: boolean) => {
      setShouldUpdateRequestsTable(shoudlReset);
    },
    [dispatch]
  );

  const onSubmit = (lab: LaboratoryDTO, rows: string[]) => {
    setShouldResetForm(false);
    lab.patientCode = patientData?.code;
    lab.exam = exams?.find((item) => item.code === lab.exam);
    lab.patName = patientData?.firstName + " " + patientData?.secondName;
    lab.sex = patientData?.sex;
    lab.age = patientData?.age;
    lab.labDate = parseDate(lab.labDate ?? "");
    lab.registrationDate = parseDate(lab.registrationDate ?? "");
    lab.inOutPatient = patientData?.status
      ? patientData.status === "O"
        ? LaboratoryDTOInOutPatientEnum.O
        : LaboratoryDTOInOutPatientEnum.I
      : LaboratoryDTOInOutPatientEnum.O;
    lab.material = "Undefined";
    if (!creationMode && labToEdit.code) {
      lab.code = labToEdit.code;
      lab.lock = labToEdit.lock;
    }
    const labWithRowsDTO = {
      laboratoryDTO: lab,
      laboratoryRowList: rows,
    };

    // Fix status according to results
    lab.status =
      (lab.result && lab.result.length > 0) || rows.length > 0
        ? LaboratoryDTOStatusEnum.Done
        : LaboratoryDTOStatusEnum.Open;

    if (!creationMode && labToEdit.code) {
      dispatch(updateLab({ code: labToEdit.code, labWithRowsDTO }));
    } else {
      dispatch(createLab(labWithRowsDTO));
    }
  };

  const onEdit = (row: LaboratoryDTO) => {
    dispatch(getExamRows(row.exam?.code ?? ""));
    setLabToEdit(row);
    dispatch(getLabWithRowsByCode(row.code));
    setCreationMode(false);
    scrollToElement(null);
  };
  const onDelete = (code: number | undefined) => {
    setDeletedObjCode(`${code}` ?? "");
    dispatch(deleteLab(code));
  };

  const onCancel = (code: number | undefined) => {
    setCanceledObjCode(`${code}` ?? "");
    dispatch(cancelLab(code));
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setCreationMode(true);
    dispatch(createLabReset());
    dispatch(updateLabReset());
    dispatch(deleteLabReset());
    dispatch(getLabWithRowsByCodeReset());
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  return (
    <div className="patientExam">
      <Permission
        require={creationMode ? "laboratories.create" : "laboratories.update"}
      >
        {creationMode && (
          <ExamRequestForm
            fields={initialRequestFields}
            patient={patientData}
            handleSuccess={onSuccess}
          />
        )}
        {labStore.getLabWithRowsByCode.status !== "LOADING" &&
          !creationMode && (
            <ExamForm
              fields={
                creationMode
                  ? initialFields
                  : updateLabFields(initialFields, labToEdit)
              }
              onSubmit={onSubmit}
              creationMode={creationMode}
              labWithRowsToEdit={labWithRows}
              submitButtonLabel={
                creationMode ? t("common.save") : t("common.update")
              }
              resetButtonLabel={t("common.reset")}
              shouldResetForm={shouldResetForm}
              resetFormCallback={resetFormCallback}
              isLoading={
                labStore.createLab.status === "LOADING" ||
                labStore.updateLab.status === "LOADING"
              }
            />
          )}
        <ConfirmationDialog
          isOpen={
            labStore.createLab.status === "SUCCESS" ||
            labStore.updateLab.status === "SUCCESS"
          }
          title={creationMode ? t("lab.created") : t("lab.updated")}
          icon={checkIcon}
          info={
            creationMode
              ? t("lab.createsuccess")
              : t("lab.updatesuccess", { code: labToEdit.code })
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() =>
            setActivityTransitionState("TO_RESET")
          }
          handleSecondaryButtonClick={() => ({})}
        />
      </Permission>
      {labStore.deleteLab.status === "LOADING" && (
        <CircularProgress style={{ marginLeft: "50%", position: "relative" }} />
      )}

      {(labStore.createLab.status === "FAIL" ||
        labStore.updateLab.status === "FAIL" ||
        labStore.getLabWithRowsByCode.status === "FAIL" ||
        labStore.deleteLab.status === "FAIL") && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={errorMessage} />
        </div>
      )}

      <Permission require="laboratories.read">
        <PatientExamRequestsTable
          shouldUpdateTable={shouldUpdateRequestsTable}
          handleCancel={onCancel}
          handleEdit={onEdit}
        />
        <PatientExamsTable
          handleEdit={onEdit}
          handleDelete={onDelete}
          shouldUpdateTable={shouldUpdateTable}
        />
        <ConfirmationDialog
          isOpen={labStore.deleteLab.status === "SUCCESS"}
          title={t("lab.deleted")}
          icon={checkIcon}
          info={t("common.deletesuccess", { code: deletedObjCode })}
          primaryButtonLabel={t("common.ok")}
          handlePrimaryButtonClick={() =>
            setActivityTransitionState("TO_RESET")
          }
          handleSecondaryButtonClick={() => {}}
        />

        <ConfirmationDialog
          isOpen={labStore.cancelLab.status === "SUCCESS"}
          title={t("lab.canceled")}
          icon={checkIcon}
          info={t("lab.cancelsuccess", { code: canceledObjCode })}
          primaryButtonLabel={t("common.ok")}
          handlePrimaryButtonClick={() => {
            setActivityTransitionState("TO_RESET");
            window.location.reload();
          }}
          handleSecondaryButtonClick={() => {}}
        />
      </Permission>
    </div>
  );
};

export default PatientExams;
