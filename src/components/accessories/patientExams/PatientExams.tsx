import React, { FC, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { TherapyTransitionState } from "./types";
import { initialFields } from "./consts";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { IState } from "../../../types";
import ExamForm from "./ExamForm/ExamForm";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import PatientExamsTable from "./patientExamsTable/PatientExamsTable";

import checkIcon from "../../../assets/check-icon.png";
import {
  createLab,
  createLabReset,
  deleteLab,
  deleteLabReset,
  getMaterials,
  updateLab,
  updateLabReset,
} from "../../../state/laboratories/actions";
import { LaboratoryDTO } from "../../../generated";
import { ILaboratoriesState } from "../../../state/laboratories/types";
import InfoBox from "../infoBox/InfoBox";
import { getExamRows, getExams } from "../../../state/exams/actions";
import { updateLabFields } from "../../../libraries/formDataHandling/functions";
import { CircularProgress } from "@material-ui/core";

const PatientExams: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TherapyTransitionState>("IDLE");

  const [deletedObjCode, setDeletedObjCode] = useState("");

  const [labToEdit, setLabToEdit] = useState({} as LaboratoryDTO);

  const [creationMode, setCreationMode] = useState(true);

  const patientData = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getExams());
    dispatch(createLabReset());
    dispatch(updateLabReset());
    dispatch(deleteLabReset());
    setCreationMode(true);
  }, [dispatch]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(createLabReset());
      dispatch(updateLabReset());
      dispatch(deleteLabReset());
      setShouldResetForm(true);
      setShouldUpdateTable(true);
    }
  }, [dispatch, activityTransitionState]);

  const labStore = useSelector<IState, ILaboratoriesState>(
    (state: IState) => state.laboratories
  );
  const exams = useSelector((state: IState) => state.exams.examList.data);
  const onSubmit = (lab: LaboratoryDTO, rows: string[]) => {
    setShouldResetForm(false);
    lab.patientCode = patientData?.code;
    lab.exam = exams?.find((item) => item.code === lab.exam);
    lab.patName = patientData?.firstName + " " + patientData?.secondName;
    lab.sex = patientData?.sex;
    lab.age = patientData?.age;
    lab.examDate = lab.date;
    lab.inOutPatient = "R";
    if (labToEdit.code) lab.code = labToEdit.code;
    const labWithRowsDTO = {
      laboratoryDTO: lab,
      laboratoryRowList: rows,
    };
    if (!creationMode && labToEdit.code) {
      dispatch(updateLab(labToEdit.code, labWithRowsDTO));
    } else {
      dispatch(createLab(labWithRowsDTO));
    }
  };

  const onEdit = (row: LaboratoryDTO) => {
    dispatch(getExamRows(row.exam?.code ?? ""));
    setLabToEdit(row);
    setCreationMode(false);
    scrollToElement(null);
  };

  const onDelete = (code: number | undefined) => {
    setDeletedObjCode(`${code}` ?? "");
    dispatch(deleteLab(code));
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setCreationMode(true);
    dispatch(createLabReset());
    dispatch(updateLabReset());
    dispatch(deleteLabReset());
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  return (
    <div className="patientExam">
      <ExamForm
        fields={
          creationMode
            ? initialFields
            : updateLabFields(initialFields, labToEdit)
        }
        onSubmit={onSubmit}
        submitButtonLabel={creationMode ? t("common.save") : t("common.update")}
        resetButtonLabel={t("common.discard")}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
        isLoading={
          labStore.createLab.status === "LOADING" ||
          labStore.updateLab.status === "LOADING"
        }
      />
      {labStore.deleteLab.status === "LOADING" && (
        <CircularProgress style={{ marginLeft: "50%", position: "relative" }} />
      )}

      {(labStore.createLab.status === "FAIL" ||
        labStore.updateLab.status === "FAIL" ||
        labStore.deleteLab.status === "FAIL") && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}

      <PatientExamsTable
        handleEdit={onEdit}
        handleDelete={onDelete}
        shouldUpdateTable={shouldUpdateTable}
      />

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
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />

      <ConfirmationDialog
        isOpen={labStore.deleteLab.status === "SUCCESS"}
        title={t("lab.deleted")}
        icon={checkIcon}
        info={t("common.deletesuccess", { code: deletedObjCode })}
        primaryButtonLabel="OK"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => {}}
      />
    </div>
  );
};

export default PatientExams;
