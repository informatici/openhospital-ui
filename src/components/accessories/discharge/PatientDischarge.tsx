import React, { FC, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import { AdmissionTransitionState } from "./types";
import { AdmissionDTO } from "../../../generated";
import InfoBox from "../infoBox/InfoBox";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../assets/check-icon.png";
import {
  getCurrentAdmissionByPatientId,
  dischargePatient,
  dischargePatientReset,
} from "../../../state/admissions/actions";
import { useFields } from "./useFields";
import DischargeForm from "./dischargeForm/DischargeForm";
import { getPatientThunk } from "../../../state/patients/actions";
import { parseDate } from "../../../libraries/formDataHandling/functions";

const PatientDischarge: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<AdmissionTransitionState>("IDLE");

  const currentAdmission = useSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.data
  );

  const currentAdmissionStatus = useSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.status
  );

  const fields = useFields(currentAdmission);

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );
  const username = useSelector(
    (state: IState) => state.main.authentication.data?.displayName
  );

  const dischargeStatus = useSelector<IState>(
    (state) => state.admissions.dischargePatient.status
  );

  const errorMessage = useSelector<IState>(
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
      dispatch(dischargePatient(patient?.code, dischargeToSave));
    }
  };

  useEffect(() => {
    if (dischargeStatus === "FAIL" || currentAdmissionStatus === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [dischargeStatus]);

  useEffect(() => {
    dispatch(dischargePatientReset());
  }, [dispatch]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(getCurrentAdmissionByPatientId(patient?.code));
      dispatch(getPatientThunk((patient?.code ?? 0).toString()));
      dispatch(dischargePatientReset());
      setShouldResetForm(true);
    }
  }, [dispatch, activityTransitionState]);

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  useEffect(() => {
    dispatch(getCurrentAdmissionByPatientId(patient?.code));
  }, [patient, dispatch]);

  return (
    <div className="patientAdmission">
      {currentAdmissionStatus === "SUCCESS" && (
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
      )}
      {currentAdmissionStatus === "SUCCESS_EMPTY" && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="warning" message={t("admission.patientnotadmitted")} />
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
