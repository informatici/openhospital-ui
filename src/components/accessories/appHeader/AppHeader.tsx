import { Typography } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import LangSwitcher from "../langSwitcher/LangSwitcher";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import classNames from "classnames";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import logo from "../../../assets/logo-color.svg";
import "./styles.scss";
import { TProps } from "./types";

const AppHeader: FunctionComponent<TProps> = ({ breadcrumbMap }) => {
  const keys = Object.keys(breadcrumbMap);
  const trailEdgeKey = keys.pop();

  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = (isOpen: boolean) => {
    isOpen
      ? document.body.classList.add("disable-scroll")
      : document.body.classList.remove("disable-scroll");
    setIsOpen(isOpen);
  };

  const history = useHistory();

  return (
    <div className={classNames("appHeader", { open_menu: isOpen })}>
      <div className="appHeader__background">
        <div className="appHeader__identifier">
          <div className="appHeader__identifier__logo">
            <img src={logo} alt="Open Hospital" height="45px" />
          </div>
          <div
            onClick={() => history.push(breadcrumbMap[keys.pop() || "/"])}
            className={classNames("appHeader__navigate_before", {
              hidden: trailEdgeKey === "Dashboard",
            })}
          >
            <NavigateBefore fontSize="large" style={{ color: "#fc1812" }} />
          </div>
          <div className="appHeader__identified__main">
            <div className="appHeader__identified__main__headline">
              Princeton-Plainsboro Teaching Hospital
            </div>
            <Breadcrumbs>
              <div className="appHeader__home_icon">
                <HomeIcon fontSize="small" style={{ color: "#fff" }} />
              </div>
              {keys.map((key, index) => (
                <Link key={index} to={breadcrumbMap[key]}>
                  <Typography color="textPrimary">{key}</Typography>
                </Link>
              ))}
              <Typography color="textPrimary">{trailEdgeKey}</Typography>
            </Breadcrumbs>
          </div>
          <div
            className="appHeader__identified__trigger"
            onClick={() => openMenu(!isOpen)}
          >
            <div className="trigger_x"></div>
            <div className="trigger_y"></div>
            <div className="trigger_z"></div>
          </div>
        </div>
        <div className="appHeader__nav">
          <div className="appHeader__nav_lang_switcher">{<LangSwitcher />}</div>
          <div className="appHeader__nav_items">
            <div className="appHeader__nav__item">{t("nav.pharmacy")}</div>
            <div className="appHeader__nav__item">{t("nav.ward")}</div>
            <div className="appHeader__nav__item">{t("nav.billing")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
