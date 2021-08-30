import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdmissionDTO } from "../../../generated";
import { initialFields } from "./consts";
import DischargeForm from "./dischargeForm/DischargeForm";
import {
  createDischargeReset,
  getCurrentAdmissionByPatientId,
} from "../../../state/admissions/actions";
import { IState } from "../../../types";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import InfoBox from "../infoBox/InfoBox";
import { updateAdmission } from "../../../state/admissions/actions";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { DischargeTransitionState } from "./dischargeForm/types";
import checkIcon from "../../../assets/check-icon.png";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";

export const PatientDischarge: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<DischargeTransitionState>("IDLE");

  const onSubmit = (discharge: AdmissionDTO) => {
    setShouldResetForm(false);
    if (currentAdmission !== undefined) {
      let current: AdmissionDTO = Object.assign({}, currentAdmission);
      Object.assign(current, currentAdmission);
      current.disDate = discharge.disDate;
      current.disType = discharge.disType;
      current.diseaseOut1 = discharge.diseaseOut1;
      current.diseaseOut2 = discharge.diseaseOut2;
      current.diseaseOut3 = discharge.diseaseOut3;
      dispatch(updateAdmission(current));
    }
  };

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const status = useSelector(
    (state: IState) => state.admissions.updateAdmission.status
  );

  const currentAdmission = useSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.data
  );

  useEffect(() => {
    dispatch(createDischargeReset());
  }, [dispatch, createDischargeReset]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(createDischargeReset());
      setShouldResetForm(true);
    }
  }, [dispatch, activityTransitionState, createDischargeReset]);

  useEffect(() => {
    if (status === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [status]);

  useEffect(() => {
    dispatch(getCurrentAdmissionByPatientId(patient?.code));
  }, [patient, dispatch, getCurrentAdmissionByPatientId]);

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  return (
    <div className="patientDischarge">
      {currentAdmission ? (
        <DischargeForm
          fields={initialFields}
          onSubmit={onSubmit}
          submitButtonLabel={t("common.save")}
          resetButtonLabel={t("common.discard")}
          shouldResetForm={shouldResetForm}
          resetFormCallback={resetFormCallback}
          isLoading={false}
        />
      ) : (
        <InfoBox type="warning" message={t("admission.nocurrentadmission")} />
      )}
      {status === "FAIL" && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}
      <ConfirmationDialog
        isOpen={status === "SUCCESS"}
        title={t("admission.discharged")}
        icon={checkIcon}
        info={t("admission.dischargesuccess")}
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
    </div>
  );
};
