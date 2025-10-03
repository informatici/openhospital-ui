import { useAppSelector } from "libraries/hooks/redux";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";
import { PATHS } from "../../../consts";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import "./styles.scss";

export function PharmacyActivity() {
  const { t } = useTranslation();

  const { userCredentials } = useAppSelector((state) => ({
    userCredentials: state.main.authentication.data,
  }));

  const [breadcrumbMap, setBreadcrumbMap] = useState({
    [t("nav.pharmacy")]: PATHS.pharmacy,
  });

  return (
    <div data-cy="pharmacy-activity" className="pharmacy">
      <AppHeader
        userCredentials={userCredentials ? userCredentials : {}}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="pharmacy__background">
        <div className="pharmacy__content">
          <Outlet context={{ breadcrumbMap, setBreadcrumbMap }} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
