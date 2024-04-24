import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, Outlet } from "react-router";
import { PATHS } from "../../../consts";
import { scrollToElement } from "../../../libraries/uiUtils/scrollToElement";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import SideMenu from "./SideMenu/SideMenu";
import { IAdminSection } from "./types";
import { IAuthentication } from "../../../state/main/types";
import classes from "./AdminActivity.module.scss";
import "./styles.scss";
import { useMediaQuery } from "@material-ui/core";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../accessories/accordion/Accordion";

const AdminActivity = () => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const matches = useMediaQuery("(min-width:768px)");

  const breadcrumbMap = {
    [t("nav.administration")]: PATHS.admin,
  };

  const section =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const [userSection, setUserSection] = useState<IAdminSection>(
    (isNaN(parseInt(section)) ? section : "wards") as IAdminSection
  );

  const userCredentials = useSelector<IState, IAuthentication | undefined>(
    (state) => state.main.authentication?.data
  );

  useEffect(() => {
    scrollToElement(null);
  }, []);

  return (
    <div data-cy="admin-activity" className={classes.admin}>
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className={classes.content}>
        <div className={classes.sidebar}>
          {matches ? (
            <SideMenu
              setAdminSection={setUserSection}
              adminSection={userSection}
            />
          ) : (
            <Accordion
              data-cy={"expandable-item"}
              expanded={matches ? true : expanded}
            >
              <AccordionSummary onClick={() => setExpanded(!expanded)}>
                <div className={classes.menuButton}>{t("common.menu")}</div>
              </AccordionSummary>
              <AccordionDetails>
                <SideMenu
                  setAdminSection={setUserSection}
                  adminSection={userSection}
                />
              </AccordionDetails>
            </Accordion>
          )}
        </div>
        <div className={classes.outlet}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminActivity;
