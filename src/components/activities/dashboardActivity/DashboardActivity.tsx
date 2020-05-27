import React, { FunctionComponent } from "react";
import { IState } from "../../../types";
import { connect } from "react-redux";
import { IStateProps, TProps } from "./types";
import AppHeader from "../../shared/appHeader/AppHeader";
import Footer from "../../shared/footer/Footer";

const DashboardActivity: FunctionComponent<TProps> = ({ userCredentials }) => {
  return (
    <div className="dashboard">
      <AppHeader userCredentials={userCredentials} />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.userCredentials,
});

export default connect(mapStateToProps)(DashboardActivity);
