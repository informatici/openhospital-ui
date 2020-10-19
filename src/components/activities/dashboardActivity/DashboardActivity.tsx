import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import PlusIcon from "../../../assets/PlusIcon";
import SearchIcon from "../../../assets/SearchIcon";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import LargeButton from "../../accessories/largeButton/LargeButton";
import "./styles.scss";
import { IStateProps, TProps, TRouteActionState } from "./types";

const DashboardActivity: FunctionComponent<TProps> = ({
  userCredentials,
  newPatientRoute,
  searchPatientRoute,
}) => {
  const breadcrumbMap = {
    Dashboard: "/dashboard",
  };

  const [routeActionState, setRouteActionState] = useState<TRouteActionState>(
    "IDLE"
  );

  switch (routeActionState) {
    case "IDLE":
      return (
        <div className="dashboard">
          <AppHeader
            userCredentials={userCredentials ? userCredentials : {}}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="dashboard__background">
            <div className="dashboard__greeter">
              Welcome {userCredentials?.displayName}
            </div>
            <div className="dashboard__actions">
              <div className="dashboard__actions__button">
                <LargeButton
                  handleClick={() => setRouteActionState("TO_NEW_PATIENT")}
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
                  handleClick={() => setRouteActionState("TO_SEARCH_PATIENT")}
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
    case "TO_NEW_PATIENT":
      return <Redirect to={newPatientRoute} />;
    case "TO_SEARCH_PATIENT":
      return <Redirect to={searchPatientRoute} />;
  }
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data,
});

export default connect(mapStateToProps)(DashboardActivity);
