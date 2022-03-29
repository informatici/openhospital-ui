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

const LaboratoryActivity: FC = () => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.dashboard")]: PATHS.home,
    [t("nav.laboratory")]: PATHS.laboratory,
  };

  const userCredentials = useSelector<IState, TUserCredentials>(
    (state) => state.main.authentication.data
  );

  return (
    <div className="laboratory">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="laboratory__background">
        <div className="laboratory__content">
          <SkeletonLoader />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LaboratoryActivity;
