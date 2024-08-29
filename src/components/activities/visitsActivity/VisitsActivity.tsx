import { useAppSelector } from "libraries/hooks/redux";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { PATHS } from "../../../consts";
import { Permission } from "../../../libraries/permissionUtils/Permission";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import { HospitalInfo } from "../../accessories/hospitalInfo/HospitalInfo";
import { Opds } from "../../accessories/opds/Opds";
import "./styles.scss";

const VisitsActivity: FC = () => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.visits")]: PATHS.visits,
  };

  const userCredentials = useAppSelector(
    (state) => state.main.authentication.data
  );

  return (
    <div className="visits">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="visits__background">
        <div className="visits__content">
          <HospitalInfo />
          <Permission require="opds.access">
            <Opds />
          </Permission>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VisitsActivity;
