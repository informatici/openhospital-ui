import React, { FunctionComponent, useState } from "react";
import { IState } from "../../../types";
import { connect } from "react-redux";
import { IStateProps, TProps } from "./types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import profilePicturePlaceholder from "../../../assets/profilePicturePlaceholder.png";
import "./styles.scss";
import classNames from "classnames";
import Tabs from "../../accessories/tabs/Tabs";
import { patientDetailTabs } from "./tabsConfig";

const PatientDetailsActivity: FunctionComponent<TProps> = ({
  userCredentials,
  patient,
}) => {
  const breadcrumbMap = {
    Dashboard: "/dashboard",
    "Search Patient": "/search",
    "Patient Details": `/details/:id`, //TODO: use actual patient id instead
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="patientDetails">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="patientDetails__background">
        <div className="container">
          <div className="patientDetails__panel">
            <div
              className={classNames("patientDetails__personalData", {
                open_sidebar: isOpen,
              })}
            >
              <div
                className="patientDetails__personalData__trigger_mobile"
                onClick={() => setIsOpen(!isOpen)}
              >
                Antonio Carlos
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrow_icon"
                  data-name="Layer 1"
                  viewBox="0 0 24 30"
                  x="0px"
                  y="0px"
                >
                  <polygon points="12 17.02 4.08 9.1 5.5 7.69 12 14.19 18.5 7.69 19.92 9.1 12 17.02" />
                </svg>
              </div>
              <div className="patientDetails__personalData_sidebar">
                <div className="patientDetails__profilePictureContainer">
                  <img src={profilePicturePlaceholder} alt="profilePicture" />
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Name:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    Antonio Carlos
                  </div>
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Surname:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    Jobim
                  </div>
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Gender:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    Male
                  </div>
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Blood Type:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    A+
                  </div>
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Patient ID:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    012345679
                  </div>
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Provenience:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    Rio de Janeiro
                  </div>
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Tax number:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    ADS2fa2SDA1234afas1
                  </div>
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Health Insurance:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    Some Company Name, Inc
                  </div>
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Telephone number:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    222 222 2222
                  </div>
                </div>
              </div>
            </div>
            <div className="patientDetails__content">
              <Tabs {...patientDetailTabs} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data,
  patient: state.patients.selectedPatient,
});

export default connect(mapStateToProps)(PatientDetailsActivity);
