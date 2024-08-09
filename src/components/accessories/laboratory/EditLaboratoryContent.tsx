import { Cancel } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FC, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { updateLabFields } from "../../../libraries/formDataHandling/functions";
import { Permission } from "../../../libraries/permissionUtils/Permission";
import { getExams } from "../../../state/exams";
import {
  createLabReset,
  getLabWithRowsByCode,
  getLabWithRowsByCodeReset,
  updateLabReset,
} from "../../../state/laboratories";
import { getPatient } from "../../../state/patients";
import { IState } from "../../../types";
import { initialFields } from "./consts";
import ExamForm from "./examForm/ExamForm";
import "./styles.scss";

export const EditLaboratoryContent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string | undefined }>();
  const navigate = useNavigate();

  const creationMode = useMemo(() => (id ? false : true), [id]);

  const labWithRows = useAppSelector(
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
      dispatch(getPatient(labToEdit.patientCode.toString()));
    }
  }, [labWithRows, dispatch, labToEdit?.patientCode]);

  const handleReset = useCallback(() => {
    dispatch(getLabWithRowsByCodeReset());
    navigate(0);
  }, [dispatch, navigate]);

  const patient = useAppSelector(
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
      <Permission require={creationMode ? "exams.create" : "exams.update"}>
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
