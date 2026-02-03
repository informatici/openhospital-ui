import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import checkIcon from "../../../assets/check-icon.png";
import { TherapyRowDTO } from "../../../generated";
import { updateTherapyFields } from "../../../libraries/formDataHandling/functions";
import { Permission } from "../../../libraries/permissionUtils/Permission";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { getMedicals } from "../../../state/medicals";
import {
  createTherapy,
  createTherapyReset,
  deleteTherapy,
  deleteTherapyReset,
  updateTherapy,
  updateTherapyReset,
} from "../../../state/therapies";
import { IState } from "../../../types";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import InfoBox from "../infoBox/InfoBox";
import { initialFields } from "./consts";
import PatientTherapyTable from "./patientTherapyTable/PatientTherapyTable";
import "./styles.scss";
import TherapyForm from "./therapyForm/TherapyForm";

export type TherapyTransitionState = "IDLE" | "TO_RESET";

const PatientTherapy: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState("IDLE");

  const [therapyToEdit, setTherapyToEdit] = useState({} as TherapyRowDTO);

  const [creationMode, setCreationMode] = useState(true);

  const status = useAppSelector((state) => {
    /*
      Apart from "IDLE" create and update cannot reach "LOADING", "SUCCESS" and "FAIL" 
      status at the same time,
      because we use the same form for creation and modification. 
    */
    return state.therapies.createTherapy.status !== "IDLE"
      ? state.therapies.createTherapy.status
      : state.therapies.updateTherapy.status;
  });

  const errorMessage = useAppSelector(
    (state) =>
      state.therapies.createTherapy.error?.message ||
      state.therapies.updateTherapy.error?.message ||
      t("common.somethingwrong")
  ) as string;

  const [deletedObjCode, setDeletedObjCode] = useState("");

  const patientData = useAppSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const deleteStatus = useAppSelector(
    (state) => state.therapies.deleteTherapy.status
  );

  useEffect(() => {
    dispatch(getMedicals());

    return () => {
      dispatch(deleteTherapyReset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (status === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [status]);

  useEffect(() => {
    dispatch(createTherapyReset());
    dispatch(updateTherapyReset());
  }, [dispatch]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      setShouldUpdateTable(true);
      setCreationMode(true);
      dispatch(createTherapyReset());
      dispatch(updateTherapyReset());
      setShouldResetForm(true);
    }
  }, [dispatch, activityTransitionState]);

  const onSubmit = (valuesToSave: TherapyRowDTO) => {
    setShouldResetForm(false);
    valuesToSave.therapyID = therapyToEdit.therapyID;
    valuesToSave.patID = patientData as any;
    if (!creationMode && therapyToEdit.therapyID) {
      dispatch(updateTherapy(valuesToSave));
    } else dispatch(createTherapy(valuesToSave));
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    dispatch(deleteTherapyReset());
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

  const onDelete = (code: number | undefined) => {
    setDeletedObjCode(code?.toString() ?? "");
    dispatch(deleteTherapy(code));
  };

  return (
    <div className="patientTherapy">
      <Permission
        require={creationMode ? "therapies.create" : "therapies.update"}
      >
        <TherapyForm
          fields={
            creationMode
              ? initialFields
              : updateTherapyFields(initialFields, therapyToEdit)
          }
          onSubmit={onSubmit}
          creationMode={creationMode}
          submitButtonLabel={
            creationMode ? t("therapy.savetherapy") : t("therapy.updatetherapy")
          }
          resetButtonLabel={t("common.reset")}
          shouldResetForm={shouldResetForm}
          resetFormCallback={resetFormCallback}
          isLoading={status === "LOADING"}
        />
        {status === "FAIL" && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}

        <ConfirmationDialog
          isOpen={status === "SUCCESS"}
          title={creationMode ? t("therapy.created") : t("therapy.updated")}
          icon={checkIcon}
          info={
            creationMode
              ? t("therapy.createsuccess")
              : t("therapy.updatesuccess", { code: therapyToEdit.therapyID })
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() =>
            setActivityTransitionState("TO_RESET")
          }
          handleSecondaryButtonClick={() => ({})}
        />
      </Permission>
      <Permission require="therapies.read">
        <PatientTherapyTable
          handleDelete={onDelete}
          handleEdit={onEdit}
          shouldUpdateTable={shouldUpdateTable}
        />
      </Permission>
      <Permission require="therapies.delete">
        <ConfirmationDialog
          isOpen={deleteStatus === "SUCCESS"}
          title={t("common.delete")}
          icon={checkIcon}
          info={t("common.deletesuccess", { code: deletedObjCode })}
          primaryButtonLabel={t("common.ok")}
          handlePrimaryButtonClick={() =>
            setActivityTransitionState("TO_RESET")
          }
          handleSecondaryButtonClick={() => {}}
        />
      </Permission>
    </div>
  );
};
export default PatientTherapy;
