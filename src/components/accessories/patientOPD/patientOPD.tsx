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

const PatientOPD: FunctionComponent = ({}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);

  const [opdToEdit, setOpdToEdit] = useState({} as OpdDTO);

  const [creationMode, setCreationMode] = useState(true);

  const updateStatus = useSelector<IState, string | undefined>(
    (state) => state.opds.updateOpd.status
  );

  const createStatus = useSelector<IState, string | undefined>(
    (state) => state.opds.createOpd.status
  );

  useEffect(() => {
    if (createStatus === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [createStatus]);

  useEffect(() => {
    dispatch(createOpdReset());
    dispatch(updateOpdReset());
    dispatch(getDiseasesOpd());
  }, [dispatch, getDiseasesOpd]);

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const userId = useSelector(
    (state: IState) => state.main.authentication.data?.displayName
  );

  const diseasesData = useSelector(
    (state: IState) => state.diseases.diseasesOpd.data
  );

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      setShouldUpdateTable(true);
      setCreationMode(true);
      dispatch(createOpdReset());
      dispatch(updateOpdReset());
      setShouldResetForm(true);
    }
  }, [dispatch, activityTransitionState, createOpdReset, updateOpdReset]);

  const onSubmit = (opdValuestoSave: OpdDTO) => {
    setShouldResetForm(false);
    opdValuestoSave.patientCode = patient?.code;
    opdValuestoSave.age = patient?.age;
    opdValuestoSave.sex = patient?.sex;
    opdValuestoSave.userID = userId;
    if (!creationMode && opdToEdit.code) {
      dispatch(updateOpd(opdToEdit.code, opdValuestoSave, diseasesData));
    } else dispatch(createOpd(opdValuestoSave, diseasesData));
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

  return (
    <div className="patientOpd">
      <PatientOPDForm
        fields={
          creationMode
            ? initialFields
            : updateOpdFields(initialFields, opdToEdit)
        }
        onSubmit={onSubmit}
        submitButtonLabel={creationMode ? t("opd.saveopd") : t("opd.updateopd")}
        resetButtonLabel={t("common.discard")}
        isLoading={createStatus === "LOADING" || updateStatus === "LOADING"}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
      />

      {(createStatus === "FAIL" || updateStatus === "FAIL") && (
        <div ref={infoBoxRef}>
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}

      <ConfirmationDialog
        isOpen={createStatus === "SUCCESS" || updateStatus === "SUCCESS"}
        title={creationMode ? t("opd.created") : t("opd.updated")}
        icon={checkIcon}
        info={
          creationMode
            ? t("opd.createsuccess")
            : t("opd.updatesuccess", { code: opdToEdit.code })
        }
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
      <PatientOPDTable
        handleEdit={onEdit}
        shouldUpdateTable={shouldUpdateTable}
      />
    </div>
  );
};

export default PatientOPD;
