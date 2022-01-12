import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import SearchIcon from "../../../assets/SearchIcon";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import LargeButton from "../../accessories/largeButton/LargeButton";
import "./styles.scss";
import { IStateProps, TProps, TActivityTransitionState } from "./types";

const PharmacyActivity: FunctionComponent<TProps> = ({
  userCredentials,
  medicalsRoute,
}) => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.pharmaceuticals")]: "/Medicals",
  };

  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

  switch (activityTransitionState) {
    case "TO_MEDICALS":
      return <Redirect to={medicalsRoute} />;
    default:
      return (
        <div className="dashboard">
          <AppHeader
            userCredentials={userCredentials ? userCredentials : {}}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="dashboard__background">
            <div className="dashboard__greeter">
              <span className="user-welcome">{t("dashboard.welcomename")}</span>
              {userCredentials?.displayName ? (
                <strong className="user-name">
                  &nbsp;{userCredentials?.displayName}
                </strong>
              ) : null}
            </div>
            <div className="dashboard__actions">
              <div className="dashboard__actions__button">
                <LargeButton
                  handleClick={() => setActivityTransitionState("TO_MEDICALS") }
                >
                  <div className="largeButton__inner">
                    <SearchIcon width="43" height="43" />
                    <div className="largeButton__inner__label">
                      {t("pharmacy.pharmaceuticals")}
                    </div>
                  </div>
                </LargeButton>
              </div>
              <div className="dashboard__actions__button">
                <LargeButton
                  handleClick={() => { }}
                >
                  <div className="largeButton__inner">
                    <SearchIcon width="43" height="43" />
                    <div className="largeButton__inner__label">
                      {t("pharmacy.pharmaceuticalstock")}
                    </div>
                  </div>
                </LargeButton> 
              </div>
              <div className="dashboard__actions__button">
                <LargeButton
                  handleClick={() =>
                    setActivityTransitionState("TO_MEDICAL_STOCK_WARD")
                  }
                >
                  <div className="largeButton__inner">
                    <SearchIcon width="43" height="43" />
                    <div className="largeButton__inner__label">
                      {t("pharmacy.pharmaceuticalstockward")}
                    </div>
                  </div>
                </LargeButton> 
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
  }
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data,
});

export default connect(mapStateToProps)(PharmacyActivity);
