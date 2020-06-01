import React, { FunctionComponent } from "react";
import { IState } from "../../../types";
import { connect } from "react-redux";
import { IStateProps, TProps } from "./types";
import AppHeader from "../../shared/appHeader/AppHeader";
import Footer from "../../shared/footer/Footer";
import LargeButton from "../../shared/largeButton/LargeButton";
import "./styles.scss";
import PlusIcon from "../../../assets/PlusIcon";
import LargeSearchIcon from "../../../assets/LargeSearchIcon";

const DashboardActivity: FunctionComponent<TProps> = ({
  userCredentials,
  newPatientRoute,
  searchPatientRoute,
}) => {
  const { name, surname } = userCredentials;

  const largeButtonHandleClick = (route: string) => () => {
    window.location.href = route;
  };

  return (
    <div className="dashboard">
      <AppHeader userCredentials={userCredentials} />
      <div className="dashboard__background">
        <div className="dashboard__greeter">
          Welcome {name} {surname}
        </div>
        <div className="dashboard__actions">
          <div className="dashboard__actions__button">
            <LargeButton handleClick={largeButtonHandleClick(newPatientRoute)}>
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
              handleClick={largeButtonHandleClick(searchPatientRoute)}
            >
              <div className="largeButton__inner">
                <LargeSearchIcon />
                <div className="largeButton__inner__label">Search Patients</div>
              </div>
            </LargeButton>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.userCredentials,
});

export default connect(mapStateToProps)(DashboardActivity);
