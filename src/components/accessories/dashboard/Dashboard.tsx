import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { IState } from "../../../types";
import AppHeader from "../appHeader/AppHeader";
import Footer from "../footer/Footer";
import { DashboardContent } from "./dashboardContent/DashboardContent";
import "./styles.scss";
import { IStateProps, TProps } from "./types";
import { Chart, registerables } from "chart.js";
import { Permission } from "../../../libraries/permissionUtils/Permission";

Chart.register(...registerables);

const Dashboard: FunctionComponent<TProps> = ({ userCredentials }) => {
  const { t } = useTranslation();
  const breadcrumbMap = {
    [t("nav.dashboard")]: "",
  };

  return (
    <div className="dashboard">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="dashboard__background">
        <Permission require="dashboard.access">
          <DashboardContent />
        </Permission>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data,
});

export default connect(mapStateToProps)(Dashboard);
