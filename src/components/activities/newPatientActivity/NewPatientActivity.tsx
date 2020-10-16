import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import checkIcon from "../../../assets/check-icon.png";
import failIcon from "../../../assets/fail-icon.png";
import { PatientDTO } from "../../../generated";
import {
  createPatient,
  createPatientReset,
} from "../../../state/patients/actions";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import ConfirmationDialog from "../../accessories/confirmationDialog/ConfirmationDialog";
import Footer from "../../accessories/footer/Footer";
import PatientDataForm from "../../accessories/patientDataForm/PatientDataForm";
import { initialValues } from "./consts";
import "./styles.scss";
import { IDispatchProps, IStateProps, TProps } from "./types";

const NewPatientActivity: FunctionComponent<TProps> = ({
  userCredentials,
  createPatient,
  createPatientReset,
  isLoading,
  hasSucceeded,
  hasFailed,
}) => {
  const breadcrumbMap = {
    Dashboard: "/dashboard",
    "New Patient": "/new",
  };

  const onSubmit = (patient: PatientDTO) => {
    createPatient(patient);
  };

  const handleDialogOnDismiss = () => {
    //TODO: should reset values and profilePicture
    createPatientReset();
    window.location.href = "/new";
  };

  const handleDialogToDashboard = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="newPatient">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="newPatient__background">
        <div className="newPatient__content">
          <div className="newPatient__title">Register new patient</div>
          <PatientDataForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            submitButtonLabel="submit"
            isLoading={isLoading}
          />
        </div>
      </div>
      <ConfirmationDialog
        isOpen={hasSucceeded}
        title="Patient Created"
        icon={checkIcon}
        info="The patient registration was successful."
        primaryButtonLabel="Dashboard"
        secondaryButtonLabel="Keep editing"
        handlePrimaryButtonClick={handleDialogToDashboard}
        handleSecondaryButtonClick={handleDialogOnDismiss}
      />
      <ConfirmationDialog
        isOpen={hasFailed}
        title="Failed"
        icon={failIcon}
        info="The patient registration was not possible."
        primaryButtonLabel="Dashboard"
        secondaryButtonLabel="Keep editing"
        handlePrimaryButtonClick={handleDialogToDashboard}
        handleSecondaryButtonClick={handleDialogOnDismiss}
      />
      <Footer />
    </div>
  );
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
