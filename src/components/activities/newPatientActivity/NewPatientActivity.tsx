import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { PatientDTO } from "../../../generated";
import {
  createPatient,
  createPatientReset,
} from "../../../state/patients/actions";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Button from "../../accessories/button/Button";
import Footer from "../../accessories/footer/Footer";
import PatientDataForm from "../../accessories/patientDataForm/PatientDataForm";
import SmallButton from "../../accessories/smallButton/SmallButton";
import TextButton from "../../accessories/textButton/TextButton";
import { initialValues } from "./consts";
import "./styles.scss";
import { IDispatchProps, IStateProps, TProps } from "./types";

const NewPatientActivity: FunctionComponent<TProps> = ({
  userCredentials,
  createPatient,
  createPatientReset,
  isLoading,
  hasSucceeded,
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
      <Dialog open={!!hasSucceeded}>
        <DialogTitle>
          <div className="dialog__title">Patient Created</div>
        </DialogTitle>
        <DialogContent>
          <div className="dialog__content">
            <div className="dialog__divider" />
            <div className="dialog__info">
              The patient registration was successful.
            </div>
            <div className="dialog__buttonSet">
              <div className="return_button">
                <SmallButton
                  type="button"
                  disabled={false}
                  onClick={handleDialogToDashboard}
                >
                  Dashboard
                </SmallButton>
              </div>
              <div className="reset_button">
                <TextButton onClick={handleDialogOnDismiss}>
                  Keep editing
                </TextButton>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data?.credentials,
  isLoading: state.patients.createPatient.isLoading,
  hasSucceeded: state.patients.createPatient.hasSucceeded,
});

const mapDispatchToProps: IDispatchProps = {
  createPatient,
  createPatientReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPatientActivity);
