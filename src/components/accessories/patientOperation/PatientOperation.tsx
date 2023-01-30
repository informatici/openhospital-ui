import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import OperationRowForm from "./operationForm/OperationRowForm";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import { OperationRowTransitionState } from "./types";
import { OpdDTO, OperationRowDTO, VisitDTO } from "../../../generated";
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
import { isEmpty } from "lodash";
import { opRowFields } from "./opRowFields";

import { Permission } from "../../../libraries/permissionUtils/Permission";

interface IOwnProps {
  opd?: OpdDTO;
  onSuccess?: () => void;
}

const PatientOperation: FC<IOwnProps> = ({ opd, onSuccess }) => {
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
    return state.operations.createOperationRow.status !== "IDLE"
      ? state.operations.createOperationRow.status
      : state.operations.updateOperationRow.status;
  });

  const errorMessage = useSelector<IState, string | undefined>((state) => {
    return state.operations.createOperationRow.status !== "IDLE"
      ? state.operations.createOperationRow.error?.message
      : state.operations.updateOperationRow.error?.message;
  });

  const currentAdmission = useSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.data
  );

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const username = useSelector(
    (state: IState) => state.main.authentication.data?.username
  );

  useEffect(() => {
    dispatch(createOperationRowReset());
    dispatch(updateOperationRowReset());
    dispatch(getOperationsByAdmissionId(currentAdmission?.id ?? -1));
    dispatch(getOperations());
  }, [dispatch, currentAdmission]);

  const onSubmit = (values: OperationRowDTO) => {
    setShouldResetForm(false);
    let opRow: OperationRowDTO = values;
    if (creationMode) {
      opRow.prescriber = username;
      if (!isEmpty(opd)) {
        opRow.opd = opd;
      } else opRow.admission = currentAdmission;
      dispatch(createOperationRow(opRow));
    } else {
      opRow = { ...opRowToEdit, ...opRow };
      dispatch(updateOperationRow(opRow));
    }
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
      if (onSuccess) onSuccess();
      setShouldUpdateTable(true);
      setCreationMode(true);
      dispatch(createOperationRowReset());
      dispatch(updateOperationRowReset());
      setShouldResetForm(true);
    }
  }, [dispatch, onSuccess, activityTransitionState]);

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setCreationMode(true);
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

  const fields = useMemo(() => {
    return opRowFields(creationMode ? { opDate: opd?.date } : opRowToEdit);
  }, [creationMode]);

  return (
    <div className="patientOperation">
      <Permission
        require={creationMode ? "operation.create" : "operation.update"}
      >
        <OperationRowForm
          fields={fields}
          onSubmit={onSubmit}
          creationMode={creationMode}
          submitButtonLabel={
            creationMode ? t("common.save") : t("common.update")
          }
          resetButtonLabel={t("common.reset")}
          shouldResetForm={shouldResetForm}
          resetFormCallback={resetFormCallback}
          isLoading={changeStatus === "LOADING"}
        />
        {changeStatus === "FAIL" && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox
              type="error"
              message={errorMessage ?? t("common.somethingwrong")}
            />
          </div>
        )}
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
          handlePrimaryButtonClick={() =>
            setActivityTransitionState("TO_RESET")
          }
          handleSecondaryButtonClick={() => ({})}
        />
      </Permission>

      <Permission require="operation.read">
        {!opd && (
          <PatientOperationTable
            onEdit={onEdit}
            shouldUpdateTable={shouldUpdateTable}
          />
        )}
      </Permission>
    </div>
  );
};

export default PatientOperation;
