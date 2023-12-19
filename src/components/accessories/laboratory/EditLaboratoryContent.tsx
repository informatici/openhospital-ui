import { Button } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import React, { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { IState } from "../../../types";
import { initialFields } from "./consts";
import "./styles.scss";
import { useEffect } from "react";
import { updateLabFields } from "../../../libraries/formDataHandling/functions";
import {
  createLabReset,
  getLabWithRowsByCode,
  getLabWithRowsByCodeReset,
  updateLabReset,
} from "../../../state/laboratories/actions";
import { getExams } from "../../../state/exams/actions";
import ExamForm from "./examForm/ExamForm";
import { getPatientThunk } from "../../../state/patients/actions";
import { Permission } from "../../../libraries/permissionUtils/Permission";

export const EditLaboratoryContent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string | undefined }>();
  const navigate = useNavigate();

  const creationMode = useMemo(() => (id ? false : true), [id]);

  const labWithRows = useSelector(
    (state: IState) => state.laboratories.getLabWithRowsByCode.data
  );

  const labToEdit = labWithRows?.laboratoryDTO;

  useEffect(() => {
    if (id) {
      dispatch(getLabWithRowsByCode(parseInt(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (labToEdit?.patientCode) {
      dispatch(getPatientThunk(labToEdit.patientCode.toString()));
    }
  }, [labWithRows, dispatch, labToEdit?.patientCode]);

  const handleReset = useCallback(() => {
    dispatch(getLabWithRowsByCodeReset());
    navigate(0);
  }, [dispatch, navigate]);

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const open = useMemo(() => {
    return creationMode
      ? true
      : labWithRows?.laboratoryDTO?.code !== undefined &&
          patient?.code !== undefined;
  }, [creationMode, labWithRows, patient]);

  const formFields = useMemo(() => {
    return creationMode
      ? initialFields
      : updateLabFields(initialFields, labToEdit ?? {});
  }, [creationMode, labToEdit]);

  useEffect(() => {
    dispatch(getExams());
  }, [dispatch]);

  const handleBack = useCallback(() => {
    if (creationMode) {
      dispatch(createLabReset());
    } else {
      dispatch(updateLabReset());
    }
    navigate(-1);
  }, [navigate, dispatch, creationMode]);

  return (
    <>
      <div className="lab__header">
        <div className="lab__title">{t("nav.laboratory")}</div>
        <div className="lab__actions">
          <Button
            onClick={handleBack}
            type="button"
            variant="contained"
            color="primary"
          >
            <Cancel fontSize="small" />
            {t("common.discard")}
          </Button>
        </div>
      </div>
      <Permission require={creationMode ? "exam.create" : "exam.update"}>
        {open && (
          <ExamForm
            fields={formFields}
            handleReset={handleReset}
            creationMode={creationMode}
            labWithRowsToEdit={labWithRows ?? {}}
          />
        )}
      </Permission>
    </>
  );
};
