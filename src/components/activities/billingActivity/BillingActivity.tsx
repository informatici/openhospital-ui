import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { TUserCredentials } from "../../../state/main/types";
import { IState } from "../../../types";
import Button from "../../accessories/button/Button";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import "./styles.scss";
import Add from "@material-ui/icons/Add";
import { Redirect } from "react-router";
import { TActivityTransitionState } from "./types";
import { BillTable } from "../../accessories/billTable/BillTable";

import { PaymentsTable } from "../../accessories/paymentsTable/PaymentsTable";
import {
  FilterBillsInitialFields,
  paymentsFilterInitialFields,
} from "./consts";

const BillingActivity: FC = () => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.billing")]: "/billing",
  };

  const userCredentials = useSelector<IState, TUserCredentials>(
    (state) => state.main.authentication.data
  );

  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("TO_BILLS");

  switch (activityTransitionState) {
    case "TO_NEW_BILL":
      return <Redirect to={`/search`} />;
    default:
      return (
        <div className="billing">
          <AppHeader
            userCredentials={userCredentials}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="billing__background">
            <div className="billing__content">
              {activityTransitionState === "TO_BILLS" && (
                <div className="billing__title">{t("nav.billing")}</div>
              )}
              {activityTransitionState === "TO_PAYMENTS" && (
                <div className="billing__title">{t("bill.payments")}</div>
              )}
              <div className="billing_actions">
                <Button
                  onClick={() => setActivityTransitionState("TO_NEW_BILL")}
                  type="button"
                  variant="text"
                >
                  <Add fontSize="small" /> {t("bill.newbill")}
                </Button>
                <Button
                  onClick={() => setActivityTransitionState("TO_PAYMENTS")}
                  type="button"
                  variant={
                    activityTransitionState === "TO_PAYMENTS"
                      ? "outlined"
                      : "text"
                  }
                >
                  {t("bill.payments")}
                </Button>

                <Button
                  onClick={() => setActivityTransitionState("TO_BILLS")}
                  type="button"
                  variant={
                    activityTransitionState === "TO_BILLS" ? "outlined" : "text"
                  }
                >
                  {t("bill.bills")}
                </Button>
              </div>
              {activityTransitionState === "TO_BILLS" && (
                <BillTable fields={FilterBillsInitialFields} />
              )}
              {activityTransitionState === "TO_PAYMENTS" && (
                <PaymentsTable fields={paymentsFilterInitialFields} />
              )}
            </div>
          </div>
          <Footer />
        </div>
      );
  }
};

export default BillingActivity;
