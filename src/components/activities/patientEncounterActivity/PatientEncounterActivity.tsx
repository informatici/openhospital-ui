import { EditRounded, Notes, Person } from "@mui/icons-material";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router";
import { getEncountersByPatient } from "state/encounter";
import { PATHS } from "../../../consts";
import {
  EncounterDTOStatusEnum,
  PatientDTOStatusEnum,
} from "../../../generated";
import { renderDate } from "../../../libraries/formatUtils/dataFormatting";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { getPatient, getPatientReset } from "../../../state/patients";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../accessories/accordion/Accordion";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Button from "../../accessories/button/Button";
import Footer from "../../accessories/footer/Footer";
import { HospitalInfo } from "../../accessories/hospitalInfo/HospitalInfo";
import { ProfilePicture } from "../../accessories/profilePicture/ProfilePicture";
import InPatientEncounterDashboardMenu from "./InPatientEncounterDashboardMenu";
import OutPatientEncounterDashboardMenu from "./OutPatientEncounterDashboardMenu";
import "./styles.scss";
import { TActivityTransitionState, TUserSection } from "./types";

type ContextType = { status: string | null };

const PatientEncounterActivity = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const { id, code } = useParams<{ id: string; code: string }>();
  const navigate = useNavigate();

  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const section = useMemo(() => {
    const value =
      location.pathname.split("/")[location.pathname.split("/").length - 1];
    return (value ? value : "admissions") as TUserSection;
  }, [location]);

  const [expanded, setExpanded] = useState<string | false>(false);
  const handleOnExpanded = (section: string) => {
    setExpanded(section === expanded ? false : section);
  };

  const { userCredentials, patient, encounter } = useAppSelector((state) => ({
    userCredentials: state.main.authentication.data,
    patient: state.patients.selectedPatient,
    encounter: state.encounters.getEncountersByPatient.data?.find(
      (item) => item.code === code
    ),
  }));

  const breadcrumbMap = useMemo(() => {
    return patient?.data && encounter
      ? {
          [t("nav.patients")]: PATHS.patients,
          [t("nav.searchpatient")]: PATHS.patients_search,
          [t(
            "nav.patientdashboard"
          )]: `${PATHS.patients}/details/${patient.data.code}`,
          [t(
            "nav.encounter_dashboard"
          )]: `${PATHS.patients}/details/${patient.data.code}/encounters/${encounter.code}`,
        }
      : {};
  }, [t, encounter, patient]);

  useEffect(() => {
    if (isEmpty(patient.data) && patient.status === "IDLE") {
      dispatch(getPatient(id!));
    }
    if (patient.data && id) {
      dispatch(getEncountersByPatient(patient.data.code ?? 0));
    }
  }, [patient, id, dispatch]);

  useEffect(() => {
    if (section && !location.pathname.includes(section)) {
      navigate(section, {
        replace: true,
      });
    }
  }, [location, section, navigate]);

  useEffect(() => {
    return () => {
      dispatch(getPatientReset());
    };
  }, [dispatch]);

  useEffect(() => {
    scrollToElement(null);
  }, []);

  const personalData = (
    <>
      <div className="patientEncounter__personalData__item">
        <div className="patientEncounter__personalData__item__label">
          {t("patient.birthdate")}:
        </div>
        <div className="patientEncounter__personalData__item__value">
          {renderDate(patient.data?.birthDate || "-")}
        </div>
      </div>
      <div className="patientEncounter__personalData__item">
        <div className="patientEncounter__personalData__item__label">
          {t("patient.sex")}:
        </div>
        <div className="patientEncounter__personalData__item__value">
          {patient.data?.sex || "-"}
        </div>
      </div>
      <div className="patientEncounter__personalData__item">
        <div className="patientEncounter__personalData__item__label">
          {t("patient.bloodtype")}:
        </div>
        <div className="patientEncounter__personalData__item__value">
          {patient.data?.bloodType || "-"}
        </div>
      </div>

      <div className="patientEncounter__personalData__item">
        <div className="patientEncounter__personalData__item__label">
          {t("patient.address")}:
        </div>
        <div className="patientEncounter__personalData__item__value">
          {patient.data?.address || "-"}
        </div>
      </div>
      <div className="patientEncounter__personalData__item">
        <div className="patientEncounter__personalData__item__label">
          {t("patient.city")}:
        </div>
        <div className="patientEncounter__personalData__item__value">
          {patient.data?.city || "-"}
        </div>
      </div>
      <div className="patientEncounter__personalData__item">
        <div className="patientEncounter__personalData__item__label">
          {t("patient.telephone")}:
        </div>
        <div className="patientEncounter__personalData__item__value">
          {patient.data?.telephone || "-"}
        </div>
      </div>
      <div className="patientEncounter__personalData__item">
        <div className="patientEncounter__personalData__item__label">
          {t("patient.taxcode")}:
        </div>
        <div className="patientEncounter__personalData__item__value">
          {patient.data?.taxCode || "-"}
        </div>
      </div>
      <div className="patientEncounter__personalData__item">
        <div className="patientEncounter__personalData__item__label">
          {t("patient.hasinsurance")}:
        </div>
        <div className="patientEncounter__personalData__item__value">
          {patient.data?.hasInsurance || "-"}
        </div>
      </div>
      <div className="patientEncounter__personalData__item">
        <div className="patientEncounter__personalData__item__label">
          {t("patient.parentslivetoghether")}:
        </div>
        <div className="patientEncounter__personalData__item__value">
          {patient.data?.parentTogether || "-"}
        </div>
      </div>
      <div className="patientEncounter__personalData__item">
        <div className="patientEncounter__personalData__item__label">
          {t("patient.mothername")}:
        </div>
        <div className="patientEncounter__personalData__item__value">
          {patient.data?.motherName || "-"}
        </div>
      </div>
      <div className="patientEncounter__personalData__item">
        <div className="patientEncounter__personalData__item__label">
          {t("patient.fathername")}:
        </div>
        <div className="patientEncounter__personalData__item__value">
          {patient.data?.fatherName || "-"}
        </div>
      </div>
    </>
  );

  switch (activityTransitionState) {
    case "TO_PATIENT_ENCOUNTER_EDITING":
      return <Navigate to="edit" />;
    default:
      return (
        <div data-cy="patient-encounter" className="patientEncounter">
          <AppHeader
            userCredentials={userCredentials}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="patientEncounter__background">
            <div className="container">
              <div className="patientEncounter__panel">
                <div
                  className={classNames("patientEncounter__personalData", {
                    open_sidebar: isOpen,
                  })}
                >
                  <div
                    className="patientEncounter__personalData__trigger_mobile"
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
                  <div className="patientEncounter__personalData_sidebar">
                    <div className="patientEncounter__personalData_sidebar_header">
                      <div className="patientEncounter__profilePictureContainer_wrapper">
                        <div className="patientEncounter__profilePictureContainer">
                          <ProfilePicture
                            isEditable={false}
                            preLoadedPicture={patient.data?.blobPhoto}
                          />
                        </div>
                        <div className="patientEncounter__header__info">
                          <div className="patientEncounter__header__info__item">
                            {patient.data?.firstName || "-"}{" "}
                            <strong>{patient.data?.secondName || "-"}</strong>
                          </div>
                          <div className="patientEncounter__header__info__item">
                            <small>
                              {t("patient.patientID")}:&nbsp;
                              {patient.data?.code || "-"}
                            </small>
                          </div>
                          <div className="patientEncounter__header__info__item">
                            <small>
                              {t("encounters.encounterId")}:&nbsp;
                              {encounter?.code || "-"}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="patientEncounter__personalData_edit_button_wrapper">
                      <div className="patientEncounter__personalData_edit_button">
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            setActivityTransitionState(
                              "TO_PATIENT_ENCOUNTER_EDITING"
                            )
                          }
                        >
                          <EditRounded
                            fontSize="small"
                            style={{ color: "white" }}
                          />
                          <span>{t("encounters.edit_title")}</span>
                        </Button>
                      </div>
                    </div>

                    <div className="patientEncounter_status">
                      {patient?.data?.status === PatientDTOStatusEnum.I ? (
                        <div className="patientEncounter_status_wrapper patientEncounter_status_in">
                          <h6>
                            {t("patient.status")}:{" "}
                            <span>{t("patient.instatus")}</span>
                            <div
                              className="patientEncounter_status_button"
                              onClick={() => {
                                navigate("discharge", {
                                  replace: true,
                                });
                              }}
                            >
                              (change)
                            </div>
                          </h6>
                        </div>
                      ) : (
                        <div className="patientEncounter_status_wrapper patientEncounter_status_out">
                          <h6>
                            {t("patient.status")}:{" "}
                            <span>{t("patient.outstatus")}</span>
                            <div
                              className="patientEncounter_status_button"
                              onClick={() => {
                                navigate("admissions", {
                                  replace: true,
                                });
                              }}
                            >
                              (change)
                            </div>
                          </h6>
                        </div>
                      )}
                      {encounter?.status && (
                        <div
                          className={`patientEncounter_status_wrapper ${
                            encounter.status ===
                              EncounterDTOStatusEnum.Active &&
                            !encounter.closedAt
                              ? "patientEncounter_status_in"
                              : "patientEncounter_status_out"
                          }`}
                        >
                          <h6>
                            {t("encounter.status")}:{" "}
                            <span>
                              {t(
                                encounter.status ===
                                  EncounterDTOStatusEnum.Active &&
                                  !encounter.closedAt
                                  ? "encounters.status_open"
                                  : "encounters.status_closed"
                              )}
                            </span>
                          </h6>
                        </div>
                      )}
                    </div>

                    {patient?.data?.status === PatientDTOStatusEnum.I ? (
                      <InPatientEncounterDashboardMenu userSection={section} />
                    ) : (
                      <OutPatientEncounterDashboardMenu userSection={section} />
                    )}

                    <div className="patientEncounter__user_info">
                      <h6>{t("patient.userinfo")}</h6>
                      <Accordion expanded={expanded === "panel_1"}>
                        <AccordionSummary
                          onClick={() => handleOnExpanded("panel_1")}
                        >
                          <Person fontSize="small" style={{ color: "white" }} />
                          <span>{t("patient.personaldata")}</span>
                        </AccordionSummary>
                        <AccordionDetails>{personalData}</AccordionDetails>
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
                            <div className="patientEncounter__personalData__item longText">
                              <div className="patientEncounter__personalData__item__value">
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
                <div className="patientEncounter__content">
                  <HospitalInfo />
                  <div className="patientEncounter__profilePictureContainer_wrapper">
                    <div className="patientEncounter__profilePictureContainer">
                      <ProfilePicture
                        isEditable={false}
                        preLoadedPicture={patient.data?.blobPhoto}
                      />
                    </div>
                    <div className="patientEncounter__header__info">
                      <div className="patientEncounter__header__info__item">
                        {patient.data?.firstName || "-"}
                      </div>
                      <div className="patientEncounter__header__info__item">
                        <strong>{patient.data?.secondName || "-"}</strong>
                      </div>
                      <div className="patientEncounter__header__info__item">
                        <small>
                          {t("patient.patientID")}:&nbsp;
                          {patient.data?.code || "-"}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="patientEncounter__personalData">
                    {personalData}
                  </div>
                  <div className={"patientEncounter__nested_content"}>
                    <Outlet context={patient?.data?.status} />
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

export default PatientEncounterActivity;

export function usePatient() {
  return useOutletContext<ContextType>();
}
