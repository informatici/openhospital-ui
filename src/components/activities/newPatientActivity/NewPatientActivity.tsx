import { useT } from "@transifex/react";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import checkIcon from "../../../assets/check-icon.png";
import { PatientDTO } from "../../../generated";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import {
  createPatient,
  createPatientReset,
} from "../../../state/patients/actions";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import ConfirmationDialog from "../../accessories/confirmationDialog/ConfirmationDialog";
import Footer from "../../accessories/footer/Footer";
import InfoBox from "../../accessories/infoBox/InfoBox";
import PatientDataForm from "../../accessories/patientDataForm/PatientDataForm";
import { initialFields } from "./consts";
import "./styles.scss";
import {
  IDispatchProps,
  IStateProps,
  TActivityTransitionState,
  TProps,
} from "./types";

const NewPatientActivity: FunctionComponent<TProps> = ({
  userCredentials,
  createPatient,
  createPatientReset,
  isLoading,
  hasSucceeded,
  hasFailed,
  dashboardRoute,
}) => {
  const newPatientPath = useT("New Patient", {});
  const breadcrumbMap = {
    Dashboard: "/",
    [newPatientPath]: "/new",
  };

  const onSubmit = (patient: PatientDTO) => {
    createPatient(patient);
  };

  const [activityTransitionState, setActivityTransitionState] = useState<
    TActivityTransitionState
  >("IDLE");

  useEffect(() => {
    if (
      activityTransitionState === "TO_NEW_PATIENT_RESET" ||
      activityTransitionState === "TO_DASHBOARD"
    ) {
      createPatientReset();
      setShouldResetForm(true);
    }
  }, [activityTransitionState, createPatientReset]);

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

  const submitButtonLabel = useT('submit', {});
  const clearButtonLabel = useT('Clear All', {});
  const errorLabel = useT('Something went wrong, please retry later.', {});
  const patientLabel = useT('Patient Created', {});
  const successLabel = useT('The patient registration was successful.', {});
  const dashboardLabel = useT('Dashboard', {});
  const editingLabel = useT('Keep editing', {});
  const newPatientLabel = useT('Register new patient', {});

  switch (activityTransitionState) {
    case "TO_DASHBOARD":
      return <Redirect to={dashboardRoute} />;
    default:
      return (
        <div className="newPatient">
          <AppHeader
            userCredentials={userCredentials}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="newPatient__background">
            <div className="newPatient__content">
              <div className="newPatient__title">{newPatientLabel}</div>
              <PatientDataForm
                fields={initialFields}
                onSubmit={onSubmit}
                submitButtonLabel={submitButtonLabel}
                resetButtonLabel={clearButtonLabel}
                isLoading={isLoading}
                shouldResetForm={shouldResetForm}
                resetFormCallback={resetFormCallback}
              />
            </div>
          </div>
          <div ref={infoBoxRef}>
            {hasFailed && (
              <InfoBox
                type="error"
                message={errorLabel}
              />
            )}
          </div>
          <ConfirmationDialog
            isOpen={hasSucceeded}
            title={patientLabel}
            icon={checkIcon}
            info={successLabel}
            primaryButtonLabel={dashboardLabel}
            secondaryButtonLabel={editingLabel}
            handlePrimaryButtonClick={() =>
              setActivityTransitionState("TO_DASHBOARD")
            }
            handleSecondaryButtonClick={() =>
              setActivityTransitionState("TO_NEW_PATIENT_RESET")
            }
          />
          <Footer />
        </div>
      );
  }
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data,
  isLoading: state.patients.createPatient.status === "LOADING",
  hasSucceeded: state.patients.createPatient.status === "SUCCESS",
  hasFailed: state.patients.createPatient.status === "FAIL",
});

const mapDispatchToProps: IDispatchProps = {
  createPatient,
  createPatientReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPatientActivity);
