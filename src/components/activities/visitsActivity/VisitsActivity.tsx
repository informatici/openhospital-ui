import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { PATHS } from "../../../consts";
import { TUserCredentials } from "../../../state/main/types";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import SkeletonLoader from "../../accessories/skeletonLoader/SkeletonLoader";
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
          <div className="visits__title">{t("nav.visits")}</div>
          <div style={{ marginBottom: "100px" }}>
            <SkeletonLoader />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VisitsActivity;
