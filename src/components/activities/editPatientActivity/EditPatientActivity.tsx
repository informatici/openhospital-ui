import isEmpty from "lodash.isempty";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router";
import checkIcon from "../../../assets/check-icon.png";
import { PatientDTO } from "../../../generated";
import { updateFields } from "../../../libraries/formDataHandling/functions";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  updatePatient,
  updatePatientReset,
  getPatientThunk,
} from "../../../state/patients/actions";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import ConfirmationDialog from "../../accessories/confirmationDialog/ConfirmationDialog";
import Footer from "../../accessories/footer/Footer";
import InfoBox from "../../accessories/infoBox/InfoBox";
import PatientDataForm from "../../accessories/patientDataForm/PatientDataForm";
import { initialFields } from "../newPatientActivity/consts";
import "./styles.scss";
import {
  IDispatchProps,
  IStateProps,
  TActivityTransitionState,
  TProps,
} from "./types";

const EditPatientActivity: FunctionComponent<TProps> = ({
  userCredentials,
  isLoading,
  updatePatient,
  updatePatientReset,
  hasSucceeded,
  hasFailed,
  patient,
  getPatientThunk,
}) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  useEffect(() => {
    if (isEmpty(patient.data) && patient.status === "IDLE") {
      getPatientThunk(id);
    }
  }, [patient, id, getPatientThunk]);

  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.searchpatient")]: "/search",
    [t("nav.patientdashboard")]: `/details/${patient.data?.code}`,
    [t("nav.editpatient")]: `/details/${patient.data?.code}/edit`,
  };

  const onSubmit = (updatePatientValues: PatientDTO) => {
    if (patient?.data?.code)
      updatePatient(patient?.data?.code, updatePatientValues);
    else
      console.error(
        'The Patient: PatientDTO object must have a "code" property.'
      );
  };

  const [
    activityTransitionState,
    setActivityTransitionState,
  ] = useState<TActivityTransitionState>("IDLE");
  const [
    openConfirmationMessage,
    setOpenConfirmationMessage,
  ] = useState<boolean>(false);

  useEffect(() => {
    if (activityTransitionState === "TO_PATIENT") {
      getPatientThunk(id);
      updatePatientReset();
      setShouldResetForm(true);
    } else if (activityTransitionState === "TO_KEEP_EDITING") {
      setOpenConfirmationMessage(false);
    }
  }, [activityTransitionState, updatePatientReset, getPatientThunk, id]);

  useEffect(() => {
    setOpenConfirmationMessage(hasSucceeded);
  }, [hasSucceeded]);

  const infoBoxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (hasFailed) {
      scrollToElement(infoBoxRef.current);
    }
  }, [hasFailed]);

  const [shouldResetForm, setShouldResetForm] = useState(false);

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setActivityTransitionState("IDLE");
    scrollToElement(null);
  };

  switch (activityTransitionState) {
    case "TO_PATIENT":
      return <Redirect to={`/details/${patient.data?.code}`} />;
    default:
      return (
        <div className="editPatient">
          <AppHeader
            userCredentials={userCredentials}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="editPatient__background">
            <div className="editPatient__content">
              <div className="editPatient__title">
                {`${t("nav.editpatient")}: ${patient.data?.firstName} ${
                  patient.data?.secondName
                }`}
              </div>
              <PatientDataForm
                fields={updateFields(initialFields, patient?.data)}
                profilePicture={patient.data?.blobPhoto}
                onSubmit={onSubmit}
                submitButtonLabel={t("common.submit")}
                resetButtonLabel={t("common.reset")}
                isLoading={isLoading}
                shouldResetForm={shouldResetForm}
                resetFormCallback={resetFormCallback}
              />
            </div>
          </div>
          <div ref={infoBoxRef}>
            {hasFailed && (
              <InfoBox type="error" message={t("common.somethingwrong")} />
            )}
          </div>
          <ConfirmationDialog
            isOpen={openConfirmationMessage}
            title={t("common.titleedited")}
            icon={checkIcon}
            info={t("common.patienteditsuccessfull")}
            primaryButtonLabel={t("common.patient")}
            secondaryButtonLabel={t("common.keepediting")}
            handlePrimaryButtonClick={() =>
              setActivityTransitionState("TO_PATIENT")
            }
            handleSecondaryButtonClick={() =>
              setActivityTransitionState("TO_KEEP_EDITING")
            }
          />
          <Footer />
        </div>
      );
  }
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data,
  isLoading: state.patients.updatePatient.status === "LOADING",
  hasSucceeded: state.patients.updatePatient.status === "SUCCESS",
  hasFailed: state.patients.updatePatient.status === "FAIL",
  patient: state.patients.selectedPatient,
});

const mapDispatchToProps: IDispatchProps = {
  getPatientThunk,
  updatePatientReset,
  updatePatient,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPatientActivity);
