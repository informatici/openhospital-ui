import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import "./styles.scss";

import { useAppSelector } from "libraries/hooks/redux";
import SkeletonLoader from "../../accessories/skeletonLoader/SkeletonLoader";

const NewBillingActivity: FC = () => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.billing")]: "/billing",
    [t("nav.newbill")]: "/billing/new",
  };
  const userCredentials = useAppSelector(
    (state) => state.main.authentication.data
  );
  return (
    <div className="newBill">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="newBill__background">
        <div className="newBill__content">
          <div className="newBill__title">{t("nav.newbill")}</div>
          <div style={{ marginBottom: "100px" }}>
            <SkeletonLoader />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewBillingActivity;
