import React, { FunctionComponent, useCallback } from "react";
import {
  SettingsApplications,
  LocalHotel,
  LocalHospital,
  Healing,
  ArtTrack,
  Colorize,
  Pageview,
  ExitToApp,
} from "@material-ui/icons";
import Arrow from "../../../assets/arrow-w.svg";
import { IUserSection } from "./types";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router";
import { BASE_PATH } from "../../../generated";
import { usePermission } from "../../../libraries/permissionUtils/usePermission";

interface IOwnProps {
  setUserSection: React.Dispatch<React.SetStateAction<IUserSection>>;
  userSection: IUserSection;
}

const InPatientDashboardMenu: FunctionComponent<IOwnProps> = ({
  setUserSection,
  userSection,
}) => {
  const { t } = useTranslation();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const showAdmission = usePermission("admission.read");
  const updateAdmission = usePermission("admission.update");
  const showVisit = usePermission("visit.read");
  const showTherapy = usePermission("therapy.read");
  const showTriage = usePermission("examination.read");
  const showExam = usePermission("exam.read");
  const showOperation = usePermission("operation.read");
  const showSummary = usePermission("summary.read");

  const isActive = (value: string) => {
    return value === userSection ? "active" : "default";
  };

  const changeUserSection = useCallback(
    (section: IUserSection) => {
      setUserSection(section);
      navigate(`${section}`, { replace: true });
    },
    [navigate, setUserSection]
  );

  return (
    <div className="patientDetails__main_menu">
      <h6>{t("patient.usersections")}</h6>

      {showAdmission && (
        <div
          className={
            "patientDetails__main_menu__item " + isActive("admissions")
          }
          onClick={() => {
            changeUserSection("admissions");
          }}
        >
          <LocalHotel
            fontSize="small"
            style={{
              color: "white",
            }}
          />
          <span>{t("nav.admissions")}:</span>
          <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
        </div>
      )}

      {showVisit && (
        <div
          className={
            "align__element patientDetails__main_menu__item " +
            isActive("visits")
          }
          onClick={() => {
            changeUserSection("visits");
          }}
        >
          <Pageview fontSize="small" style={{ color: "white" }} />
          <span>{t("nav.visits")}:</span>
          <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
        </div>
      )}

      {showTriage && (
        <div
          className={
            "align__element patientDetails__main_menu__item " +
            isActive("triage")
          }
          onClick={() => {
            changeUserSection("triage");
          }}
        >
          <ArtTrack fontSize="small" style={{ color: "white" }} />
          <span>{t("nav.triage")}:</span>
          <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
        </div>
      )}

      {showExam && (
        <div
          className={
            "align__element patientDetails__main_menu__item " +
            isActive("laboratory")
          }
          onClick={() => {
            changeUserSection("laboratory");
          }}
        >
          <Colorize fontSize="small" style={{ color: "white" }} />
          <span>{t("nav.laboratory")}:</span>
          <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
        </div>
      )}

      {showTherapy && (
        <div
          className={
            "align__element patientDetails__main_menu__item " +
            isActive("therapy")
          }
          onClick={() => {
            changeUserSection("therapy");
          }}
        >
          <Healing fontSize="small" style={{ color: "white" }} />
          <span>{t("nav.therapy")}:</span>
          <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
        </div>
      )}

      {showOperation && (
        <div
          className={
            "align__element patientDetails__main_menu__item " +
            isActive("operation")
          }
          onClick={() => {
            changeUserSection("operation");
          }}
        >
          <SettingsApplications fontSize="small" style={{ color: "white" }} />
          <span>{t("nav.operation")}:</span>
          <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
        </div>
      )}

      {updateAdmission && (
        <div
          className={
            "align__element patientDetails__main_menu__item " +
            isActive("discharge")
          }
          onClick={() => {
            changeUserSection("discharge");
          }}
        >
          <ExitToApp fontSize="small" style={{ color: "white" }} />
          <span>{t("nav.discharge")}:</span>
          <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
        </div>
      )}

      {showSummary && (
        <div
          className={
            "align__element patientDetails__main_menu__item " +
            isActive("clinic")
          }
          onClick={() => {
            changeUserSection("clinic");
          }}
        >
          <LocalHospital fontSize="small" style={{ color: "white" }} />
          <span>{t("nav.userclinic")}</span>
          <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
        </div>
      )}
    </div>
  );
};

export default InPatientDashboardMenu;
