import { MedicalHistoryDTO } from "generated";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { Permission } from "libraries/permissionUtils/Permission";
import { usePermission } from "libraries/permissionUtils/usePermission";
import { scrollToElement } from "libraries/uiUtils/scrollToElement";
import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import {
  createMedicalHistory,
  createMedicalHistoryReset,
  getMedicalHistoryByPatientCode,
  updateMedicalHistory,
  updateMedicalHistoryReset,
} from "state/medicalhistory";
import { getPatient } from "state/patients/thunk";
import checkIcon from "../../../assets/check-icon.png";
import failIcon from "../../../assets/fail-icon.png";
import { IState } from "../../../types";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import InfoBox from "../infoBox/InfoBox";
import MedicalHistoryForm from "./medicalHistoryForm/MedicalHistoryForm";
import MedicalHistoryTable from "./medicalHistoryTable/MedicalHistoryTable";
import "./styles.scss";
import { MedicalHistoryTransitionState } from "./types";
import { useFields } from "./useFields";

const MedicalHistory: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [creationMode, setCreationMode] = useState(true);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<MedicalHistoryTransitionState>("IDLE");
  const [medicalHistoryToEdit, setMedicalHistoryToEdit] = useState<
    MedicalHistoryDTO | undefined
  >();
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const canCreate = usePermission("medicalhistories.create");
  const canUpdate = usePermission("medicalhistories.update");

  const { id, code } = useParams();

  const encounter = useAppSelector((state) =>
    state.encounters.getEncountersByPatient.data?.find(
      (item) => item.patient.code?.toString() === id && item.code === code
    )
  );

  const patient = useAppSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const createStatus = useAppSelector(
    (state) => state.medicalhistory.createMedicalHistory.status
  );

  const updateStatus = useAppSelector(
    (state) => state.medicalhistory.updateMedicalHistory.status
  );

  const patientCode = useAppSelector(
    (state) => state.patients.selectedPatient.data?.code
  );

  useEffect(() => {
    if (patientCode && creationMode) {
      dispatch(getMedicalHistoryByPatientCode(parseInt(id!!)));
    }
  }, [dispatch, patientCode, creationMode, id]);

  const fields = useFields(medicalHistoryToEdit);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const errorMessage = useAppSelector(
    (state) =>
      state.medicalhistory.createMedicalHistory.error?.message ||
      state.medicalhistory.updateMedicalHistory.error?.message ||
      t("common.somethingwrong")
  ) as string;

  const onSubmit = (mh: MedicalHistoryDTO) => {
    setShouldResetForm(false);
    if (!encounter) {
      setOpenConfirmDialog(true);
      return;
    }
    if (creationMode) {
      mh.drugAllergy = mh.allergyPrecision ? true : false;
      mh.patient = patient!;
      dispatch(createMedicalHistory(mh));
    } else {
      let medicalHistoryToSave: MedicalHistoryDTO = {
        ...medicalHistoryToEdit,
        patient: patient!,
        siblingRank: mh.siblingRank,
        termPregnancy: mh.termPregnancy,
        pregnancy: mh.pregnancy,
        deliveryMode: mh.deliveryMode,
        reasonMode: mh.reasonMode,
        apgarScore: mh.apgarScore,
        birthWeight: mh.birthWeight,
        vaccinationStatePev: mh.vaccinationStatePev,
        vaccinationStateNoPev: mh.vaccinationStateNoPev,
        antiMalarialProphylaxisVap: mh.antiMalarialProphylaxisVap,
        antiMalarialProphylaxisMilda: mh.antiMalarialProphylaxisMilda,
        antiMalarialProphylaxisOthers: mh.antiMalarialProphylaxisOthers,
        surgicalProcedure: mh.surgicalProcedure,
        surgicalProcedureCondition: mh.surgicalProcedureCondition,
        surgicalProcedureType: mh.surgicalProcedureType,
        surgicalProcedureDate: mh.surgicalProcedureDate,
        diversification: mh.diversification,
        neonatalPeriod: mh.neonatalPeriod,
        previousHospitalization: mh.previousHospitalization,
        father: mh.father,
        mother: mh.mother,
        siblings: mh.siblings,
        otherUsefulInformation: mh.otherUsefulInformation,
        diet: mh.diet,
        deParasitization: mh.deParasitization,
        psychomotorDev: mh.psychomotorDev,
        somaticGrowth: mh.somaticGrowth,
        ironSupplement: mh.ironSupplement,
        folicAcidSupplement: mh.folicAcidSupplement,
        vitASupplement: mh.vitASupplement,
        otherSupplements: mh.otherSupplements,
        transfusion: mh.transfusion,
        lastTransfusionDate: mh.lastTransfusionDate,
        sickleCell: mh.sickleCell,
        drugAllergy: mh.allergyPrecision ? true : false,
        allergyPrecision: mh.allergyPrecision,
        hemylosis: mh.hemylosis,
        otherPersonalPathologies: mh.otherPersonalPathologies,
        otherFamilyPathologies: mh.otherFamilyPathologies,
        performedAt: mh.performedAt,
      };
      dispatch(
        updateMedicalHistory({
          id: medicalHistoryToSave.id!!,
          medicalHistoryDTO: medicalHistoryToSave,
        })
      );
    }
  };

  const resetFormCallback = () => {
    setCreationMode(true);
    setShouldResetForm(false);
    setActivityTransitionState("IDLE");
    setMedicalHistoryToEdit(undefined);
    setShouldUpdateTable(false);
    scrollToElement(null);
  };

  useEffect(() => {
    if (createStatus === "FAIL" || updateStatus === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [createStatus, updateStatus]);

  useEffect(() => {
    dispatch(createMedicalHistoryReset());
    dispatch(updateMedicalHistoryReset());
  }, [dispatch]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(createMedicalHistoryReset());
      dispatch(updateMedicalHistoryReset());
      setShouldUpdateTable(true);
      setShouldResetForm(true);
    }
  }, [dispatch, patient, activityTransitionState]);

  useEffect(() => {
    if (createStatus === "SUCCESS" || updateStatus === "SUCCESS") {
      dispatch(getPatient(id!!));
      dispatch(getMedicalHistoryByPatientCode(parseInt(id!!)));
    }
  }, [createStatus, dispatch, id, updateStatus]);

  const onEdit = (row: MedicalHistoryDTO) => {
    setMedicalHistoryToEdit(row);
    setCreationMode(false);
    scrollToElement(null);
  };

  return (
    <div className="medicalHistory">
      {!encounter?.closedAt && (creationMode ? canCreate : canUpdate) && (
        <Permission
          require={
            creationMode ? "medicalhistories.create" : "medicalhistories.update"
          }
        >
          <MedicalHistoryForm
            fields={fields}
            onSubmit={onSubmit}
            creationMode={creationMode}
            submitButtonLabel={
              creationMode
                ? t("therapy.savetherapy")
                : t("therapy.updatetherapy")
            }
            resetButtonLabel={t("common.reset")}
            shouldResetForm={shouldResetForm}
            resetFormCallback={resetFormCallback}
            isLoading={createStatus === "LOADING" || updateStatus === "LOADING"}
          />
        </Permission>
      )}
      {(createStatus === "FAIL" || updateStatus === "FAIL") && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={errorMessage} />
        </div>
      )}

      <MedicalHistoryTable
        handleEdit={encounter?.closedAt ? undefined : onEdit}
        shouldUpdateTable={shouldUpdateTable}
      />
      <ConfirmationDialog
        isOpen={createStatus === "SUCCESS" || updateStatus === "SUCCESS"}
        title={
          creationMode
            ? t("medicalHistory.created")
            : t("medicalHistory.updated")
        }
        icon={checkIcon}
        info={
          creationMode
            ? t("medicalHistory.createsuccess")
            : t("medicalHistory.updatesuccess")
        }
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
      <ConfirmationDialog
        isOpen={openConfirmDialog}
        title={t("encounters.information")}
        icon={failIcon}
        info={t("encounters.informationmessage")}
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setOpenConfirmDialog(false)}
        handleSecondaryButtonClick={() => ({})}
      />
    </div>
  );
};
export default MedicalHistory;
