import {
  ArtTrack,
  Colorize,
  Healing,
  HistoryEdu,
  LocalHospital,
  LocalHotel,
  Pageview,
} from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { EncounterDTO } from "generated";
import { useEncountersEnabled } from "libraries/hooks";
import { Permission } from "libraries/permissionUtils/Permission";
import { usePermission } from "libraries/permissionUtils/usePermission";
import React, { FunctionComponent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Arrow from "../../../assets/arrow-w.svg";
import "./styles.scss";
import { TUserSection } from "./types";

interface IOwnProps {
  userSection: TUserSection;
  encounter?: EncounterDTO | null;
}

const OutPatientEncounterDashboardMenu: FunctionComponent<IOwnProps> = ({
  userSection,
  encounter,
}) => {
  const { t } = useTranslation();

  const encountersEnabled = useEncountersEnabled();

  const isActive = useCallback(
    (value: string) => (value === userSection ? "active" : "default"),
    [userSection]
  );

  const canReadRadiology = usePermission("radiology.read");

  const navigate = useNavigate();

  const changeUserSection = useCallback(
    (section: TUserSection) => {
      navigate(`${section}`, { replace: true });
    },
    [navigate]
  );

  return (
    <div
      data-cy="patient-encounter-main-menu"
      className="patientEncounter__main_menu"
    >
      <h6>{t("patient.usersections")}</h6>
      <Permission require="admissions.access">
        <div
          className={
            "patientEncounter__main_menu__item " + isActive("admissions")
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
      </Permission>
      <Permission require="conditionings.access">
        <div
          className={
            "patientEncounter__main_menu__item " + isActive("conditioning")
          }
          onClick={() => changeUserSection("conditioning")}
        >
          <FormatListBulletedIcon fontSize="small" style={{ color: "white" }} />
          <span>{t("nav.conditioning")}:</span>
          <img src={Arrow} className="icon_toggle" alt="Accordion toggle" />
        </div>
      </Permission>
      <Permission require="medicalhistories.access">
        <div
          className={
            "align__element patientEncounter__main_menu__item " +
            isActive("medical-history")
          }
          onClick={() => {
            changeUserSection("medical-history");
          }}
        >
          <HistoryEdu fontSize="small" style={{ color: "white" }} />
          <span>{t("nav.medicalHistory")}:</span>
          <img src={Arrow} className="icon_toggle" alt="Accordion toggle" />
        </div>
      </Permission>
      <Permission require="opds.access">
        {!encountersEnabled && (
          <div
            className={
              "align__element patientEncounter__main_menu__item " +
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
      </Permission>
      <Permission require="examinations.access">
        <div
          className={
            "align__element patientEncounter__main_menu__item " +
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
      </Permission>
      <Permission require="laboratories.access">
        <div
          className={
            "align__element patientEncounter__main_menu__item " +
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
      </Permission>
      {false && (
        <div
          className={
            "align__element patientEncounter__main_menu__item " +
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
      <Permission require="clinics.access">
        {encounter == null && (
          <div
            className={
              "align__element patientEncounter__main_menu__item " +
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
      </Permission>
      {canReadRadiology && encounter == null && (
        <div
          className={
            "align__element patientEncounter__main_menu__item " +
            isActive("radiology")
          }
          onClick={() => {
            changeUserSection("radiology");
          }}
        >
          <Healing fontSize="small" style={{ color: "white" }} />
          <span>{t("nav.radiology")}</span>
          <img src={Arrow} className="icon_toggle" alt="Accordion toogle" />
        </div>
      )}
    </div>
  );
};

export default OutPatientEncounterDashboardMenu;
