import React, { FunctionComponent } from "react";
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

interface IOwnProps {
  setDefaultRoute: React.Dispatch<React.SetStateAction<string>>;
  setUserSection: React.Dispatch<React.SetStateAction<IUserSection>>;
  userSection: IUserSection;
}

const InPatientDashboardMenu: FunctionComponent<IOwnProps> = ({
  setDefaultRoute,
  setUserSection,
  userSection,
}) => {
  const { t } = useTranslation();

  const isActive = (value: string) => {
    return value === userSection ? "active" : "default";
  };

  return (
    <div className="patientDetails__main_menu">
      <h6>{t("patient.usersections")}</h6>

      <div
        className={"patientDetails__main_menu__item " + isActive("admissions")}
        onClick={() => {
          setUserSection("admissions");
          setDefaultRoute("/admissions");
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

      <div
        className={
          "align__element patientDetails__main_menu__item " + isActive("opd")
        }
        onClick={() => {
          setUserSection("opd");
          setDefaultRoute("/opd");
        }}
      >
        <Pageview fontSize="small" style={{ color: "white" }} />
        <span>{t("nav.opd")}:</span>
        <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
      </div>

      <div
        className={
          "align__element patientDetails__main_menu__item " + isActive("triage")
        }
        onClick={() => {
          setUserSection("triage");
          setDefaultRoute("/triage");
        }}
      >
        <ArtTrack fontSize="small" style={{ color: "white" }} />
        <span>{t("nav.triage")}:</span>
        <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
      </div>

      <div
        className={
          "align__element patientDetails__main_menu__item " +
          isActive("laboratory")
        }
        onClick={() => {
          setUserSection("laboratory");
          setDefaultRoute("/laboratory");
        }}
      >
        <Colorize fontSize="small" style={{ color: "white" }} />
        <span>{t("nav.laboratory")}:</span>
        <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
      </div>

      <div
        className={
          "align__element patientDetails__main_menu__item " +
          isActive("therapy")
        }
        onClick={() => {
          setUserSection("therapy");
          setDefaultRoute("/therapy");
        }}
      >
        <Healing fontSize="small" style={{ color: "white" }} />
        <span>{t("nav.therapy")}:</span>
        <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
      </div>

      <div
        className={
          "align__element patientDetails__main_menu__item " +
          isActive("operation")
        }
        onClick={() => {
          setUserSection("operation");
          setDefaultRoute("/operation");
        }}
      >
        <SettingsApplications fontSize="small" style={{ color: "white" }} />
        <span>{t("nav.operation")}:</span>
        <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
      </div>

      <div
        className={
          "align__element patientDetails__main_menu__item " +
          isActive("discharge")
        }
        onClick={() => {
          setUserSection("discharge");
          setDefaultRoute("/discharge");
        }}
      >
        <ExitToApp fontSize="small" style={{ color: "white" }} />
        <span>{t("nav.discharge")}:</span>
        <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
      </div>

      <div
        className={
          "align__element patientDetails__main_menu__item " + isActive("clinic")
        }
        onClick={() => {
          setUserSection("clinic");
          setDefaultRoute("/summary");
        }}
      >
        <LocalHospital fontSize="small" style={{ color: "white" }} />
        <span>{t("nav.userclinic")}</span>
        <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
      </div>
    </div>
  );
};

export default InPatientDashboardMenu;
