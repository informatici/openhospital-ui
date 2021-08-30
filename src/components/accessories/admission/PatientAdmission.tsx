import React, { FC, useEffect, useRef, useState } from "react";
import AdmissionForm from "./admissionForm/AdmissionForm";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../types";
import { AdmissionTransitionState } from "./types";
import { initialFields } from "./consts";
import { AdmissionDTO } from "../../../generated";
import InfoBox from "../infoBox/InfoBox";
import PatientAdmissionTable from "./admissionTable/AdmissionTable";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import checkIcon from "../../../assets/check-icon.png";
import {
  createAdmission,
  createAdmissionReset,
} from "../../../state/admissions/actions";
import { getDiseasesIpdIn } from "../../../state/diseases/actions";
import { getAdmissionTypes } from "../../../state/admissionTypes/actions";
import { getWards } from "../../../state/ward/actions";

const PatientAdmission: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [activityTransitionState, setActivityTransitionState] =
    useState<AdmissionTransitionState>("IDLE");

  const patientData = useSelector(
    (state: IState) => state.patients.selectedPatient.data
  );
  const username = useSelector(
    (state: IState) => state.main.authentication.data?.displayName
  );

  const status = useSelector<IState, string | undefined>((state) => {
    return state.admissions.createAdmission.status;
  });

  const onSubmit = (adm: AdmissionDTO) => {
    setShouldResetForm(false);
    adm.patient = patientData;
    adm.userID = username;
    adm.abortDate = adm.admDate;
    dispatch(createAdmission(adm));
  };

  useEffect(() => {
    dispatch(getDiseasesIpdIn());
  }, [dispatch, getDiseasesIpdIn]);

  useEffect(() => {
    dispatch(getAdmissionTypes());
  }, [dispatch, getAdmissionTypes]);

  useEffect(() => {
    dispatch(getWards());
  }, [dispatch, getWards]);

  useEffect(() => {
    if (status === "FAIL") {
      setActivityTransitionState("FAIL");
      scrollToElement(infoBoxRef.current);
    }
  }, [status]);

  useEffect(() => {
    dispatch(createAdmissionReset());
  }, [dispatch, createAdmissionReset]);

  useEffect(() => {
    if (activityTransitionState === "TO_RESET") {
      setShouldUpdateTable(true);
      dispatch(createAdmissionReset());
      setShouldResetForm(true);
    }
  }, [dispatch, activityTransitionState, createAdmissionReset]);

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setShouldUpdateTable(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  return (
    <div className="patientAdmission">
      <AdmissionForm
        fields={initialFields}
        onSubmit={onSubmit}
        submitButtonLabel={t("common.save")}
        resetButtonLabel={t("common.discard")}
        shouldResetForm={shouldResetForm}
        resetFormCallback={resetFormCallback}
        isLoading={false}
      />
      {status === "FAIL" && (
        <div ref={infoBoxRef} className="info-box-container">
          <InfoBox type="error" message={t("common.somethingwrong")} />
        </div>
      )}

      <PatientAdmissionTable shouldUpdateTable={shouldUpdateTable} />

      <ConfirmationDialog
        isOpen={status === "SUCCESS"}
        title={t("admission.created")}
        icon={checkIcon}
        info={t("admission.createsuccess")}
        primaryButtonLabel="Ok"
        handlePrimaryButtonClick={() => setActivityTransitionState("TO_RESET")}
        handleSecondaryButtonClick={() => ({})}
      />
    </div>
  );
};

export default PatientAdmission;
