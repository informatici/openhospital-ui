import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getPatient } from "state/patients";
import checkIcon from "../../../assets/check-icon.png";
import { AdmissionDTO } from "../../../generated";
import { parseDate } from "../../../libraries/formDataHandling/functions";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  dischargePatient,
  dischargePatientReset,
  getCurrentAdmission,
} from "../../../state/admissions";
import { IState } from "../../../types";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import { CurrentAdmission } from "../currentAdmission/CurrentAdmission";
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
  const [activityTransitionState, setActivityTransitionState] =
    useState<AdmissionTransitionState>("IDLE");

  const currentAdmission = useAppSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.data
  );

  const currentAdmissionStatus = useAppSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.status
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

  const onSubmit = (adm: AdmissionDTO) => {
    setShouldResetForm(false);
    if (currentAdmission) {
      const dischargeToSave: AdmissionDTO = {
        ...currentAdmission,
        disDate: parseDate(adm.disDate ?? ""),
        disType: adm.disType,
        diseaseOut1: adm.diseaseOut1,
        diseaseOut2: adm.diseaseOut2,
        diseaseOut3: adm.diseaseOut3,
        note: adm.note,
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
  }, [dischargeStatus, currentAdmissionStatus]);

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
  }, [dispatch, activityTransitionState, patient]);

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
      {currentAdmissionStatus === "SUCCESS" && (
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
        isOpen={dischargeStatus === "SUCCESS"}
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
    </div>
  );
};

export default PatientDischarge;
