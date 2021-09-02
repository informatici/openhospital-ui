import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdmissionDTO } from "../../../generated";
import { initialFields } from "./consts";
import DischargeForm from "./dischargeForm/DischargeForm";
import {
  getCurrentAdmissionByPatientId,
  updateAdmissionReset,
} from "../../../state/admissions/actions";
import { IState } from "../../../types";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import InfoBox from "../infoBox/InfoBox";
import { updateAdmission } from "../../../state/admissions/actions";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  DischargeFormFieldName,
  DischargeTransitionState,
} from "./dischargeForm/types";
import checkIcon from "../../../assets/check-icon.png";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import moment from "moment";
import { TFields } from "../../../libraries/formDataHandling/types";
import { differenceInDays } from "../../../libraries/formDataHandling/functions";

export const PatientDischarge: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<DischargeTransitionState>("IDLE");

  const currentAdmission = useSelector(
    (state: IState) => state.admissions.currentAdmissionByPatientId.data
  );

  const fields: TFields<DischargeFormFieldName> = {
    ...initialFields,
    admDate: {
      value: currentAdmission?.admDate ?? "",
      type: "date",
    },
    bedDays: {
      value: differenceInDays(
        new Date(+(currentAdmission?.admDate ?? "")),
        new Date()
      ).toString(),
      type: "number",
    },
  };

  const onSubmit = (discharge: AdmissionDTO) => {
    setShouldResetForm(false);
    const dischargeToSave: AdmissionDTO = {
      ...currentAdmission,
      disDate: discharge.disDate,
      disType: discharge.disType,
      diseaseOut1: discharge.diseaseOut1,
      diseaseOut2: discharge.diseaseOut2,
      diseaseOut3: discharge.diseaseOut3,
      admitted: 0,
    };
    dispatch(updateAdmission(dischargeToSave));
  };

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const status = useSelector(
    (state: IState) => state.admissions.updateAdmission.status
  );

  useEffect(() => {
    dispatch(updateAdmissionReset());
  }, [dispatch, updateAdmissionReset]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(updateAdmissionReset());
      setShouldResetForm(true);
    }
  }, [dispatch, activityTransitionState, updateAdmissionReset]);

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
          fields={fields}
          onSubmit={onSubmit}
          submitButtonLabel={t("common.save")}
          resetButtonLabel={t("common.discard")}
          shouldResetForm={shouldResetForm}
          resetFormCallback={resetFormCallback}
          isLoading={status === "LOADING"}
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
