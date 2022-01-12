import { Tooltip, Typography } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import LangSwitcher from "../langSwitcher/LangSwitcher";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import classNames from "classnames";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, Redirect, useLocation, Route  } from "react-router-dom";
import logo from "../../../assets/logo-color.svg";
import "./styles.scss";
import { IDispatchProps, IStateProps, TProps, TActivityTransitionState } from "./types";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { IState } from "../../../types";
import { connect, useSelector } from "react-redux";
import { setLogoutThunk } from "../../../state/main/actions";
import ConfirmationDialog from "../confirmationDialog/ConfirmationDialog";
import warningIcon from "../../../assets/warning-icon.png";
import OHFeedback from "../feedback/OHFeedback";
import Pharmacy from "../../activities/pharmacyActivity/PharmacyActivity";

const AppHeader: FunctionComponent<TProps> = ({
  breadcrumbMap,
  setLogoutThunk,
}) => {
  const keys = Object.keys(breadcrumbMap);
  const trailEdgeKey = keys.pop();

  const location = useLocation();
  
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const username = useSelector(
    (state: IState) => state.main.authentication.data?.displayName
  );
  const openMenu = (isOpen: boolean) => {
    isOpen
      ? document.body.classList.add("disable-scroll")
      : document.body.classList.remove("disable-scroll");
    setIsOpen(isOpen);
  };
  const [openLogoutConfirmation, setOpenLogoutConfirmation] = useState(false);

  const handleLogout = () => {
    setOpenLogoutConfirmation(false);
    setLogoutThunk();
  };
  const history = useHistory();

  const [activityTransitionState, setActivityTransitionState] =
  useState<TActivityTransitionState>("IDLE");
  
  switch (activityTransitionState) {
    case "TO_PHARMACY":
        return (<div><Redirect exact from="/"  to={`/Pharmacy/`} />
             <Route component={Pharmacy} exact path="/Pharmacy" />
             </div>);
    default:
      return (
        <div className={classNames("appHeader", { open_menu: isOpen })}>
          <div className="appHeader__top">
            <div className="appHeader__nav_lang_switcher">{<LangSwitcher />}</div>
            <div className="userInfo__wrapper">
              <div className="userInfo__toolbar">
                <span>
                  <span className="user-welcome">{t("dashboard.welcomename")}</span>
                  &nbsp;
                  <strong className="user-name">{username}</strong>
                </span>
                <Tooltip title={t("login.signout")!} aria-label="sign out">
                  <ExitToAppIcon
                    className="userInfo__toolbar_icon"
                    id="signout_icon"
                    onClick={() => setOpenLogoutConfirmation(true)}
                  />
                </Tooltip>
          </div>
          {navigator.onLine && (
            <div className="appHeader__help" title="Help">
              <OHFeedback />
            </div>
          )}
        </div>
      </div>
      <div className="appHeader__bottom">
        <div className="appHeader__background">
          <div className="appHeader__identifier">
            <div className="appHeader__identifier__logo">
              <Link to={"/"}>
                <img src={logo} alt="Open Hospital" height="45px" />
              </Link>
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
                <div className="appHeader__nav_items">
                  <div className="appHeader__nav__item" onClick={() => { 
                    if(location.pathname != "/Pharmacy/") 
                      setActivityTransitionState("TO_PHARMACY"); }}
                      >
                      {t("nav.pharmacy")} 
                  </div>
                  <div className="appHeader__nav__item">{t("nav.ward")}</div>
                  <div 
                    className="appHeader__nav__item"
                    onClick={() => history.push("/billing")}
                  >
                      {t("nav.billing")}</div>
                </div>
              </div>
            </div>
      </div>
      <ConfirmationDialog
        isOpen={openLogoutConfirmation}
        title={t("login.signout")}
        info={t("login.signoutText")}
        icon={warningIcon}
        primaryButtonLabel={t("login.signout")}
        secondaryButtonLabel={t("common.discard")}
        handlePrimaryButtonClick={handleLogout}
        handleSecondaryButtonClick={() => setOpenLogoutConfirmation(false)}
      />
    </div>
  );
}
};

const mapStateToProps = (state: IState): IStateProps => ({
  status: state.main.logout.status || "IDLE",
});

const mapDispatchToProps: IDispatchProps = {
  setLogoutThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
