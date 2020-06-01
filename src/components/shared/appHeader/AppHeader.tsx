import React, { FunctionComponent } from "react";
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
  const keys = Object.keys(breadcrumbMap);
  const trailEdgeKey = keys.pop();
  return (
    <div className="appHeader">
      <div className="appHeader__background">
        <div className="appHeader__identifier">
          <div className="appHeader__identifier__logo">
            <img src={logo} alt="Open Hospital" />
          </div>
          <div className="appHeader__identified__main">
            <div className="appHeader__identified__main__headline">
              Princeton-Plainsboro Teaching Hospital
            </div>
            <Breadcrumbs>
              {keys.forEach((key) => (
                <Link color="inherit" href={breadcrumbMap[key]}>
                  {key}
                </Link>
              ))}
              <Typography color="textPrimary">{trailEdgeKey}</Typography>
            </Breadcrumbs>
          </div>
        </div>
        <div className="appHeader__nav">
          <div className="appHeader__nav__item">Pharmacy</div>
          <div className="appHeader__nav__item">Ward</div>
          <div className="appHeader__nav__item">Billing</div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
