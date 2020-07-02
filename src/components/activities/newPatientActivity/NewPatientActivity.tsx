import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { IStateProps, TProps, IDispatchProps } from "./types";
import { IState } from "../../../types";
import AppHeader from "../../shared/appHeader/AppHeader";
import Footer from "../../shared/footer/Footer";
import PatientDataForm from "../../shared/patientDataForm/PatientDataForm";
import { initialValues } from "./consts";
import { createPatient } from "../../../state/patients/actions";
import "./styles.scss";
import { PatientDTO } from "../../../generated";

const NewPatientActivity: FunctionComponent<TProps> = ({
  userCredentials,
  createPatient,
}) => {
  const breadcrumbMap = {
    Dashboard: "/dashboard",
    "New Patient": "/new",
  };

  const onSubmit = (patient: PatientDTO) => {
    createPatient(patient);
  };

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
            submitButtonLabel="Submit"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data?.credentials,
});

const mapDispatchToProps: IDispatchProps = {
  createPatient,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPatientActivity);
