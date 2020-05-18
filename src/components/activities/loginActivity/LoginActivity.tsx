import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { IState } from "../../../types";
import { TProps, IStateProps } from "./types";

const LoginActivity: FunctionComponent<TProps> = ({ userCredentials }) => {
  return <div>YOU'RE AT LOGIN_ACTIVITY</div>;
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.userCredentials,
});

export default connect(mapStateToProps)(LoginActivity);
