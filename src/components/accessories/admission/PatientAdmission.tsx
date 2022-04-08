import React, { FC, useEffect, useRef, useState } from "react";
import AdmissionForm from "./admissionForm/AdmissionForm";
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
  createAdmission,
  createAdmissionReset,
  getCurrentAdmissionByPatientId,
  updateAdmission,
  updateAdmissionReset,
} from "../../../state/admissions/actions";
import { useFields } from "./useFields";
import { getPatientThunk } from "../../../state/patients/actions";
import PatientAdmissionTable from "./admissionTable/AdmissionTable";

const PatientAdmission: FC = () => {
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
  const fields = useFields(currentAdmission);

  const patient = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );

  const username = useSelector(
    (state: IState) => state.main.authentication.data?.displayName
  );

  const createStatus = useSelector<IState>(
    (state) => state.admissions.createAdmission.status
  );

  const updateStatus = useSelector<IState>(
    (state) => state.admissions.updateAdmission.status
  );

  const onSubmit = (adm: AdmissionDTO) => {
    setShouldResetForm(false);
    if (!currentAdmission) {
      adm.patient = patient;
      adm.userID = username;
      adm.abortDate = adm.admDate;
      adm.admitted = 1;
      dispatch(createAdmission(adm));
    } else {
      const dischargeToSave: AdmissionDTO = {
        ...currentAdmission,
        disDate: adm.disDate,
        disType: adm.disType,
        diseaseOut: adm.diseaseOut,
        admitted: 0,
      };
      dispatch(updateAdmission(dischargeToSave));
    }
  };

  useEffect(() => {
    if (createStatus === "FAIL" || updateStatus === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
    if (createStatus === "SUCCESS") {
      dispatch(getPatientThunk((patient?.code ?? 0).toString()));
    }
  }, [createStatus, updateStatus]);

  useEffect(() => {
    dispatch(createAdmissionReset());
    dispatch(updateAdmissionReset());
  }, [dispatch]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      dispatch(updateAdmissionReset());
      dispatch(getCurrentAdmissionByPatientId(patient?.code));
      dispatch(createAdmissionReset());
      setShouldUpdateTable(true);
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
      <AdmissionForm
        fields={fields}
        onSubmit={onSubmit}
        submitButtonLabel={t("common.save")}
        resetButtonLabel={t("common.reset")}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
        isLoading={createStatus === "LOADING" || updateStatus === "LOADING"}
        admitted={currentAdmission?.admitted === 1}
      />
      {(createStatus === "FAIL" || updateStatus === "FAIL") && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}

      <PatientAdmissionTable shouldUpdateTable={shouldUpdateTable} />

      <ConfirmationDialog
        isOpen={createStatus === "SUCCESS" || updateStatus === "SUCCESS"}
        title={
          updateStatus === "SUCCESS"
            ? t("admission.discharged")
            : t("admission.created")
        }
        icon={checkIcon}
        info={
          updateStatus === "SUCCESS"
            ? t("admission.dischargesuccess")
            : t("admission.createsuccess")
        }
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
    </div>
  );
};

export default PatientAdmission;
