import React, { ReactNode, useCallback } from "react";
import {
  AirlineSeatFlat,
  ArrowForwardIosRounded,
  AssignmentInd,
  BlurCircular,
  GroupWork,
  Healing,
  LocalDrink,
  LocalHospitalSharp,
  People,
  SupervisedUserCircle,
} from "@material-ui/icons";
import { IAdminSection } from "../types";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import classes from "./SideMenu.module.scss";
import { MenuItem } from "../../../accessories/menuItem";
import { useSelector } from "react-redux";
import { IState } from "../../../../types";
import { HospitalDTO } from "../../../../generated";
import { IApiResponse } from "../../../../state/types";

const SideMenu = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const hospital = useSelector<IState, IApiResponse<HospitalDTO>>(
    (state) => state.hospital.getHospital
  );

  const changeAdminSection = useCallback(
    (section: IAdminSection) => {
      navigate(`${section}`, { replace: true });
    },
    [navigate]
  );

  const menuItems: { key: IAdminSection; icon: ReactNode }[] = [
    {
      key: "wards",
      icon: <AirlineSeatFlat fontSize="small" />,
    },
    {
      key: "diseases",
      icon: <BlurCircular fontSize="small" />,
    },
    {
      key: "exams",
      icon: <AssignmentInd fontSize="small" />,
    },
    {
      key: "operations",
      icon: <Healing fontSize="small" />,
    },
    {
      key: "vaccines",
      icon: <LocalDrink fontSize="small" />,
    },
    {
      key: "suppliers",
      icon: <SupervisedUserCircle fontSize="small" />,
    },
    {
      key: "users",
      icon: <People fontSize="small" />,
    },
    {
      key: "types",
      icon: <GroupWork fontSize="small" />,
    },
  ];

  return (
    <div data-cy="admin-side-menu" className={classes.menu}>
      {menuItems.map((item) => (
        <MenuItem
          key={item.key}
          icon={item.icon}
          label={t(`nav.${item.key}`)}
          selected={location.pathname
            .slice(location.pathname.lastIndexOf("admin") + 6)
            .startsWith(item.key)}
          onClick={() => {
            changeAdminSection(item.key);
          }}
          trailingIcon={<ArrowForwardIosRounded fontSize="small" />}
        />
      ))}
      <h6 className={classes.label}>{t("nav.hospital")}</h6>
      <MenuItem
        icon={<LocalHospitalSharp fontSize="small" />}
        label={t(`nav.hospitalInfo`)}
        onClick={() => {}}
        expandedContent={
          <div className={classes.hospitalData}>
            {hospital.data &&
              Object.entries(hospital.data)
                .filter((entry) => entry[0] !== "lock")
                .map((entry) => (
                  <div key={entry[0]} className={classes.item}>
                    <span className={classes.labelSmall}>
                      {t(`hospital.${entry[0]}`)}
                    </span>
                    <span className={classes.value}>{entry[1] ?? "---"}</span>
                  </div>
                ))}
          </div>
        }
      />
    </div>
  );
};

export default SideMenu;
