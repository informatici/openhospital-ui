import { EncounterDTO, EncounterDTOStatusEnum } from "generated";
import { useAppDispatch, useAppSelector } from "libraries/hooks";
import { usePermission } from "libraries/permissionUtils/usePermission";
import { scrollToElement } from "libraries/uiUtils/scrollToElement";
import { isEmpty } from "lodash";
import "moment/min/locales";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import {
  createEncounter,
  createEncounterReset,
  getCurrentEncounterByPatient,
  getEncountersByPatient,
  updateEncounter,
  updateEncounterReset,
} from "state/encounter";
import { Param } from "state/encounter/param";
import { getPatient } from "state/patients";
import { IState } from "types";
import checkIcon from "../../../assets/check-icon.png";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import InfoBox from "../infoBox/InfoBox";
import { CurrentEncounter } from "./currentEncounter/CurrentEncounter";
import EncounterForm from "./encountersForm/EncounterForm";
import EncounterTable from "./encounterTable/EncounterTable";
import { EncounterTransitionState } from "./types";
import { useFields } from "./useFields";

export const Encounters = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const canCreate = usePermission("encounters.create");
  const canUpdate = usePermission("encounters.update");
  const { id } = useParams();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [creationMode, setCreationMode] = useState(true);
  const [isEditingCurrent, setIsEditingCurrent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [encounterToEdit, setEncounterToEdit] = useState<
    EncounterDTO | undefined
  >();
  const [isCloseEncounterDialogOpen, setIsCloseEncounterDialogOpen] =
    useState(false);
  const [isDeleteEncounterDialogOpen, setIsDeleteEncounterDialogOpen] =
    useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<EncounterTransitionState>("IDLE");
  const navigate = useNavigate();

  const patient = useAppSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const currentEncounter = useAppSelector(
    (state: IState) => state.encounters.getCurrentEncounterByPatient.data
  );

  const createStatus = useAppSelector(
    (state) => state.encounters.createEncounter.status
  );

  const updateStatus = useAppSelector(
    (state) => state.encounters.updateEncounter.status
  );

  const errorMessage = useAppSelector(
    (state) =>
      state.encounters.createEncounter.error?.message ||
      state.encounters.updateEncounter.error?.message ||
      t("common.somethingwrong")
  ) as string;

  const patientCode = useAppSelector(
    (state) => state.patients.selectedPatient.data?.code
  );

  useEffect(() => {
    if (patientCode && creationMode) {
      dispatch(getCurrentEncounterByPatient(parseInt(id!!)));
    }
  }, [dispatch, patientCode, creationMode, id]);

  const fields = useFields(encounterToEdit);

  const onSubmit = (enc: EncounterDTO) => {
    setShouldResetForm(false);
    if (creationMode) {
      enc.patient = patient!;
      dispatch(createEncounter(enc));
    } else {
      enc.patient = patient!;
      enc.id = encounterToEdit?.id;
      enc.lock = encounterToEdit?.lock;
      const param: Param = {
        code: encounterToEdit?.code!,
        body: enc,
      };
      dispatch(updateEncounter(param));
    }
  };

  useEffect(() => {
    if (createStatus === "FAIL" || updateStatus === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [createStatus, updateStatus]);

  useEffect(() => {
    dispatch(createEncounterReset());
    dispatch(updateEncounterReset());
  }, [dispatch]);

  useEffect(() => {
    if (creationMode && !!currentEncounter) {
      setShowForm(false);
    } else setShowForm(true);
  }, [currentEncounter, creationMode]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(createEncounterReset());
      dispatch(updateEncounterReset());
      setShouldUpdateTable(true);
      setShouldResetForm(true);
    }
  }, [dispatch, patient, activityTransitionState]);

  useEffect(() => {
    if (createStatus === "SUCCESS" || updateStatus === "SUCCESS") {
      dispatch(getPatient(id!!));
      dispatch(getEncountersByPatient(parseInt(id!!)));
    }
  }, [createStatus, dispatch, id, updateStatus]);

  const resetFormCallback = () => {
    setCreationMode(true);
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setActivityTransitionState("IDLE");
    setEncounterToEdit(undefined);
    scrollToElement(null);
  };

  const onEdit = (row: EncounterDTO) => {
    setEncounterToEdit(row);
    setCreationMode(false);
    scrollToElement(null);
  };

  const onDelete = () => {
    const encounterToDelete = {
      ...currentEncounter,
      status: EncounterDTOStatusEnum.Cancelled,
    } as EncounterDTO;

    const param: Param = {
      code: currentEncounter?.code!,
      body: encounterToDelete,
    };

    dispatch(updateEncounter(param));
    setIsDeleteEncounterDialogOpen(true);
  };

  const onView = (encounter: EncounterDTO) => {
    navigate(
      `/patients/details/${encounter.patient.code}/encounters/${encounter.code}`
    );
  };

  const onCloseEncounter = () => {
    if (updateStatus === "SUCCESS") {
      setIsCloseEncounterDialogOpen(true);
      setShowForm(true);
      setShouldResetForm(false);
      setShouldUpdateTable(false);
      setActivityTransitionState("IDLE");
      setEncounterToEdit(undefined);
      scrollToElement(null);
    }
  };

  return (
    <div className="encounters">
      <div className="patientAdmission">
        {!showForm && currentEncounter && (
          <InfoBox
            type="info"
            message={t("encounter.patientalreadyhaveencuonter")}
          />
        )}
        {!showForm && currentEncounter && (
          <CurrentEncounter
            onEditChange={() => {}}
            onEditCode={onEdit}
            onDelete={onDelete}
            onCloseEncounter={onCloseEncounter}
          />
        )}
        {showForm && (creationMode ? canCreate : canUpdate) && (
          <EncounterForm
            fields={fields}
            onSubmit={onSubmit}
            creationMode={creationMode}
            submitButtonLabel={
              encounterToEdit ? t("common.update") : t("common.save")
            }
            resetButtonLabel={t("common.reset")}
            shouldResetForm={shouldResetForm}
            resetFormCallback={resetFormCallback}
            admitted={!isEmpty(encounterToEdit?.code)}
            isLoading={createStatus === "LOADING" || updateStatus === "LOADING"}
          />
        )}
        {(createStatus === "FAIL" || updateStatus === "FAIL") && (
          <div ref={infoBoxRef} className="info-box-container">
            <InfoBox type="error" message={errorMessage} />
          </div>
        )}

        <EncounterTable
          handelView={onView}
          shouldUpdateTable={shouldUpdateTable}
          activityTransitionState={activityTransitionState}
        />

        <ConfirmationDialog
          isOpen={
            (createStatus === "SUCCESS" || updateStatus === "SUCCESS") &&
            !isEditingCurrent &&
            !isCloseEncounterDialogOpen
          }
          title={creationMode ? t("encounter.created") : t("encounter.updated")}
          icon={checkIcon}
          info={
            creationMode
              ? t("encounter.createsuccess")
              : t("encounter.updatesuccess")
          }
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() =>
            setActivityTransitionState("TO_RESET")
          }
          handleSecondaryButtonClick={() => ({})}
        />

        <ConfirmationDialog
          isOpen={isCloseEncounterDialogOpen}
          title={t("encounter.closed")}
          icon={checkIcon}
          info={t("encounter.closedsuccess")}
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            setActivityTransitionState("TO_RESET");
            setIsCloseEncounterDialogOpen(false);
          }}
          handleSecondaryButtonClick={() => ({})}
        />

        <ConfirmationDialog
          isOpen={isDeleteEncounterDialogOpen}
          title={t("encounter.deleted")}
          icon={checkIcon}
          info={t("encounter.deletedsuccess")}
          primaryButtonLabel="Ok"
          handlePrimaryButtonClick={() => {
            setActivityTransitionState("TO_RESET");
            setIsDeleteEncounterDialogOpen(false);
          }}
          handleSecondaryButtonClick={() => ({})}
        />
      </div>
    </div>
  );
};
