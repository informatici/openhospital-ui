import React, { FunctionComponent } from "react";
import {
  SettingsApplications,
  LocalHotel,
  LocalHospital,
  Healing,
  ArtTrack,
  Colorize,
  Pageview,
} from "@material-ui/icons";
import Arrow from "../../../assets/arrow-w.svg";
import { IUserSection } from "./types";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { useRouteMatch, useHistory } from "react-router";

interface IOwnProps {
  setDefaultRoute: React.Dispatch<React.SetStateAction<string>>;
  setUserSection: React.Dispatch<React.SetStateAction<IUserSection>>;
  userSection: IUserSection;
}

const OutPatientDashboardMenu: FunctionComponent<IOwnProps> = ({
  setDefaultRoute,
  setUserSection,
  userSection,
}) => {
  const { t } = useTranslation();

  const isActive = (value: string) => {
    return value === userSection ? "active" : "default";
  };

  const { url } = useRouteMatch();
  const history = useHistory();

  return (
    <div className="patientDetails__main_menu">
      <h6>{t("patient.usersections")}</h6>

      <div
        className={
          "align__element patientDetails__main_menu__item " + isActive("visits")
        }
        onClick={() => {
          setUserSection("visits");
          history.replace(`${url}/visits`);
        }}
      >
        <Pageview fontSize="small" style={{ color: "white" }} />
        <span>{t("nav.visits")}:</span>
        <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
      </div>

      <div
        className={
          "align__element patientDetails__main_menu__item " + isActive("triage")
        }
        onClick={() => {
          setUserSection("triage");
          history.replace(`${url}/triage`);
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
          history.replace(`${url}/laboratory`);
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
          history.replace(`${url}/therapy`);
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
          history.replace(`${url}/operation`);
        }}
      >
        <SettingsApplications fontSize="small" style={{ color: "white" }} />
        <span>{t("nav.operation")}:</span>
        <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
      </div>

      <div
        className={
          "align__element patientDetails__main_menu__item " + isActive("clinic")
        }
        onClick={() => {
          setUserSection("clinic");
          history.replace(`${url}/clinic`);
        }}
      >
        <LocalHospital fontSize="small" style={{ color: "white" }} />
        <span>{t("nav.userclinic")}</span>
        <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
      </div>
    </div>
  );
};

export default OutPatientDashboardMenu;
