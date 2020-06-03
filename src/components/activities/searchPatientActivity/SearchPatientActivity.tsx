import React, { FunctionComponent } from "react";
import { IState } from "../../../types";
import { connect } from "react-redux";
import { IStateProps, TProps } from "./types";

const SearchPatientActivity: FunctionComponent<TProps> = ({
  userCredentials,
}) => {
  return <div>YOU'RE AT SEARCH ACTIVITY</div>;
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.userCredentials,
});

export default connect(mapStateToProps)(SearchPatientActivity);
