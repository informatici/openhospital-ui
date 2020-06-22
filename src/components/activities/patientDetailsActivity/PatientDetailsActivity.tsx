import React, { FunctionComponent } from "react";
import { IState } from "../../../types";
import { connect } from "react-redux";
import { IStateProps, TProps } from "./types";
import AppHeader from "../../shared/appHeader/AppHeader";
import Footer from "../../shared/footer/Footer";
import profilePicturePlaceholder from "../../../assets/profilePicturePlaceholder.png";
import "./styles.scss";

const PatientDetailsActivity: FunctionComponent<TProps> = ({
  userCredentials,
  patients,
}) => {
  const breadcrumbMap = {
    Dashboard: "/dashboard",
    "Search Patient": "/search",
    "Patient Details": `/details/:id`, //TODO: use actual patient id instead
  };

  return (
    <div className="patientDetails">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="patientDetails__background">
        <div className="container">
          <div className="patientDetails__title">Patient Details</div>
          <div className="patientDetails__panel">
            <div className="patientDetails__personalData">
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
            <div className="patientDetails__content">
              <div className="patientDetils__content__header">HEADER</div>
              <div className="patientDetils__content__body">BODY</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => ({
  userCredentials: state.main.authentication.data?.credentials,
  patients: state.patients,
});

export default connect(mapStateToProps)(PatientDetailsActivity);
