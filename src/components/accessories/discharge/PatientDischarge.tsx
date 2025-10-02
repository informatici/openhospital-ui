import { TUserSection } from "components/activities/patientDetailsActivity/types";
import { useEncountersEnabled } from "libraries/hooks";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { updateEncounter } from "state/encounter";
import { getPatient } from "state/patients";
import checkIcon from "../../../assets/check-icon.png";
import warningIcon from "../../../assets/warning-icon.png";
import { AdmissionDTO, EncounterDTO } from "../../../generated";
import { parseDateTime } from "../../../libraries/formDataHandling/functions";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  dischargePatient,
  dischargePatientReset,
  getCurrentAdmission,
} from "../../../state/admissions";
import { IState } from "../../../types";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import { CurrentAdmission } from "../currentAdmission/CurrentAdmission";
import CloseEncounterDialog from "../encounters/closeEncounterDialog/CloseEncounterDialog";
import InfoBox from "../infoBox/InfoBox";
import DischargeForm from "./dischargeForm/DischargeForm";
import "./styles.scss";
import { AdmissionTransitionState } from "./types";
import { useFields } from "./useFields";

const PatientDischarge: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [, setShouldUpdateTable] = useState(false);
  const [close, setClose] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<AdmissionTransitionState>("IDLE");

  const { id, code } = useParams();

  const encounter = useAppSelector((state) =>
    state.encounters.getEncountersByPatient.data?.find(
      (item) => item.patient.code?.toString() === id && item.code === code
    )
  );

  const navigate = useNavigate();

  const changeUserSection = useCallback(
    (section: TUserSection) => {
      navigate(`/patients/details/${id}/${section}`, { replace: true });
    },
    [navigate, id]
  );

  const currentAdmission = useAppSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.data
  );

  const [openResetConfirmation, setOpenResetConfirmation] = useState(false);

  const currentAdmissionStatus = useAppSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.status
  );

  const encountersEnabled = useEncountersEnabled();

  const currentEncounter = useAppSelector(
    (state: IState) => state.encounters.getCurrentEncounterByPatient.data
  );

  const fields = useFields(currentAdmission);

  const patient = useAppSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const dischargeStatus = useAppSelector(
    (state) => state.admissions.dischargePatient.status
  );

  const errorMessage = useAppSelector(
    (state) =>
      state.admissions.dischargePatient.error?.message ||
      state.admissions.currentAdmissionByPatientId.error?.message
  ) as string;

  const onclosure = () => {
    setClose(true);
    setOpenResetConfirmation(true);
  };

  const closeEncounter = (closureDate: string) => {
    if (!currentEncounter) return;
    const encounterToUpdate = {
      ...currentEncounter,
      closedAt: closureDate,
    } as EncounterDTO;
    dispatch(
      updateEncounter({
        code: currentEncounter.code!,
        body: encounterToUpdate,
      })
    );
    setOpenResetConfirmation(false);
    scrollToElement(null);
    changeUserSection("encounters");
  };

  const onSubmit = (adm: AdmissionDTO) => {
    setShouldResetForm(false);
    if (currentAdmission) {
      const dischargeToSave: AdmissionDTO = {
        ...currentAdmission,
        disDate: parseDateTime(adm.disDate ?? "", false),
        disType: adm.disType,
        diseaseOut1: adm.diseaseOut1,
        diseaseOut2: adm.diseaseOut2,
        diseaseOut3: adm.diseaseOut3,
        anamnesis: adm.anamnesis,
        admitted: 0,
      };
      dispatch(
        dischargePatient({
          patientCode: patient?.code ?? -1,
          admissionDTO: dischargeToSave,
        })
      );
    }
  };

  useEffect(() => {
    if (dischargeStatus === "FAIL" || currentAdmissionStatus === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [dischargeStatus, currentAdmissionStatus, activityTransitionState]);

  useEffect(() => {
    dispatch(dischargePatientReset());
  }, [dispatch]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(getCurrentAdmission(patient?.code));
      dispatch(getPatient((patient?.code ?? 0).toString()));
      dispatch(dischargePatientReset());
      setShouldResetForm(true);
      setActivityTransitionState("IDLE");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, activityTransitionState]);

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  useEffect(() => {
    dispatch(getCurrentAdmission(patient?.code));
  }, [patient, dispatch]);

  return (
    <div className="patientAdmission">
      {currentAdmissionStatus === "SUCCESS" && !encounter?.closedAt && (
        <>
          <CurrentAdmission />
          <DischargeForm
            fields={fields}
            onSubmit={onSubmit}
            submitButtonLabel={t("common.save")}
            resetButtonLabel={t("common.reset")}
            shouldResetForm={shouldResetForm}
            resetFormCallback={resetFormCallback}
            isLoading={dischargeStatus === "LOADING"}
            admission={currentAdmission}
          />
        </>
      )}
      {currentAdmissionStatus === "SUCCESS_EMPTY" && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="info" message={t("admission.patientnotadmitted")} />
        </div>
      )}
      {(dischargeStatus === "FAIL" || currentAdmissionStatus === "FAIL") && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={errorMessage} />
        </div>
      )}

      <ConfirmationDialog
        isOpen={
          dischargeStatus === "SUCCESS" &&
          (!encountersEnabled || !currentEncounter)
        }
        title={
          dischargeStatus === "SUCCESS"
            ? t("admission.discharged")
            : t("admission.notdischarged")
        }
        icon={checkIcon}
        info={
          dischargeStatus === "SUCCESS"
            ? t("admission.dischargesuccess")
            : t("admission.dischargefailed")
        }
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />

      <ConfirmationDialog
        isOpen={
          dischargeStatus === "SUCCESS" &&
          encountersEnabled &&
          !!currentEncounter &&
          !close
        }
        title={t("admission.discharged")}
        icon={checkIcon}
        info={t("admission.closeEncounter")}
        primaryButtonLabel={t("common.yes")}
        secondaryButtonLabel={t("common.no")}
        handlePrimaryButtonClick={() => onclosure()}
        handleSecondaryButtonClick={() =>
          setActivityTransitionState("TO_RESET")
        }
      />

      <CloseEncounterDialog
        isOpen={openResetConfirmation}
        title={t("encounter.closedtitle").toUpperCase()}
        info={t("encounter.closeddate")}
        icon={warningIcon}
        primaryButtonLabel={t("common.yes")}
        secondaryButtonLabel={t("common.no")}
        handlePrimaryButtonClick={closeEncounter}
        handleSecondaryButtonClick={() =>
          setActivityTransitionState("TO_RESET")
        }
        withDateField={true}
      />
    </div>
  );
};

export default PatientDischarge;
