import React, { FunctionComponent, useState, useRef } from "react";
import logo from "../../../assets/logo.png";
import { TProps } from "./types";
import "./styles.scss";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";

const AppHeader: FunctionComponent<TProps> = ({
  userCredentials,
  breadcrumbMap,
}) => {
  const appHeader = useRef(null);
  const keys = Object.keys(breadcrumbMap);
  const trailEdgeKey = keys.pop();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`appHeader ${(isOpen ? "open_menu": "")}`} ref={appHeader}>
      <div className="appHeader__background">
        <div className="appHeader__identifier">
          <div className="appHeader__identifier__logo">
            <img src={logo} alt="Open Hospital" />
          </div>
          <div className="appHeader__identified__trigger" onClick={() => setIsOpen((!isOpen) ? true : false)}>
            <div className="trigger_x"></div>
            <div className="trigger_y"></div>
            <div className="trigger_z"></div>
          </div>
          <div className="appHeader__identified__main">
            <div className="appHeader__identified__main__headline">
              Princeton-Plainsboro Teaching Hospital
            </div>
            <Breadcrumbs>
              {keys.map((key) => (
                <Link color="inherit" href={breadcrumbMap[key]}>
                  {key}
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
