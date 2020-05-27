import React, { FunctionComponent } from "react";
import { IState } from "../../../types";
import { connect } from "react-redux";
import { IStateProps, TProps } from "./types";

const DashboardActivity: FunctionComponent<TProps> = ({ userCredentials }) => {
  return <div>YOU'RE AT DASHBOARD_ACTIVITY</div>;
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.userCredentials,
});

export default connect(mapStateToProps)(DashboardActivity);
