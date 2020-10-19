import { Typography } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import classNames from "classnames";
import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./styles.scss";
import { TProps } from "./types";

const AppHeader: FunctionComponent<TProps> = ({
  userCredentials,
  breadcrumbMap,
}) => {
  const keys = Object.keys(breadcrumbMap);
  const trailEdgeKey = keys.pop();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classNames("appHeader", { open_menu: isOpen })}>
      <div className="appHeader__background">
        <div className="appHeader__identifier">
          <div className="appHeader__identifier__logo">
            <img src={logo} alt="Open Hospital" />
          </div>
          <div
            className="appHeader__identified__trigger"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="trigger_x"></div>
            <div className="trigger_y"></div>
            <div className="trigger_z"></div>
          </div>
          <div className="appHeader__identified__main">
            <div className="appHeader__identified__main__headline">
              Princeton-Plainsboro Teaching Hospital
            </div>
            <Breadcrumbs>
              {keys.map((key, index) => (
                <Link key={index} to={breadcrumbMap[key]}>
                  <Typography color="textPrimary">{key}</Typography>
                </Link>
              ))}
              <Typography color="textPrimary">{trailEdgeKey}</Typography>
            </Breadcrumbs>
          </div>
        </div>
        <div className="appHeader__nav">
          <div className="appHeader__nav_items">
            <div className="appHeader__nav__item">Pharmacy</div>
            <div className="appHeader__nav__item">Ward</div>
            <div className="appHeader__nav__item">Billing</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
