import React, { FC, useEffect, useRef, useState } from "react";
import PatientTherapyTable from "./patientTherapyTable/PatientTherapyTable";
import TherapyForm from "./therapyForm/TherapyForm";
import "./styles.scss";
import {
  createTherapy,
  getTherapiesByPatientId,
  createTherapyReset,
  updateTherapyReset,
  updateTherapy,
} from "../../../state/therapies/actions";
import { getMedicals } from "../../../state/medicals/actions";
import { initialFields } from "./consts";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { TherapyRowDTO } from "../../../generated";
import { connect, useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import InfoBox from "../infoBox/InfoBox";
import checkIcon from "../../../assets/check-icon.png";
import {
  updateFields,
  updateTherapyFields,
} from "../../../libraries/formDataHandling/functions";

const PatientTherapy: FC = ({}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState("IDLE");

  const [therapyToEdit, setTherapyToEdit] = useState({} as TherapyRowDTO);

  const [creationMode, setCreationMode] = useState(true);

  const updateStatus = useSelector<IState, string | undefined>(
    (state) => state.therapies.updateTherapy.status
  );

  const createStatus = useSelector<IState, string | undefined>(
    (state: IState) => state.therapies.createTherapy.status
  );

  const patientData = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  useEffect(() => {
    if (createStatus === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [createStatus]);

  useEffect(() => {
    dispatch(createTherapyReset());
    dispatch(updateTherapyReset());
    dispatch(getMedicals());
  }, [dispatch, getMedicals]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      setShouldUpdateTable(true);
      setCreationMode(true);
      dispatch(createTherapyReset());
      dispatch(updateTherapyReset());
      setShouldResetForm(true);
    }
  }, [
    dispatch,
    activityTransitionState,
    createTherapyReset,
    updateTherapyReset,
  ]);

  useEffect(() => {
    dispatch(getTherapiesByPatientId(patientData?.code));
  }, [dispatch, patientData, getTherapiesByPatientId]);

  const onSubmit = (valuesToSave: TherapyRowDTO) => {
    setShouldResetForm(false);
    valuesToSave.therapyID = therapyToEdit.therapyID;
    valuesToSave.patID = patientData;
    if (!creationMode && therapyToEdit.therapyID) {
      dispatch(updateTherapy(valuesToSave));
    } else dispatch(createTherapy(valuesToSave));
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setCreationMode(true);
    dispatch(createTherapyReset());
    dispatch(updateTherapyReset());
    setActivityTransitionState("IDLE");
    setShouldUpdateTable(false);
    scrollToElement(null);
  };

  const onEdit = (row: TherapyRowDTO) => {
    setTherapyToEdit(row);
    setCreationMode(false);
    scrollToElement(null);
  };

  return (
    <div className="patientTherapy">
      <TherapyForm
        fields={
          creationMode
            ? initialFields
            : updateFields(initialFields, therapyToEdit)
        }
        onSubmit={onSubmit}
        submitButtonLabel={
          creationMode ? t("therapy.savetherapy") : t("therapy.updatetherapy")
        }
        resetButtonLabel={t("common.discard")}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
        isLoading={createStatus === "LOADING" || updateStatus === "LOADING"}
      />
      {(createStatus === "FAIL" || updateStatus === "FAIL") && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}

      <ConfirmationDialog
        isOpen={createStatus === "SUCCESS"}
        title={t("therapy.created")}
        icon={checkIcon}
        info={t("therapy.createsuccess")}
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
      <ConfirmationDialog
        isOpen={updateStatus === "SUCCESS"}
        title={t("therapy.updated")}
        icon={checkIcon}
        info={t("therapy.updatesuccess", { code: therapyToEdit.therapyID })}
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
      <PatientTherapyTable
        handleEdit={onEdit}
        shouldUpdateTable={shouldUpdateTable}
      />
    </div>
  );
};
export default PatientTherapy;
