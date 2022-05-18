import React, { FunctionComponent, useCallback } from "react";
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
  setUserSection: React.Dispatch<React.SetStateAction<IUserSection>>;
  userSection: IUserSection;
}

const OutPatientDashboardMenu: FunctionComponent<IOwnProps> = ({
  setUserSection,
  userSection,
}) => {
  const { t } = useTranslation();

  const isActive = (value: string) => {
    return value === userSection ? "active" : "default";
  };

  const { url } = useRouteMatch();
  const history = useHistory();

  const changeUserSection = useCallback(
    (section: IUserSection) => {
      setUserSection(section);
      history.replace(`${url}/${section}`);
    },
    [history, setUserSection]
  );

  return (
    <div className="patientDetails__main_menu">
      <h6>{t("patient.usersections")}</h6>

      <div
        className={"patientDetails__main_menu__item " + isActive("admissions")}
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

      <div
        className={
          "align__element patientDetails__main_menu__item " + isActive("visits")
        }
        onClick={() => {
          changeUserSection("visits");
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
          changeUserSection("triage");
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
          changeUserSection("laboratory");
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
          changeUserSection("therapy");
        }}
      >
        <Healing fontSize="small" style={{ color: "white" }} />
        <span>{t("nav.therapy")}:</span>
        <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
      </div>

      <div
        className={
          "align__element patientDetails__main_menu__item " + isActive("clinic")
        }
        onClick={() => {
          changeUserSection("clinic");
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
