import React, { FunctionComponent } from "react";
import { IState } from "../../../types";
import { connect } from "react-redux";
import { IStateProps } from "./types";

const DashboardActivity: FunctionComponent = () => {
  return <div>YOU'RE AT DASHBOARD_ACTIVITY</div>;
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.userCredentials,
});

export default connect(mapStateToProps)(DashboardActivity);
