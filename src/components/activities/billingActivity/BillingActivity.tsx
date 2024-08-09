import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import AppHeader from "../../accessories/appHeader/AppHeader";
import { BillTable } from "../../accessories/billTable/BillTable";
import Footer from "../../accessories/footer/Footer";
import "./styles.scss";

import { PaymentsTable } from "../../accessories/paymentsTable/PaymentsTable";
import RouterTabs from "../../accessories/tabs/RouterTabs";
import ManageBillingActivityContent from "../manageBillingActivityContent/ManageBillingActivityContent";
import {
  FilterBillsInitialFields,
  paymentsFilterInitialFields,
} from "./consts";

import { useAppSelector } from "../../../libraries/hooks/redux";
import { BillsRecap } from "../../accessories/billsRecap/BillsRecap";
import { TTabConfig } from "../../accessories/tabs/types";

const BillingActivity: FC = () => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.billing")]: "/billing",
  };
  const billingConfigs: TTabConfig = [
    {
      label: t("bill.dashboard"),
      path: "/dashboard",
      content: <ManageBillingActivityContent content={<BillsRecap />} />,
    },
    {
      label: t("bill.bills"),
      path: "/bills",
      content: (
        <ManageBillingActivityContent
          content={<BillTable fields={FilterBillsInitialFields} />}
        />
      ),
    },
    {
      label: t("bill.payments"),
      path: "/payments",
      content: (
        <ManageBillingActivityContent
          content={<PaymentsTable fields={paymentsFilterInitialFields} />}
        />
      ),
    },
  ];

  const getRouteConfig = () => {
    return billingConfigs;
  };
  const userCredentials = useAppSelector(
    (state) => state.main.authentication.data
  );

  return (
    <div className="billing">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="billing__background">
        <div className="billing__content">
          <RouterTabs config={getRouteConfig()} defaultRoute="/dashboard" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BillingActivity;
