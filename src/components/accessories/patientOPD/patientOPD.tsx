import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { IState } from "../../../types";
import { initialFields } from "./consts";
import { OpdWithOperationRowDTO } from "../../../generated";
import {
  createOpdReset,
  createOpdWithOperationsRow,
  updateOpdWithOperationRow,
  updateOpdReset,
  deleteOpdReset,
} from "../../../state/opds";
import { getDiseasesOpd } from "../../../state/diseases";
import PatientOPDForm from "./patientOPDForm/PatientOPDForm";
import { TActivityTransitionState } from "./types";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import InfoBox from "../infoBox/InfoBox";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../assets/check-icon.png";
import PatientOPDTable from "./patientOPDTable/PatientOPDTable";
import { updateOpdFields } from "../../../libraries/formDataHandling/functions";
import { PatientExtraData } from "../patientExtraData/patientExtraData";
import { Permission } from "../../../libraries/permissionUtils/Permission";
import { deleteOperationRowReset } from "../../../state/operations";

const PatientOPD: FunctionComponent = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [opdToEdit, setOpdToEdit] = useState({} as OpdWithOperationRowDTO);
  const [creationMode, setCreationMode] = useState(true);
  const changeStatus = useAppSelector((state) => {
    /*
      Apart from "IDLE" create and update cannot reach "LOADING", "SUCCESS" and "FAIL" 
      status at the same time,
      because we use the same form for creation and modification. 
    */
    return state.opds.createOpd.status !== "IDLE"
      ? state.opds.createOpd.status
      : state.opds.updateOpd.status;
  });

  const errorMessage = useAppSelector(
    (state) =>
      state.opds.createOpd.error?.message ||
      state.opds.updateOpd.error?.message ||
      t("common.somethingwrong")
  );

  useEffect(() => {
    if (changeStatus === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [changeStatus]);

  useEffect(() => {
    dispatch(createOpdReset());
    dispatch(updateOpdReset());
    dispatch(getDiseasesOpd());

    return () => {
      dispatch(deleteOpdReset());
    };
  }, [dispatch]);

  const patient = useAppSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const userId = useAppSelector(
    (state: IState) => state.main.authentication.data?.username
  );

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      setShouldUpdateTable(true);
      setCreationMode(true);
      dispatch(createOpdReset());
      dispatch(updateOpdReset());
      setShouldResetForm(true);
    }
  }, [dispatch, activityTransitionState]);

  const onSubmit = (opdValues: OpdWithOperationRowDTO) => {
    setShouldResetForm(false);
    if (opdValues.opdDTO) {
      opdValues.opdDTO.patientCode = patient?.code;
      if (patient) {
        opdValues.opdDTO.age = patient?.age;
        opdValues.opdDTO.sex = patient?.sex;
      }
      opdValues.opdDTO.userID = userId;
      opdValues.opdDTO.patientName =
        patient?.firstName + " " + patient?.secondName;
      const opdToSave = { ...opdToEdit.opdDTO, ...opdValues.opdDTO };
      if (!creationMode && opdToEdit.opdDTO?.code) {
        dispatch(
          updateOpdWithOperationRow({
            code: opdToEdit.opdDTO?.code,
            opdWithOperationRowDTO: {
              opdDTO: opdToSave,
              operationRows: opdValues.operationRows,
            } as OpdWithOperationRowDTO,
          })
        );
      } else {
        dispatch(
          createOpdWithOperationsRow({
            opdDTO: { ...opdToSave, code: 0 },
            operationRows: opdValues.operationRows,
          })
        );
      }
    }
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setCreationMode(true);
    dispatch(createOpdReset());
    dispatch(updateOpdReset());
    dispatch(deleteOperationRowReset());
    setActivityTransitionState("IDLE");
    setShouldUpdateTable(false);
    scrollToElement(null);
  };

  const onEdit = (row: OpdWithOperationRowDTO) => {
    setOpdToEdit(row);
    setCreationMode(false);
    scrollToElement(null);
  };

  return (
    <div className="patientOpd">
      <Permission require={creationMode ? "opds.create" : "opds.update"}>
        <PatientExtraData />
        <PatientOPDForm
          fields={
            creationMode
              ? initialFields
              : updateOpdFields(initialFields, opdToEdit.opdDTO)
          }
          creationMode={creationMode}
          onSubmit={onSubmit}
          submitButtonLabel={
            creationMode ? t("opd.saveopd") : t("opd.updateopd")
          }
          resetButtonLabel={t("common.reset")}
          isLoading={changeStatus === "LOADING"}
          shouldResetForm={shouldResetForm}
          resetFormCallback={resetFormCallback}
          operationRowsToEdit={!creationMode ? opdToEdit.operationRows : []}
        />
        {changeStatus === "FAIL" && (
          <div ref={infoBoxRef}>
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}
        <ConfirmationDialog
          isOpen={changeStatus === "SUCCESS"}
          title={creationMode ? t("opd.created") : t("opd.updated")}
          icon={checkIcon}
          info={
            creationMode
              ? t("opd.createsuccess")
              : t("opd.updatesuccess", { code: opdToEdit.opdDTO?.code })
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() =>
            setActivityTransitionState("TO_RESET")
          }
          handleSecondaryButtonClick={() => ({})}
        />
      </Permission>
      <Permission require="opds.read">
        <PatientOPDTable
          handleEdit={onEdit}
          shouldUpdateTable={shouldUpdateTable}
        />
      </Permission>
    </div>
  );
};

export default PatientOPD;
