import { Chart, registerables } from "chart.js";
import { useAppSelector } from "libraries/hooks/redux";
import React from "react";
import { useTranslation } from "react-i18next";
import { Permission } from "../../../libraries/permissionUtils/Permission";
import AppHeader from "../appHeader/AppHeader";
import Footer from "../footer/Footer";
import { DashboardContent } from "./dashboardContent/DashboardContent";
import "./styles.scss";

Chart.register(...registerables);

const Dashboard = () => {
  const { t } = useTranslation();

  const { userCredentials } = useAppSelector((state) => ({
    userCredentials: state.main.authentication.data,
  }));

  const breadcrumbMap = {
    [t("nav.dashboard")]: "",
  };

  return (
    <div data-cy="dashboard" className="dashboard">
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

export default Dashboard;
