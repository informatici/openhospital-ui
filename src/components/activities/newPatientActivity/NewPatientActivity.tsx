import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { IStateProps, TProps } from "./types";
import { IState } from "../../../types";
import AppHeader from "../../shared/appHeader/AppHeader";
import Footer from "../../shared/footer/Footer";
import PatientDataForm from "../../shared/patientDataForm/PatientDataForm";
import { initialValues } from "./consts";
import "./styles.scss";

const NewPatientActivity: FunctionComponent<TProps> = ({ userCredentials }) => {
  const handleSubmit = () => {};
  return (
    <div className="newPatient">
      <AppHeader userCredentials={userCredentials} />
      <div className="newPatient__background">
        <div className="col-sm-12 col-md-11 col-xs-11">
          <div className="newPatient__title">Register New Patient</div>
          <PatientDataForm
            initialValues={initialValues}
            handleSubmit={handleSubmit}
            submitButtonLabel="Submit"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.userCredentials,
});

export default connect(mapStateToProps)(NewPatientActivity);
