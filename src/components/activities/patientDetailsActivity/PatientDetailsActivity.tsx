import classNames from "classnames";
import isEmpty from "lodash.isempty";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  EditRounded,
  Assignment,
  Payment,
  LocalHotel,
  LocalHospital,
  Person,
  Notes,
} from "@material-ui/icons";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { useParams } from "react-router-dom";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { getPatientThunk } from "../../../state/patients/actions";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import { TTabConfig } from "../../accessories/tabs/types";
import PatientOPD from "../../accessories/patientOPD/patientOPD";
import PatientTriage from "../../accessories/patientTriage/PatientTriage";
import PatientSummary from "../../accessories/patientSummary/PatientSummary";
import PatientDetailsContent from "../patientDetailsActivityContent/PatientDetailsActivityContent";
import { ProfilePicture } from "../../accessories/profilePicture/ProfilePicture";
import Arrow from "../../../assets/arrow-w.svg";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../accessories/accordion/Accordion";
import RouterTabs from "../../accessories/tabs/RouterTabs";
import {
  IDispatchProps,
  IStateProps,
  TProps,
  IUserSection,
  TActivityTransitionState,
} from "./types";
import { IState } from "../../../types";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import PatientTherapy from "../../accessories/patientTherapy/PatientTherapy";
import PatientBooking from "../../accessories/patientBooking/PatientBooking";
import PatientExams from "../../accessories/patientExams/PatientExams";
import Button from "../../accessories/button/Button";
import PatientAdmission from "../../accessories/admission/PatientAdmission";
import PatientAdmissionBooking from "../../accessories/admissionBooking/PatientAdmissionBooking";
import SkeletonLoader from "../../accessories/skeletonLoader/SkeletonLoader";
import PatientNewBill from "../../accessories/patientNewBill/PatientNewBill";
import BillRecords from "../../accessories/billrecords/BillRecords";

const PatientDetailsActivity: FunctionComponent<TProps> = ({
  userCredentials,
  patient,
  getPatientThunk,
}) => {
  useEffect(() => {
    scrollToElement(null);
  }, []);

  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (isEmpty(patient.data) && patient.status === "IDLE") {
      getPatientThunk(id);
    }
  }, [patient, id, getPatientThunk]);

  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.searchpatient")]: "/search",
    [t("nav.patientdashboard")]: `/details/${patient.data?.code}`,
  };

  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [userSection, setUserSection] = useState<IUserSection>("clinic");
  const [defaultRoute, setDefaultRoute] = useState("/summary");

  const admissionsConfig: TTabConfig = [
    {
      label: t("nav.admission"),
      path: "/admission",
      content: (
        <PatientDetailsContent title="Admission" content={PatientAdmission} />
      ),
    },
    {
      label: t("nav.booking"),
      path: "/booking",
      content: (
        <PatientDetailsContent title="Booking" content={PatientAdmissionBooking} />
      ),
    },
    {
      label: t("nav.surgicalrecord"),
      path: "/surgicalRecord",
      content: (
        <PatientDetailsContent
          title="SurgicalRecord"
          content={SkeletonLoader}
        />
      ),
    },
  ];

  const examConfig: TTabConfig = [
    {
      label: t("nav.exams"),
      path: "/exams",
      content: <PatientDetailsContent title="Exams" content={PatientExams} />,
    },
  ];
  const clinicConfig: TTabConfig = [
    {
      label: t("nav.summary"),
      path: "/summary",
      content: (
        <PatientDetailsContent title="Summary" content={PatientSummary} />
      ),
    },
    {
      label: t("nav.opd"),
      path: "/OPD",
      content: <PatientDetailsContent title="OPD" content={PatientOPD} />,
    },
    {
      label: t("nav.triage"),
      path: "/triage",
      content: <PatientDetailsContent title="Triage" content={PatientTriage} />,
    },
    {
      label: t("nav.therapy"),
      path: "/therapy",
      content: (
        <PatientDetailsContent title="Therapy" content={PatientTherapy} />
      ),
    },

    {
      label: t("nav.booking"),
      path: "/booking",
      content: (
        <PatientDetailsContent title="Booking" content={PatientBooking} />
      ),
    },
  ];
  const defaultConfig: TTabConfig = [
    {
      label: t("nav.summary"),
      path: "/summary",
      content: (
        <PatientDetailsContent title="Default" content={SkeletonLoader} />
      ),
    },
  ];

  const billingConfig: TTabConfig = [
    {
      label: t("nav.newbill"),
      path: "/newbill",
      content: (
        <PatientDetailsContent
          title={t("nav.newbill")}
          content={PatientNewBill}
        />
      ),
    },
    {
      label: t("nav.billsrecords"),
      path: "/billsrecord",
      content: (
        <PatientDetailsContent
          title={t("nav.billsrecords")}
          content={BillRecords}
        />
      ),
    },
  ];

  const handleOnExpanded = (section: string) => {
    setExpanded(section === expanded ? false : section);
  };

  const getRouteConfig = () => {
    switch (userSection) {
      case "admissions":
        return admissionsConfig;
      case "exams":
        return examConfig;
      case "billing":
        return billingConfig;
      case "clinic":
        return clinicConfig;
      default:
        return defaultConfig;
    }
  };

  const isActive = (value: string) => {
    return value === userSection ? "active" : "default";
  };

  switch (activityTransitionState) {
    case "TO_PATIENT_EDITING":
      return <Redirect to={`/details/${patient.data?.code}/edit`} />;
    default:
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
                    {patient.data?.firstName || "-"}
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
                    <div className="patientDetails__personalData_sidebar_header">
                      <div className="patientDetails__profilePictureContainer_wrapper">
                        <div className="patientDetails__profilePictureContainer">
                          <ProfilePicture
                            isEditable={false}
                            preLoadedPicture={patient.data?.blobPhoto}
                          />
                        </div>
                        <div className="patientDetails__header__info">
                          <div className="patientDetails__header__info__item">
                            {patient.data?.firstName || "-"}
                          </div>
                          <div className="patientDetails__header__info__item">
                            <strong>{patient.data?.secondName || "-"}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="patientDetails__personalData_edit_button_wrapper">
                      <div className="patientDetails__personalData_edit_button">
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            setActivityTransitionState("TO_PATIENT_EDITING")
                          }
                        >
                          <EditRounded
                            fontSize="small"
                            style={{ color: "white" }}
                          />
                          <span>{t("patient.titleedit")}</span>
                        </Button>
                      </div>
                    </div>

                    <div className="patientDetails__main_menu">
                      <h6>{t("patient.usersections")}</h6>

                      <div
                        className={
                          "patientDetails__main_menu__item " +
                          isActive("admissions")
                        }
                        onClick={() => {
                          setUserSection("admissions");
                          setDefaultRoute("/admission");
                        }}
                      >
                        <LocalHotel
                          fontSize="small"
                          style={{
                            color: "white",
                          }}
                        />
                        <span>{t("patient.admissions")}:</span>
                        <img
                          src={Arrow}
                          className="icon_toggle"
                          alt="Accordion toogle"
                        />
                      </div>

                      <div
                        className={
                          "align__element patientDetails__main_menu__item " +
                          isActive("exams")
                        }
                        onClick={() => {
                          setUserSection("exams");
                          setDefaultRoute("/exams");
                        }}
                      >
                        <Assignment
                          fontSize="small"
                          style={{ color: "white" }}
                        />
                        <span>{t("patient.userexams")}:</span>
                        <img
                          src={Arrow}
                          className="icon_toggle"
                          alt="Accordion toogle"
                        />
                      </div>
                      <div
                        className={
                          "align__element patientDetails__main_menu__item " +
                          isActive("billing")
                        }
                        onClick={() => {
                          setUserSection("billing");
                          setDefaultRoute("/newbill");
                        }}
                      >
                        <Payment fontSize="small" style={{ color: "white" }} />
                        <span>{t("patient.userbilling")}</span>
                        <img
                          src={Arrow}
                          className="icon_toggle"
                          alt="Accordion toogle"
                        />
                      </div>
                      <div
                        className={
                          "align__element patientDetails__main_menu__item " +
                          isActive("clinic")
                        }
                        onClick={() => {
                          setUserSection("clinic");
                          setDefaultRoute("/summary");
                        }}
                      >
                        <LocalHospital
                          fontSize="small"
                          style={{ color: "white" }}
                        />
                        <span>{t("patient.userclinic")}</span>
                        <img
                          src={Arrow}
                          className="icon_toggle"
                          alt="Accordion toogle"
                        />
                      </div>
                    </div>

                    <div className="patientDetails__user_info">
                      <h6>{t("patient.userinfo")}</h6>
                      <Accordion expanded={expanded === "panel_1"}>
                        <AccordionSummary
                          onClick={() => handleOnExpanded("panel_1")}
                        >
                          <Person fontSize="small" style={{ color: "white" }} />
                          <span>{t("patient.personaldata")}</span>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="patientDetails__personalData__item">
                            <div className="patientDetails__personalData__item__label">
                              {t("patient.sex")}:
                            </div>
                            <div className="patientDetails__personalData__item__value">
                              {patient.data?.sex || "-"}
                            </div>
                          </div>
                          <div className="patientDetails__personalData__item">
                            <div className="patientDetails__personalData__item__label">
                              {t("patient.bloodtype")}:
                            </div>
                            <div className="patientDetails__personalData__item__value">
                              {patient.data?.bloodType || "-"}
                            </div>
                          </div>
                          <div className="patientDetails__personalData__item">
                            <div className="patientDetails__personalData__item__label">
                              {t("patient.patientID")}:
                            </div>
                            <div className="patientDetails__personalData__item__value">
                              {patient.data?.code || "-"}
                            </div>
                          </div>
                          <div className="patientDetails__personalData__item">
                            <div className="patientDetails__personalData__item__label">
                              {t("patient.city")}:
                            </div>
                            <div className="patientDetails__personalData__item__value">
                              {patient.data?.city || "-"}
                            </div>
                          </div>
                          <div className="patientDetails__personalData__item">
                            <div className="patientDetails__personalData__item__label">
                              {t("patient.taxcode")}:
                            </div>
                            <div className="patientDetails__personalData__item__value">
                              {patient.data?.taxCode || "-"}
                            </div>
                          </div>
                          <div className="patientDetails__personalData__item">
                            <div className="patientDetails__personalData__item__label">
                              {t("patient.hasinsurance")}:
                            </div>
                            <div className="patientDetails__personalData__item__value">
                              {patient.data?.hasInsurance || "-"}
                            </div>
                          </div>
                          <div className="patientDetails__personalData__item">
                            <div className="patientDetails__personalData__item__label">
                              {t("patient.telephone")}:
                            </div>
                            <div className="patientDetails__personalData__item__value">
                              {patient.data?.telephone || "-"}
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      {patient.data?.note ? (
                        <Accordion expanded={expanded === "panel_2"}>
                          <AccordionSummary
                            onClick={() => handleOnExpanded("panel_2")}
                          >
                            <Notes
                              fontSize="small"
                              style={{ color: "white" }}
                            />
                            <span>{t("patient.note")}:</span>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className="patientDetails__personalData__item longText">
                              <div className="patientDetails__personalData__item__value">
                                {patient.data.note}
                              </div>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="patientDetails__content">
                  <RouterTabs
                    config={getRouteConfig()}
                    defaultRoute={defaultRoute}
                  />
                </div>
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
  patient: state.patients.selectedPatient,
});

const mapDispatchToProps: IDispatchProps = {
  getPatientThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientDetailsActivity);
