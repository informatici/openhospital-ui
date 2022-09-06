import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import { initialFields } from "./consts";
import { VisitDTO } from "../../../generated";
import {
  getVisits,
  createVisit,
  createVisitReset,
  updateVisit,
  updateVisitReset,
} from "../../../state/visits/actions";
import PatientVisitForm from "./patientVisitForm/PatientVisitForm";
import { TActivityTransitionState } from "./types";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import InfoBox from "../infoBox/InfoBox";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../assets/check-icon.png";
import PatientVisitTable from "./patientVisitTable/PatientVisitTable";
import { updateVisitFields } from "../../../libraries/formDataHandling/functions";
import { getWards } from "../../../state/ward/actions";
import PatientOperation from "../patientOperation/PatientOperation";
import { CustomDialog } from "../customDialog/CustomDialog";
import { usePermission } from "../../../libraries/permissionUtils/usePermission";

const PatientVisit: FunctionComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const canCreate = usePermission("visit.create");
  const canUpdate = usePermission("visit.update");

  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);

  const [visitToEdit, setVisitToEdit] = useState({} as VisitDTO);

  const [creationMode, setCreationMode] = useState(true);

  const [selectedVisit, setSelectedVisit] = useState({} as VisitDTO);

  const [showModal, setShowModal] = useState(false);

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

  const errorMessage = useSelector<IState>(
    (state) =>
      state.visits.createVisit.error?.message ||
      state.visits.updateVisit.error?.message ||
      t("common.somethingwrong")
  ) as string;

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const open = useMemo(() => {
    return creationMode ? canCreate : canUpdate;
  }, [creationMode, canCreate, canUpdate]);

  useEffect(() => {
    if (changeStatus === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
      setShouldResetForm(false);
    }
  }, [changeStatus]);

  useEffect(() => {
    dispatch(createVisitReset());
    dispatch(updateVisitReset());
    dispatch(getWards());
    dispatch(getVisits(patient?.code ?? -1));
  }, [patient?.code, dispatch]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      setShouldUpdateTable(true);
      setCreationMode(true);
      dispatch(createVisitReset());
      dispatch(updateVisitReset());
      setShouldResetForm(true);
    }
  }, [dispatch, activityTransitionState]);

  const onSubmit = (visitValuesToSave: VisitDTO) => {
    setShouldResetForm(false);
    visitValuesToSave = { ...visitToEdit, ...visitValuesToSave };
    visitValuesToSave.patient = patient;
    if (!creationMode && visitToEdit.visitID) {
      dispatch(
        updateVisit(visitToEdit.visitID, {
          ...visitToEdit,
          ...visitValuesToSave,
        })
      );
    } else dispatch(createVisit({ ...visitValuesToSave, visitID: 0 }));
  };

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setCreationMode(true);
    dispatch(createVisitReset());
    dispatch(updateVisitReset());
    setActivityTransitionState("IDLE");
    setShouldUpdateTable(false);
    scrollToElement(null);
  };

  const onEdit: (row: VisitDTO) => void = (row) => {
    setVisitToEdit(row);
    setCreationMode(false);
    scrollToElement(null);
  };

  const onOperationCreated: () => void = () => {
    setSelectedVisit({} as VisitDTO);
    setShowModal(false);
  };

  const onAddOperation = (value: VisitDTO) => {
    setSelectedVisit(value);
    setShowModal(true);
  };

  return (
    <div className="patientVisit">
      {open && (
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
      )}

      {changeStatus === "FAIL" && (
        <div ref={infoBoxRef}>
          <InfoBox type="error" message={errorMessage} />
        </div>
      )}
      <PatientVisitTable
        handleEdit={onEdit}
        handleAddOperation={onAddOperation}
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
      <CustomDialog
        title={t("visit.addoperation")}
        description={t("visit.addoperationdesc")}
        open={showModal}
        onClose={onOperationCreated}
        content={
          <PatientOperation
            onSuccess={onOperationCreated}
            visit={selectedVisit}
          />
        }
      />
    </div>
  );
};

export default PatientVisit;
