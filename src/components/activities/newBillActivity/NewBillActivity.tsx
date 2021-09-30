import React, { FC } from "react";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import { useTranslation } from "react-i18next";
import "./styles.scss";

import SkeletonLoader from "../../accessories/skeletonLoader/SkeletonLoader";
import { useSelector } from "react-redux";
import { IState } from "../../../types";
import { TUserCredentials } from "../../../state/main/types";

const NewBillActivity: FC = () => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.newbill")]: "/bills",
  };
  const userCredentials = useSelector<IState, TUserCredentials>(
    (state) => state.main.authentication.data
  );
  return (
    <div className="new_Bill">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <SkeletonLoader />
      <Footer />
    </div>
  );
};

export default NewBillActivity;
