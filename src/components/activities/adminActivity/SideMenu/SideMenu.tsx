import React, { FunctionComponent, ReactNode, useCallback } from "react";
import {
  AirlineSeatFlat,
  ArrowForwardIosRounded,
  AssignmentInd,
  BlurCircular,
  ExpandMoreSharp,
  GroupWork,
  Healing,
  LocalDrink,
  LocalHospitalSharp,
  People,
  SupervisedUserCircle,
} from "@material-ui/icons";
import { IAdminSection } from "../types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import classes from "./SideMenu.module.scss";
import { MenuItem } from "../../../accessories/menuItem";
import { useSelector } from "react-redux";
import { IState } from "../../../../types";
import { HospitalDTO } from "../../../../generated";
import { IApiResponse } from "../../../../state/types";

interface IOwnProps {
  setAdminSection: React.Dispatch<React.SetStateAction<IAdminSection>>;
  adminSection: IAdminSection;
}

const SideMenu: FunctionComponent<IOwnProps> = ({
  setAdminSection: setUserSection,
  adminSection: userSection,
}) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const hospital = useSelector<IState, IApiResponse<HospitalDTO>>(
    (state) => state.hospital.getHospital
  );

  const changeAdminSection = useCallback(
    (section: IAdminSection) => {
      setUserSection(section);
      navigate(`${section}`, { replace: true });
    },
    [navigate, setUserSection]
  );

  const menuItems: { key: IAdminSection; icon: ReactNode }[] = [
    {
      key: "wards",
      icon: <AirlineSeatFlat />,
    },
    {
      key: "diseases",
      icon: <BlurCircular />,
    },
    {
      key: "exams",
      icon: <AssignmentInd />,
    },
    {
      key: "operations",
      icon: <Healing />,
    },
    {
      key: "vaccines",
      icon: <LocalDrink />,
    },
    {
      key: "suppliers",
      icon: <SupervisedUserCircle />,
    },
    {
      key: "users",
      icon: <People />,
    },
    {
      key: "types",
      icon: <GroupWork />,
    },
  ];

  return (
    <div data-cy="admin-side-menu" className={classes.menu}>
      {menuItems.map((item) => (
        <MenuItem
          key={item.key}
          icon={item.icon}
          label={t(`nav.${item.key}`)}
          selected={userSection === item.key}
          onClick={() => {
            changeAdminSection(item.key);
          }}
          trailingIcon={<ArrowForwardIosRounded />}
        />
      ))}
      <span className={classes.label}>{t("nav.hospital")}</span>
      <MenuItem
        icon={<LocalHospitalSharp />}
        label={t(`nav.hospitalInfo`)}
        onClick={() => {}}
        expandedContent={
          <div className={classes.hospitalData}>
            {hospital.data &&
              Object.entries(hospital.data)
                .filter((entry) => entry[0] !== "lock")
                .map((entry) => (
                  <div className={classes.item}>
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
