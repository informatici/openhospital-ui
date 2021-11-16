import {
  Assignment,
  Equalizer,
  LocalHotel,
  Payment,
  Receipt,
} from "@material-ui/icons";
import classNames from "classnames";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { TUserCredentials } from "../../../state/main/types";
import { IState } from "../../../types";
import Button from "../../accessories/button/Button";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import RouterTabs from "../../accessories/tabs/RouterTabs";
import { TTabConfig } from "../../accessories/tabs/types";
import "./styles.scss";
import Arrow from "../../../assets/arrow-w.svg";
import Add from "@material-ui/icons/Add";
import { Redirect } from "react-router";
import {
  IBillingSection,
  IBillSummary,
  TActivityTransitionState,
} from "./types";
import { BillTable } from "../../accessories/billTable/BillTable";
import ManageBillingActivityContent from "../manageBillingActivityContent/ManageBillingActivityContent";

import { PaymentsTable } from "../../accessories/paymentsTable/PaymentsTable";
import {
  FilterBillsInitialFields,
  paymentsFilterInitialFields,
} from "./consts";
import { currencyFormat } from "../../../libraries/formatUtils/currencyFormatting";
import SkeletonLoader from "../../accessories/skeletonLoader/SkeletonLoader";

const BillingActivity: FC = () => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.billing")]: "/billing",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [billSection, setBillSection] = useState<IBillingSection>("dashboard");
  const [defaultRoute, setDefaultRoute] = useState("/dashboard");
  const userCredentials = useSelector<IState, TUserCredentials>(
    (state) => state.main.authentication.data
  );
  const [summary, billSummaryChange] = useState({} as IBillSummary);

  const dashboardConfig: TTabConfig = [
    {
      label: t("bill.dashboard"),
      path: "/dashboard",
      content: (
        <ManageBillingActivityContent
          title="Dashboard"
          content={<SkeletonLoader />}
        />
      ),
    },
  ];

  const billsConfig: TTabConfig = [
    {
      label: t("bill.bills"),
      path: "/bills",
      content: (
        <ManageBillingActivityContent
          title="Bills"
          content={
            <BillTable
              fields={FilterBillsInitialFields}
              handleSummaryChange={billSummaryChange}
            />
          }
        />
      ),
    },
  ];

  const paymentsConfig: TTabConfig = [
    {
      label: t("bill.payments"),
      path: "/payments",
      content: (
        <ManageBillingActivityContent
          title="Payments"
          content={<PaymentsTable fields={paymentsFilterInitialFields} />}
        />
      ),
    },
  ];

  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

  const isActive = (value: string) => {
    return value === billSection ? "active" : "default";
  };

  const getRouteConfig = () => {
    switch (billSection) {
      case "dashboard":
        return dashboardConfig;
      case "bills":
        return billsConfig;
      case "payments":
        return paymentsConfig;
    }
  };

  switch (activityTransitionState) {
    case "TO_NEW_BILL":
      return <Redirect to={`/billing/new`} />;
    default:
      return (
        <div className="billing">
          <AppHeader
            userCredentials={userCredentials}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="billing__background">
            <div className="container">
              <div className="billing__panel">
                <div
                  className={classNames("billing__formData", {
                    open_sidebar: isOpen,
                  })}
                >
                  <div
                    className="billing__formData__trigger_mobile"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {userCredentials?.displayName || "-"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="arrow_icon"
                      data-name="Layer 1"
                      viewBox="0 0 24 30"
                      x="0px"
                      y="0px"
                    >
                      <polygon points="12 17.02 4.08 9.1 5.5 7.69 12 14.19 18.5 7.69 19.92 9.1 12 17.02" />
                    </svg>
                  </div>
                  <div className="billing__formData_sidebar">
                    <div className="billing__formData_edit_button_wrapper">
                      <div className="billing__formData_edit_button">
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            setActivityTransitionState("TO_NEW_BILL")
                          }
                        >
                          <Add fontSize="small" style={{ color: "white" }} />
                          <span>{t("bill.newbill")}</span>
                        </Button>
                      </div>
                    </div>

                    <div className="patientDetails__main_menu">
                      <h6>{t("bill.billSection")}</h6>

                      <div
                        className={
                          "patientDetails__main_menu__item " +
                          isActive("dashboard")
                        }
                        onClick={() => {
                          setBillSection("dashboard");
                          setDefaultRoute("/dashboard");
                        }}
                      >
                        <Equalizer
                          fontSize="small"
                          style={{
                            color: "white",
                          }}
                        />
                        <span>{t("bill.dashboard")}:</span>
                        <img
                          src={Arrow}
                          className="icon_toggle"
                          alt="Accordion toogle"
                        />
                      </div>

                      <div
                        className={
                          "align__element patientDetails__main_menu__item " +
                          isActive("bills")
                        }
                        onClick={() => {
                          setBillSection("bills");
                          setDefaultRoute("/bills");
                        }}
                      >
                        <Assignment
                          fontSize="small"
                          style={{ color: "white" }}
                        />
                        <span>{t("bill.bills")}:</span>
                        <img
                          src={Arrow}
                          className="icon_toggle"
                          alt="Accordion toogle"
                        />
                      </div>
                      <div
                        className={
                          "align__element patientDetails__main_menu__item " +
                          isActive("payments")
                        }
                        onClick={() => {
                          setBillSection("payments");
                          setDefaultRoute("/payments");
                        }}
                      >
                        <Payment fontSize="small" style={{ color: "white" }} />
                        <span>{t("bill.payments")}</span>
                        <img
                          src={Arrow}
                          className="icon_toggle"
                          alt="Accordion toogle"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="billing__content">
                  <RouterTabs
                    config={getRouteConfig()}
                    defaultRoute={defaultRoute}
                  />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
  }
};

export default BillingActivity;
