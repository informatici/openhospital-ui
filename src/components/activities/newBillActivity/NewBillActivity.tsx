import React, { FC } from "react";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import { useTranslation } from "react-i18next";
import "./styles.scss";

import SkeletonLoader from "../../accessories/skeletonLoader/SkeletonLoader";
import { useSelector } from "react-redux";
import { IState } from "../../../types";
import { TUserCredentials } from "../../../state/main/types";
import BillDataForm from "../../accessories/billDataForm/BillDataForm";

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
    <div className="newBill">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="newBill__background">
        <div className="newBill__content">
          <div className="newBill__title">{t("nav.newbill")}</div>
          <BillDataForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewBillActivity;
