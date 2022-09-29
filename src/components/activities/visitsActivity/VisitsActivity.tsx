import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { PATHS } from "../../../consts";
import { Permission } from "../../../libraries/permissionUtils/Permission";
import { TUserCredentials } from "../../../state/main/types";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import { CustomPermissionDenied } from "../../accessories/customPermissionDenied/CustomPermissionDenied";
import Footer from "../../accessories/footer/Footer";
import { Opds } from "../../accessories/opds/Opds";
import "./styles.scss";

const VisitsActivity: FC = () => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.visits")]: PATHS.visits,
  };

  const userCredentials = useSelector<IState, TUserCredentials>(
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
          <Permission require="visits.access">
            <Opds />
          </Permission>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VisitsActivity;
