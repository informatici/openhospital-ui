import { EditRounded, Notes, Person } from "@material-ui/icons";
import classNames from "classnames";
import isEmpty from "lodash.isempty";
import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect, useSelector } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router";
import { useParams } from "react-router-dom";
import { PATHS } from "../../../consts";
import { PatientDTOStatusEnum } from "../../../generated";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { getPatientThunk } from "../../../state/patients/actions";
import { IState } from "../../../types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../accessories/accordion/Accordion";
import PatientAdmission from "../../accessories/admission/PatientAdmission";
import PatientAdmissions from "../../accessories/admission/PatientAdmissions";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Button from "../../accessories/button/Button";
import PatientDischarge from "../../accessories/discharge/PatientDischarge";
import Footer from "../../accessories/footer/Footer";
import PatientExams from "../../accessories/patientExams/PatientExams";
import PatientOPD from "../../accessories/patientOPD/patientOPD";
import PatientSummary from "../../accessories/patientSummary/PatientSummary";
import PatientTherapy from "../../accessories/patientTherapy/PatientTherapy";
import PatientTriage from "../../accessories/patientTriage/PatientTriage";
import PatientVisit from "../../accessories/patientVisit/patientVisit";
import { ProfilePicture } from "../../accessories/profilePicture/ProfilePicture";
import SkeletonLoader from "../../accessories/skeletonLoader/SkeletonLoader";
import PatientDetailsContent from "../patientDetailsActivityContent/PatientDetailsActivityContent";
import InPatientDashboardMenu from "./InPatientDashboardMenu";
import OutPatientDashboardMenu from "./OutPatientDashboardMenu";
import "./styles.scss";
import {
  IDispatchProps,
  IStateProps,
  IUserSection,
  TActivityTransitionState,
  TProps,
} from "./types";
import { useUserSection } from "./useUserSection";

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
  const { path, url } = useRouteMatch();

  useEffect(() => {
    if (isEmpty(patient.data) && patient.status === "IDLE") {
      getPatientThunk(id);
    }
  }, [patient, id, getPatientThunk]);

  const breadcrumbMap = {
    [t("nav.dashboard")]: PATHS.home,
    [t("nav.patients")]: PATHS.patients,
    [t("nav.searchpatient")]: PATHS.patients_search,
    [t("nav.patientdashboard")]: `${PATHS.patients}/${patient.data?.code}`,
  };

  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");
  const [isOpen, setIsOpen] = useState(false);
  const { location } = useHistory();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [userSection, setUserSection] = useUserSection();
  const [defaultRoute, setDefaultRoute] = useState("/summary");

  const handleOnExpanded = (section: string) => {
    setExpanded(section === expanded ? false : section);
  };

  switch (activityTransitionState) {
    case "TO_PATIENT_EDITING":
      return (
        <Redirect
          to={`${path}/edit`.replace(
            ":id",
            patient.data?.code?.toString() || ""
          )}
        />
      );
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
                          <div className="patientDetails__header__info__item">
                            <small>
                              {t("patient.patientID")}:&nbsp;
                              {patient.data?.code || "-"}
                            </small>
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

                    <div className="patientDetails_status">
                      {patient?.data?.status === PatientDTOStatusEnum.I ? (
                        <div className="patientDetails_status_wrapper patientDetails_status_in">
                          <h6>
                            Status: <span>Inpatient</span>
                            <div
                              className="patientDetails_status_button"
                              onClick={() => {
                                setUserSection("discharge");
                              }}
                            >
                              (change)
                            </div>
                          </h6>
                        </div>
                      ) : (
                        <div className="patientDetails_status_wrapper patientDetails_status_out">
                          <h6>
                            Status: <span>Outpatient</span>
                            <div
                              className="patientDetails_status_button"
                              onClick={() => {}}
                            >
                              (change)
                            </div>
                          </h6>
                        </div>
                      )}
                    </div>

                    {patient?.data?.status === PatientDTOStatusEnum.I ? (
                      <InPatientDashboardMenu
                        setDefaultRoute={setDefaultRoute}
                        setUserSection={setUserSection}
                        userSection={userSection}
                      />
                    ) : (
                      <OutPatientDashboardMenu
                        setDefaultRoute={setDefaultRoute}
                        setUserSection={setUserSection}
                        userSection={userSection}
                      />
                    )}

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
                              {t("patient.birthdate")}:
                            </div>
                            <div className="patientDetails__personalData__item__value">
                              {renderDate(patient.data?.birthDate || "-")}
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
                              {t("patient.address")}:
                            </div>
                            <div className="patientDetails__personalData__item__value">
                              {patient.data?.address || "-"}
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
                              {t("patient.telephone")}:
                            </div>
                            <div className="patientDetails__personalData__item__value">
                              {patient.data?.telephone || "-"}
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
                              {t("patient.parentslivetoghether")}:
                            </div>
                            <div className="patientDetails__personalData__item__value">
                              {patient.data?.parentTogether || "-"}
                            </div>
                          </div>
                          <div className="patientDetails__personalData__item">
                            <div className="patientDetails__personalData__item__label">
                              {t("patient.mothername")}:
                            </div>
                            <div className="patientDetails__personalData__item__value">
                              {patient.data?.mother_name || "-"}
                            </div>
                          </div>
                          <div className="patientDetails__personalData__item">
                            <div className="patientDetails__personalData__item__label">
                              {t("patient.fathername")}:
                            </div>
                            <div className="patientDetails__personalData__item__value">
                              {patient.data?.father_name || "-"}
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
                  <div className={"patientDetails__nested_content"}>
                    <Switch>
                      <Route exact path={`${path}`}>
                        <Redirect to={`${url}/${userSection}`} />
                      </Route>
                      <Route path={`${path}/summary`}>
                        <PatientDetailsContent
                          title="Summary"
                          content={PatientSummary}
                        />
                      </Route>
                      <Route path={`${path}/admissions`}>
                        <PatientDetailsContent
                          title="Admissions"
                          content={
                            patient.data?.status === PatientDTOStatusEnum.O
                              ? PatientAdmission
                              : PatientAdmissions
                          }
                        />
                      </Route>
                      <Route path={`${path}/visits`}>
                        <PatientDetailsContent
                          title="Visits"
                          content={
                            patient?.data?.status === PatientDTOStatusEnum.O
                              ? PatientOPD
                              : PatientVisit
                          }
                        />
                      </Route>
                      <Route path={`${path}/laboratory`}>
                        <PatientDetailsContent
                          title="Laboratory"
                          content={PatientExams}
                        />
                      </Route>
                      <Route path={`${path}/therapy`}>
                        <PatientDetailsContent
                          title="Therapy"
                          content={PatientTherapy}
                        />
                      </Route>
                      <Route path={`${path}/triage`}>
                        <PatientDetailsContent
                          title="Triage"
                          content={PatientTriage}
                        />
                      </Route>
                      <Route path={`${path}/clinic`}>
                        <PatientDetailsContent
                          title="Clinic"
                          content={SkeletonLoader}
                        />
                      </Route>
                      <Route path={`${path}/discharge`}>
                        {patient?.data?.status === PatientDTOStatusEnum.O ? (
                          <Redirect to={`${url}/summary`} />
                        ) : (
                          <PatientDetailsContent
                            title="Discharge"
                            content={PatientDischarge}
                          />
                        )}
                      </Route>
                      <Route path={`${path}/operation`}>
                        <PatientDetailsContent
                          title="Operation"
                          content={SkeletonLoader}
                        />
                      </Route>
                    </Switch>
                  </div>
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
