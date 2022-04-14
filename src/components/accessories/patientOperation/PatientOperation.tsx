import React, { FC, useEffect, useRef, useState } from "react";
import OperationRowForm from "./operationForm/OperationRowForm";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import { OperationRowTransitionState } from "./types";
import { AdmissionDTO, OperationRowDTO } from "../../../generated";
import InfoBox from "../infoBox/InfoBox";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../assets/check-icon.png";
import {
  createOperationRow,
  createOperationRowReset,
  getOperations,
  getOperationsByAdmissionId,
  updateOperationRow,
  updateOperationRowReset,
} from "../../../state/operations/actions";
import PatientOperationTable from "./operationTable/OperationRowTable";
import { getCurrentAdmissionByPatientId } from "../../../state/admissions/actions";
import { updateOperationRowFields } from "../../../libraries/formDataHandling/functions";
import { initialFields } from "./consts";

const PatientOperation: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<OperationRowTransitionState>("IDLE");

  const [opRowToEdit, setOpRowToEdit] = useState({} as OperationRowDTO);

  const [creationMode, setCreationMode] = useState(true);

  const changeStatus = useSelector<IState, string | undefined>((state) => {
    /*
      Apart from "IDLE" create and update cannot reach "LOADING", "SUCCESS" and "FAIL" 
      status at the same time,
      because we use the same form for creation and modification. 
    */
    return state.operations.createOperationRow.status !== "IDLE"
      ? state.operations.createOperationRow.status
      : state.operations.updateOperationRow.status;
  });

  const currentAdmission = useSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.data
  );

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const operations = useSelector(
    (state: IState) => state.operations.operationList.data
  );

  const username = useSelector(
    (state: IState) => state.main.authentication.data?.displayName
  );

  useEffect(() => {
    dispatch(createOperationRowReset());
    dispatch(updateOperationRowReset());
    dispatch(getOperationsByAdmissionId(currentAdmission?.id ?? -1));
    dispatch(getOperations());
  }, [dispatch, currentAdmission]);

  const onSubmit = (values: OperationRowDTO) => {
    setShouldResetForm(false);
    const opRow: OperationRowDTO = {
      ...opRowToEdit,
      ...values,
    };
    if (creationMode) {
      opRow.prescriber = username;
      opRow.admission = currentAdmission;
    }
    if (!creationMode && opRowToEdit.id) {
      dispatch(updateOperationRow(opRow));
    } else dispatch(createOperationRow(opRow));
  };

  useEffect(() => {
    if (changeStatus === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
      setShouldResetForm(false);
    }
  }, [changeStatus]);

  useEffect(() => {
    dispatch(createOperationRowReset());
  }, [dispatch]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      setShouldUpdateTable(true);
      setCreationMode(true);
      dispatch(createOperationRowReset());
      dispatch(updateOperationRowReset());
      setShouldResetForm(true);
    }
  }, [dispatch, activityTransitionState]);

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  useEffect(() => {
    dispatch(getCurrentAdmissionByPatientId(patient?.code));
  }, [patient, dispatch]);

  const onEdit = (row: OperationRowDTO) => {
    setOpRowToEdit(row);
    setCreationMode(false);
    scrollToElement(null);
  };

  return (
    <div className="patientAdmission">
      <OperationRowForm
        fields={
          creationMode
            ? initialFields
            : updateOperationRowFields(initialFields, opRowToEdit)
        }
        onSubmit={onSubmit}
        submitButtonLabel={creationMode ? t("common.save") : t("common.update")}
        resetButtonLabel={t("common.reset")}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
        isLoading={changeStatus === "LOADING"}
      />
      {changeStatus === "FAIL" && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}

      <PatientOperationTable
        onEdit={onEdit}
        shouldUpdateTable={shouldUpdateTable}
      />

      <ConfirmationDialog
        isOpen={changeStatus === "SUCCESS"}
        title={
          creationMode ? t("operation.rowcreated") : t("operation.rowupdated")
        }
        icon={checkIcon}
        info={
          creationMode
            ? t("operation.rowcreatesuccess")
            : t("operation.rowupdatesuccess", { code: opRowToEdit.id })
        }
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
    </div>
  );
};

export default PatientOperation;
