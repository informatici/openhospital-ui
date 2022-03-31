import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import { initialFields } from "./consts";
import { VisitDTO } from "../../../generated";
import {
  getVisits,
  deleteVisits,
  deleteVisitsReset,
  createVisit,
  createVisitReset,
  deleteVisit,
  deleteVisitReset,
  updateVisit,
  updateVisitReset,
} from "../../../state/visits/actions";
import { searchPatient } from "../../../state/patients/actions";
import PatientVisitForm from "./patientVisitForm/PatientVisitForm";
import { TActivityTransitionState } from "./types";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import InfoBox from "../infoBox/InfoBox";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../assets/check-icon.png";
import PatientVisitTable from "./patientVisitTable/PatientVisitTable";
import { updateVisitFields } from "../../../libraries/formDataHandling/functions";
import { getWards } from "../../../state/ward/actions";

const PatientVisit: FunctionComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);

  const [visitToEdit, setVisitToEdit] = useState({} as VisitDTO);

  const [creationMode, setCreationMode] = useState(true);

  const [deletedObjCode, setDeletedObjCode] = useState("");

  const changeStatus = useSelector<IState, string | undefined>((state) => {
    /*
      Apart from "IDLE" create and update cannot reach "LOADING", "SUCCESS" and "FAIL" 
      status at the same time,
      because we use the same form for creation and modification. 
    */
    return state.visits.createVisit.status !== "IDLE"
      ? state.visits.createVisit.status
      : state.visits.updateVisit.status;
  });
  const deleteStatus = useSelector<IState, string | undefined>(
    (state) => state.visits.deleteVisit.status
  );

  useEffect(() => {
    if (changeStatus === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
      setShouldResetForm(true);
    }
  }, [changeStatus]);

  useEffect(() => {
    dispatch(createVisitReset());
    dispatch(updateVisitReset());
    dispatch(deleteVisitReset());
    dispatch(getWards());
    dispatch(getVisits(patient?.code ?? -1));
  }, [dispatch]);

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const userId = useSelector(
    (state: IState) => state.main.authentication.data?.displayName
  );

  const wardsData = useSelector((state: IState) => state.wards.allWards.data);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      setShouldUpdateTable(true);
      setCreationMode(true);
      dispatch(createVisitReset());
      dispatch(updateVisitReset());
      dispatch(deleteVisitReset());
      setShouldResetForm(true);
    }
  }, [dispatch, activityTransitionState]);

  const onSubmit = (visitValuestoSave: VisitDTO) => {
    setShouldResetForm(false);
    visitValuestoSave.patient = patient;
    if (!creationMode && visitToEdit.visitID) {
      dispatch(updateVisit(visitToEdit.visitID, visitValuestoSave, wardsData));
    } else dispatch(createVisit(visitValuestoSave, wardsData));
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setCreationMode(true);
    dispatch(createVisitReset());
    dispatch(updateVisitReset());
    dispatch(deleteVisitReset());
    setActivityTransitionState("IDLE");
    setShouldUpdateTable(false);
    scrollToElement(null);
  };

  const onEdit = (row: VisitDTO) => {
    setVisitToEdit(row);
    setCreationMode(false);
    scrollToElement(null);
  };

  const onDelete = (code: number | undefined) => {
    setDeletedObjCode(code?.toString() ?? "");
    dispatch(deleteVisit(code));
  };

  return (
    <div className="patientVisit">
      <PatientVisitForm
        fields={
          creationMode
            ? initialFields
            : updateVisitFields(initialFields, visitToEdit)
        }
        onSubmit={onSubmit}
        submitButtonLabel={
          creationMode ? t("visit.savevisit") : t("visit.updatevisit")
        }
        resetButtonLabel={t("common.reset")}
        isLoading={changeStatus === "LOADING"}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
      />

      {(changeStatus === "FAIL" || deleteStatus === "FAIL") && (
        <div ref={infoBoxRef}>
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}
      <PatientVisitTable
        handleEdit={onEdit}
        handleDelete={onDelete}
        shouldUpdateTable={shouldUpdateTable}
      />
      <ConfirmationDialog
        isOpen={changeStatus === "SUCCESS"}
        title={creationMode ? t("visit.created") : t("visit.updated")}
        icon={checkIcon}
        info={
          creationMode
            ? t("visit.createsuccess")
            : t("visit.updatesuccess", { code: visitToEdit.visitID })
        }
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
      <ConfirmationDialog
        isOpen={deleteStatus === "SUCCESS"}
        title={t("visit.deleted")}
        icon={checkIcon}
        info={t("common.deletesuccess", { code: deletedObjCode })}
        primaryButtonLabel={t("common.ok")}
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => {}}
      />
    </div>
  );
};

export default PatientVisit;
