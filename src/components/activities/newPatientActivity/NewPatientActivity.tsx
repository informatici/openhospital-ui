import React from "react";
import { connect } from "react-redux";
import { IStateProps } from "./types";
import { IState } from "../../../types";

const NewPatientActivity = () => {
  return <div className="newPatient">YOU ARE AT NEW PATIENT ACTIVITY</div>;
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.userCredentials,
});

export default connect(mapStateToProps)(NewPatientActivity);
