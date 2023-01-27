import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import { initialFields } from "./consts";
import { OpdDTO } from "../../../generated";
import {
  createOpd,
  createOpdReset,
  updateOpd,
  updateOpdReset,
} from "../../../state/opds/actions";
import { getDiseasesOpd } from "../../../state/diseases/actions";
import PatientOPDForm from "./patientOPDForm/PatientOPDForm";
import { TActivityTransitionState } from "./types";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import InfoBox from "../infoBox/InfoBox";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../assets/check-icon.png";
import PatientOPDTable from "./patientOPDTable/PatientOPDTable";
import { updateOpdFields } from "../../../libraries/formDataHandling/functions";
import PatientOperation from "../patientOperation/PatientOperation";
import { CustomDialog } from "../customDialog/CustomDialog";
import { PatientExtraData } from "../patientExtraData/patientExtraData";
import { Permission } from "../../../libraries/permissionUtils/Permission";

const PatientOPD: FunctionComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);

  const [opdToEdit, setOpdToEdit] = useState({} as OpdDTO);

  const [selectedOpd, setSelectedOpd] = useState({} as OpdDTO);

  const [showModal, setShowModal] = useState(false);

  const [creationMode, setCreationMode] = useState(true);

  const changeStatus = useSelector<IState, string | undefined>((state) => {
    /*
      Apart from "IDLE" create and update cannot reach "LOADING", "SUCCESS" and "FAIL" 
      status at the same time,
      because we use the same form for creation and modification. 
    */
    return state.opds.createOpd.status !== "IDLE"
      ? state.opds.createOpd.status
      : state.opds.updateOpd.status;
  });

  const errorMessage = useSelector<IState, string>(
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
  }, [dispatch]);

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const userId = useSelector(
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

  const onSubmit = (opdValuestoSave: OpdDTO) => {
    setShouldResetForm(false);
    opdValuestoSave.patientCode = patient?.code;
    opdValuestoSave.age = patient?.age;
    opdValuestoSave.sex = patient?.sex;
    opdValuestoSave.userID = userId;
    opdValuestoSave = { ...opdToEdit, ...opdValuestoSave };
    if (!creationMode && opdToEdit.code) {
      dispatch(updateOpd(opdToEdit.code, opdValuestoSave));
    } else dispatch(createOpd({ ...opdValuestoSave, code: 0 }));
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setCreationMode(true);
    dispatch(createOpdReset());
    dispatch(updateOpdReset());
    setActivityTransitionState("IDLE");
    setShouldUpdateTable(false);
    scrollToElement(null);
  };

  const onEdit = (row: OpdDTO) => {
    setOpdToEdit(row);
    setCreationMode(false);
    scrollToElement(null);
  };

  const onOperationCreated = () => {
    setSelectedOpd({} as OpdDTO);
    setShowModal(false);
  };

  const onAddOperation = (value: OpdDTO) => {
    setSelectedOpd(value);
    setShowModal(true);
  };

  return (
    <div className="patientOpd">
      <Permission require={creationMode ? "opd.create" : "opd.update"}>
        <PatientExtraData />
        <PatientOPDForm
          fields={
            creationMode
              ? initialFields
              : updateOpdFields(initialFields, opdToEdit)
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
              : t("opd.updatesuccess", { code: opdToEdit.code })
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() =>
            setActivityTransitionState("TO_RESET")
          }
          handleSecondaryButtonClick={() => ({})}
        />
      </Permission>
      <Permission require="opd.read">
        <PatientOPDTable
          handleEdit={onEdit}
          handleAddOperation={onAddOperation}
          shouldUpdateTable={shouldUpdateTable}
        />
      </Permission>
      <Permission require="operation.create">
        <CustomDialog
          title={t("opd.addoperation")}
          description={t("opd.addoperationdesc")}
          open={showModal}
          onClose={onOperationCreated}
          content={<PatientOperation opd={selectedOpd} />}
        />
      </Permission>
    </div>
  );
};

export default PatientOPD;
