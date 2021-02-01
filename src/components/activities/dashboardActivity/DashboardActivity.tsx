import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import PlusIcon from "../../../assets/PlusIcon";
import SearchIcon from "../../../assets/SearchIcon";
import { AUTH_KEY } from "../../../consts";
import { SessionStorage } from "../../../libraries/storage/storage";
import { setAuthenticationSuccess } from "../../../state/main/actions";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import LargeButton from "../../accessories/largeButton/LargeButton";
import "./styles.scss";
import { IStateProps, TProps, TActivityTransitionState, IDispatchProps } from "./types";

const DashboardActivity: FunctionComponent<TProps> = ({
  userCredentials,
  newPatientRoute,
  setAuthenticationSuccess,
  searchPatientRoute,
}) => {
  const breadcrumbMap = {
    Dashboard: "/",
  };

  useEffect(() => {
    if (!userCredentials) {
      const userCredentialsLocal = SessionStorage.read(AUTH_KEY);
      if (userCredentialsLocal) {
        setAuthenticationSuccess(userCredentialsLocal);
      }
    }
  }, [userCredentials, setAuthenticationSuccess]);

  const [activityTransitionState, setActivityTransitionState] = useState<
    TActivityTransitionState
  >("IDLE");

  switch (activityTransitionState) {
    case "TO_NEW_PATIENT":
      return <Redirect to={newPatientRoute} />;
    case "TO_SEARCH_PATIENT":
      return <Redirect to={searchPatientRoute} />;
    default:
      return (
        <div className="dashboard">
          <AppHeader
            userCredentials={userCredentials ? userCredentials : {}}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="dashboard__background">
            <div className="dashboard__greeter">
              Welcome <strong>{userCredentials?.displayName}</strong>
            </div>
            <div className="dashboard__actions">
              <div className="dashboard__actions__button">
                <LargeButton
                  handleClick={() =>
                    setActivityTransitionState("TO_NEW_PATIENT")
                  }
                >
                  <div className="largeButton__inner">
                    <PlusIcon />
                    <div className="largeButton__inner__label">
                      Register New Patient
                    </div>
                  </div>
                </LargeButton>
              </div>
              <div className="dashboard__actions__button">
                <LargeButton
                  handleClick={() =>
                    setActivityTransitionState("TO_SEARCH_PATIENT")
                  }
                >
                  <div className="largeButton__inner">
                    <SearchIcon width="43" height="43" />
                    <div className="largeButton__inner__label">
                      Search Patients
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

const mapDispatchToProps: IDispatchProps = {
  setAuthenticationSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardActivity);
