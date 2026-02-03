import { useAppSelector } from "libraries/hooks/redux";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router";
import PlusIcon from "../../../assets/PlusIcon";
import SearchIcon from "../../../assets/SearchIcon";
import { PATHS } from "../../../consts";
import { Permission } from "../../../libraries/permissionUtils/Permission";
import { usePermission } from "../../../libraries/permissionUtils/usePermission";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import LargeButton from "../../accessories/largeButton/LargeButton";
import "./styles.scss";
import { IOwnProps, TActivityTransitionState } from "./types";

const PatientDashboardActivity: FC<IOwnProps> = ({
  newPatientRoute,
  searchPatientRoute,
}) => {
  const { t } = useTranslation();

  const { userCredentials } = useAppSelector((state) => ({
    userCredentials: state.main.authentication.data,
  }));

  const breadcrumbMap = {
    [t("nav.patients")]: PATHS.patients,
  };

  const canCreate = usePermission("patients.create");

  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

  switch (activityTransitionState) {
    case "TO_NEW_PATIENT":
      return <Navigate to={newPatientRoute} />;
    case "TO_SEARCH_PATIENT":
      return <Navigate to={searchPatientRoute} />;
    default:
      return (
        <div data-cy="dashboard-activity" className="dashboard">
          <AppHeader
            userCredentials={userCredentials ? userCredentials : {}}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="dashboard__background">
            <Permission require="patients.access">
              <div className="dashboard__greeter">
                <span className="user-welcome">
                  {t("dashboard.welcomename")}
                </span>
                {userCredentials?.username ? (
                  <strong className="user-name">
                    &nbsp;{userCredentials?.username}
                  </strong>
                ) : null}
              </div>
              <div className="dashboard__actions">
                {canCreate && (
                  <div className="dashboard__actions__button">
                    <LargeButton
                      handleClick={() =>
                        setActivityTransitionState("TO_NEW_PATIENT")
                      }
                    >
                      <div className="largeButton__inner">
                        <PlusIcon />
                        <div className="largeButton__inner__label">
                          {t("dashboard.newpatient")}
                        </div>
                      </div>
                    </LargeButton>
                  </div>
                )}
                <div className="dashboard__actions__button">
                  <LargeButton
                    handleClick={() =>
                      setActivityTransitionState("TO_SEARCH_PATIENT")
                    }
                  >
                    <div className="largeButton__inner">
                      <SearchIcon width="43" height="43" />
                      <div className="largeButton__inner__label">
                        {t("dashboard.searchpatients")}
                      </div>
                    </div>
                  </LargeButton>
                </div>
              </div>
            </Permission>
          </div>
          <Footer />
        </div>
      );
  }
};

export default PatientDashboardActivity;
