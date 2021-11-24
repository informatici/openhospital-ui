import { Tooltip, Typography } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Trans } from "react-i18next";
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
import SplitButton from "../splitButton/SplitButton";
import OHFeedback from "../feedback/OHFeedback";
import Medicals from "../../activities/MedicalsActivity/MedicalsActivity";

const AppHeader: FunctionComponent<TProps> = ({
  breadcrumbMap,
  setLogoutThunk,
}) => {
  const keys = Object.keys(breadcrumbMap);
  const trailEdgeKey = keys.pop();

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

  const pharmacyTypes =[
    t("nav.pharmaceuticals"),
    t("nav.pharmaceuticalstock"),
    t("nav.pharmaceuticalstockward")
    ];

    const useDescription = (
      event: React.MouseEvent<Element, MouseEvent>,
      index: number,
    ) => {  
        switch(index)
        {
          case 0: 
            if(!location.pathname.endsWith('/Medicals/'))
              setActivityTransitionState("TO_PHARMACEUTICALS");
          break;
          case 1: //Report of order
            setActivityTransitionState("TO_PHARMACEUTICAL_STOCK");
          break;
          case 2: //Report of stock card
            setActivityTransitionState("TO_PHARMACEUTICAL_STOCK_WARD");
          break;
          default: //No valid choice
            setActivityTransitionState("IDLE");
          break;
        }
    }
  
  const handleLogout = () => {
    setOpenLogoutConfirmation(false);
    setLogoutThunk();
  };
  const history = useHistory();

  const [activityTransitionState, setActivityTransitionState] =
  useState<TActivityTransitionState>("IDLE");
  
  var location = useLocation();

  switch (activityTransitionState) {
    case "TO_PHARMACEUTICALS":
      //if(!location.pathname.endsWith('/Medicals/'))
        return (<div><Redirect exact from="/"  to={`/Medicals/`} />
             <Route component={Medicals} exact path="/Medicals" />
             </div>);
      // else;
      //   return null;
    case "TO_PHARMACEUTICAL_STOCK":
      return <Redirect to={`/MedicalStock/`} />; 
    case "TO_PHARMACEUTICAL_STOCK_WARD":
      return <Redirect to={`/MedicalStockWard/`} />; 
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
                <div className="appHeader__nav_items">
                {/* <div className="appHeader__nav__item"> */}
                  <SplitButton
                    type="button"
                    descriptions={pharmacyTypes}
                    label={t("nav.pharmacy")}
                    onClick={useDescription}
                    className="appHeader__nav__item"
                  >
                    <div className="appHeader__nav__item">
                      {t("nav.pharmacy")}
                    </div>
                  </SplitButton>
                  <div className="appHeader__nav__item">{t("nav.ward")}</div>
                  <div className="appHeader__nav__item">{t("nav.billing")}</div>
                </div>
              </div>
            </div>
          </div>
          <ConfirmationDialog
            isOpen={openLogoutConfirmation}
            title={t("login.signout")}
            info={`Are you sure you want to ${t("login.signout")}?`}
            icon={warningIcon}
            primaryButtonLabel={t("login.signout")}
            secondaryButtonLabel="Dismiss"
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
