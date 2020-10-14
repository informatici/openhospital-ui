import React, { FunctionComponent, useState } from "react";
import logo from "../../../assets/logo.png";
import { TProps } from "./types";
import "./styles.scss";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";
import classNames from "classnames";
import HomeIcon from '@material-ui/icons/Home';

const AppHeader: FunctionComponent<TProps> = ({
  userCredentials,
  breadcrumbMap,
}) => {
  const keys = Object.keys(breadcrumbMap);
  const trailEdgeKey = keys.pop();

  const [isOpen, setIsOpen] = useState(false);

  const openMenu = (isOpen: boolean) =>{
    (isOpen) ? document.body.classList.add('disable-scroll') : document.body.classList.remove('disable-scroll');
    setIsOpen(isOpen);
  }

  return (
    <div className={classNames("appHeader", { open_menu: isOpen })}>
      <div className="appHeader__background">
        <div className="appHeader__identifier">
          <div className="appHeader__identifier__logo">
            <img src={logo} alt="Open Hospital" />
          </div>
          <div className="appHeader__identified__trigger" onClick={() => openMenu((!isOpen))}>
            <div className="trigger_x"></div>
            <div className="trigger_y"></div>
            <div className="trigger_z"></div>
          </div>
          <div className="appHeader__identified__main">
            <div className="appHeader__identified__main__headline">
              Princeton-Plainsboro Teaching Hospital
            </div>
            <Breadcrumbs>
              <div><HomeIcon fontSize="small"style={{ color: "#fff" }} /></div>
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
            <div className="appHeader__nav__item mobile"><Link href="/dashboard">Dashboard</Link></div>
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
