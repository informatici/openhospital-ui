import classNames from "classnames";
import isEmpty from "lodash.isempty";
import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { getPatientThunk } from "../../../state/patients/actions";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import { ProfilePicture } from "../../accessories/profilePicture/ProfilePicture";
import Tabs from "../../accessories/tabs/Tabs";
import "./styles.scss";
import { patientDetailTabs } from "./tabsConfig";
import { IDispatchProps, IStateProps, TProps } from "./types";

const PatientDetailsActivity: FunctionComponent<TProps> = ({
  userCredentials,
  patient,
  getPatientThunk,
}) => {
  useEffect(() => {
    scrollToElement(null);
  }, []);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (isEmpty(patient.data) && patient.status === "IDLE") {
      getPatientThunk(id);
    }
  }, [patient, id, getPatientThunk]);

  const breadcrumbMap = {
    Dashboard: "/dashboard",
    "Search Patient": "/search",
    "Patient Details": `/details/${patient.data?.code}`,
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
                  <ProfilePicture
                    isEditable={false}
                    preLoadedPicture={patient.data?.blobPhoto}
                  />
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Name:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    {patient.data?.firstName}
                  </div>
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Surname:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    {patient.data?.secondName}
                  </div>
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Gender:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    {patient.data?.sex}
                  </div>
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Blood Type:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    {patient.data?.bloodType}
                  </div>
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Patient ID:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    {patient.data?.code}
                  </div>
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Provenience:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    {patient.data?.city}
                  </div>
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Tax number:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    {patient.data?.taxCode}
                  </div>
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Health Insurance:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    {patient.data?.hasInsurance}
                  </div>
                </div>
                <div className="patientDetails__personalData__item">
                  <div className="patientDetails__personalData__item__label">
                    Telephone number:
                  </div>
                  <div className="patientDetails__personalData__item__value">
                    {patient.data?.telephone}
                  </div>
                </div>
              </div>
            </div>
            <div className="patientDetails__content">
              <Tabs config={patientDetailTabs} />
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

const mapDispatchToProps: IDispatchProps = {
  getPatientThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientDetailsActivity);
