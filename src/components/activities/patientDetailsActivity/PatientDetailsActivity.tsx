import classNames from "classnames";
import isEmpty from "lodash.isempty";
import React, { FunctionComponent, useEffect, useState } from "react";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
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
  TActivityTransitionState,
} from "./types";
import { IState } from "../../../types";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import PatientTherapy from "../../accessories/patientTherapy/PatientTherapy";
import PatientBooking from "../../accessories/patientBooking/PatientBooking";

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
  const [expanded, setExpanded] = useState<string | false>("panel_1");

  const patientDetailTabs: TTabConfig = [
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
                    <div
                      className="patientDetails__personalData_edit_button"
                      onClick={() =>
                        setActivityTransitionState("TO_PATIENT_EDITING")
                      }
                    >
                      <div className="profilePicture_editIcon">
                        <EditRoundedIcon
                          fontSize="small"
                          style={{ color: "white" }}
                        />
                      </div>
                      <span>{t("patient.titleedit")}</span>
                    </div>
                    <div className="patientDetails__profilePictureContainer">
                      <ProfilePicture
                        isEditable={false}
                        preLoadedPicture={patient.data?.blobPhoto}
                      />
                    </div>
                    <Accordion expanded={expanded === "panel_1"}>
                      <AccordionSummary onClick={() => setExpanded("panel_1")}>
                        <p>{t("patient.personaldata")}</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="patientDetails__personalData__item">
                          <div className="patientDetails__personalData__item__label">
                            {t("patient.firstname")}:
                          </div>
                          <div className="patientDetails__personalData__item__value">
                            {patient.data?.firstName || "-"}
                          </div>
                        </div>
                        <div className="patientDetails__personalData__item">
                          <div className="patientDetails__personalData__item__label">
                            {t("patient.secondname")}:
                          </div>
                          <div className="patientDetails__personalData__item__value">
                            {patient.data?.secondName || "-"}
                          </div>
                        </div>
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
                          onClick={() => setExpanded("panel_2")}
                        >
                          {t("patient.note")}:
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
                <div className="patientDetails__content">
                  <RouterTabs
                    config={patientDetailTabs}
                    defaultRoute="/summary"
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
