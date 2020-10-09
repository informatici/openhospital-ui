import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { IStateProps, TProps, IDispatchProps } from "./types";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import PatientDataForm from "../../accessories/patientDataForm/PatientDataForm";
import { initialValues } from "./consts";
import {
  createPatient,
  createPatientReset,
} from "../../../state/patients/actions";
import "./styles.scss";
import { PatientDTO } from "../../../generated";

const NewPatientActivity: FunctionComponent<TProps> = ({
  userCredentials,
  createPatient,
  // createPatientReset,
  // isLoading,
  hasSucceeded,
}) => {
  const breadcrumbMap = {
    Dashboard: "/dashboard",
    "New Patient": "/new",
  };

  const onSubmit = (patient: PatientDTO) => {
    createPatient(patient);
  };

  useEffect(() => {
    if (hasSucceeded) {
      //TODO: show confirmation dialog
    }
  }, [hasSucceeded]);

  // const handleDialogButtonClick = () => {
  //   //TODO: should reset createPatient and values, and close dialog
  // };

  return (
    <div className="newPatient">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="newPatient__background">
        <div>
          <div className="newPatient__title">Register New Patient</div>
          <PatientDataForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            submitButtonLabel="submit"
          />
        </div>
      </div>
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
