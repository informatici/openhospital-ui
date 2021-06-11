import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.newpatient")]: "/new",
  };

  const onSubmit = (patient: PatientDTO) => {
    createPatient(patient);
  };

  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

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
              <div className="newPatient__title">{t("nav.newpatient")}</div>
              <PatientDataForm
                fields={initialFields}
                onSubmit={onSubmit}
                submitButtonLabel={t("common.submit")}
                resetButtonLabel={t("common.clearall")}
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
            isOpen={hasSucceeded}
            title="Patient Created"
            icon={checkIcon}
            info={t("common.patientregistrationsuccessfull")}
            primaryButtonLabel={t("common.dashboard")}
            secondaryButtonLabel={t("common.keepediting")}
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
