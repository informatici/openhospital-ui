import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import PatientTherapyTable from "./patientTherapyTable/PatientTherapyTable";
import TherapyForm from "./therapyForm/TherapyForm";
import "./styles.scss";
import {
  createTherapy,
  createTherapyReset,
  deleteTherapyReset,
  deleteTherapy,
  updateTherapyReset,
  updateTherapy,
} from "../../../state/therapies/actions";
import { getMedicals } from "../../../state/medicals/actions";
import { initialFields } from "./consts";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { TherapyRowDTO } from "../../../generated";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import InfoBox from "../infoBox/InfoBox";
import checkIcon from "../../../assets/check-icon.png";
import { updateTherapyFields } from "../../../libraries/formDataHandling/functions";
import { usePermission } from "../../../libraries/permissionUtils/usePermission";

export type TherapyTransitionState = "IDLE" | "TO_RESET";

const PatientTherapy: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const canCreate = usePermission("opd.create");
  const canUpdate = usePermission("opd.update");
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState("IDLE");

  const [therapyToEdit, setTherapyToEdit] = useState({} as TherapyRowDTO);

  const [creationMode, setCreationMode] = useState(true);

  const status = useSelector<IState, string | undefined>((state) => {
    /*
      Apart from "IDLE" create and update cannot reach "LOADING", "SUCCESS" and "FAIL" 
      status at the same time,
      because we use the same form for creation and modification. 
    */
    return state.therapies.createTherapy.status !== "IDLE"
      ? state.therapies.createTherapy.status
      : state.therapies.updateTherapy.status;
  });

  const errorMessage = useSelector<IState>(
    (state) =>
      state.therapies.createTherapy.error?.message ||
      state.therapies.updateTherapy.error?.message ||
      t("common.somethingwrong")
  ) as string;

  const [deletedObjCode, setDeletedObjCode] = useState("");

  const patientData = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const deleteStatus = useSelector<IState, string | undefined>(
    (state) => state.therapies.deleteTherapy.status
  );

  const open = useMemo(() => {
    return creationMode ? canCreate : canUpdate;
  }, [creationMode, canCreate, canUpdate]);

  useEffect(() => {
    dispatch(deleteTherapyReset());
    dispatch(deleteTherapyReset());
    dispatch(getMedicals());
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
    valuesToSave.patID = patientData;
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
      {open && (
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
      )}
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
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
      <PatientTherapyTable
        handleDelete={onDelete}
        handleEdit={onEdit}
        shouldUpdateTable={shouldUpdateTable}
      />
      <ConfirmationDialog
        isOpen={deleteStatus === "SUCCESS"}
        title={t("common.delete")}
        icon={checkIcon}
        info={t("common.deletesuccess", { code: deletedObjCode })}
        primaryButtonLabel={t("common.ok")}
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => {}}
      />
    </div>
  );
};
export default PatientTherapy;
