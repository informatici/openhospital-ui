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
import { Link, useHistory, useRouteMatch } from "react-router-dom";

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

  const { url } = useRouteMatch();
  const history = useHistory();

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
          history.replace(`${url}/admissions`);
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
          "align__element patientDetails__main_menu__item " +
          isActive("discharge")
        }
        onClick={() => {
          setUserSection("discharge");
          history.replace(`${url}/discharge`);
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

export default InPatientDashboardMenu;
function useRouterMatch(): { url: any } {
  throw new Error("Function not implemented.");
}

function useHystory() {
  throw new Error("Function not implemented.");
}
