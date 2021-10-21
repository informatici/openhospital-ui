import { Receipt } from "@material-ui/icons";
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
import Add from "@material-ui/icons/Add";
import { Redirect } from "react-router";
import { IBillSummary, TActivityTransitionState } from "./types";
import { BillTable } from "../../accessories/billTable/BillTable";
import ManageBillActivityContent from "../manageBillActivityContent/ManageBillActivityContent";

import { TBillFilterValues } from "../../accessories/billFilterForm/types";
import { PaymentsTable } from "../../accessories/paymentsTable/PaymentsTable";
import {
  FilterBillsInitialFields,
  paymentsFilterInitialFields,
} from "./consts";

export const ManageBillActivity: FC = () => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.billing")]: "/billing",
    [t("nav.newbill")]: "/bills",
    [t("nav.managebills")]: "/managebills",
  };

  const [isOpen, setIsOpen] = useState(false);
  const userCredentials = useSelector<IState, TUserCredentials>(
    (state) => state.main.authentication.data
  );
  const [summary, billSummaryChange] = useState({} as IBillSummary);

  const tabConfig: TTabConfig = [
    {
      label: t("bill.bills"),
      path: "/billstable",
      content: (
        <ManageBillActivityContent
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

    {
      label: t("bill.payments"),
      path: "/billpayments",
      content: (
        <ManageBillActivityContent
          title="Payments"
          content={<PaymentsTable fields={paymentsFilterInitialFields} />}
        />
      ),
    },
  ];

  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

  switch (activityTransitionState) {
    case "TO_NEW_BILL":
      return <Redirect to={`/bills`} />;
    default:
      return (
        <div className="searchBills">
          <AppHeader
            userCredentials={userCredentials}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="searchBills__background">
            <div className="container">
              <div className="searchBills__panel">
                <div
                  className={classNames("searchBills__formData", {
                    open_sidebar: isOpen,
                  })}
                >
                  <div
                    className="searchBills__formData__trigger_mobile"
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
                  <div className="searchBills__formData_sidebar">
                    <div className="searchBills__formData_edit_button_wrapper">
                      <div className="searchBills__formData_edit_button">
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
                    <div className="searchBills__user_info">
                      <div className="sidebar__section">
                        <div className="sidebar__section__header">
                          <Receipt
                            fontSize="small"
                            style={{ color: "white" }}
                          />
                          <span> {t("bill.recap")}</span>
                        </div>
                        <div>
                          <div className="searchBills__formData__item">
                            <div className="searchBills__formData__item__label">
                              {t("bill.today")}:
                            </div>
                            <div className="searchBills__formData__item__value">
                              {summary.today || "-"}
                            </div>
                          </div>
                          <div className="searchBills__formData__item">
                            <div className="searchBills__formData__item__label">
                              {t("bill.notpaid")}:
                            </div>
                            <div className="searchBills__formData__item__value">
                              {summary.todayNotPaid || "-"}
                            </div>
                          </div>
                          <div className="searchBills__formData__item">
                            <div className="searchBills__formData__item__label">
                              {t("bill.period")}:
                            </div>
                            <div className="searchBills__formData__item__value">
                              {summary.period || "-"}
                            </div>
                          </div>
                          <div className="searchBills__formData__item">
                            <div className="searchBills__formData__item__label">
                              {t("bill.notpaid")}:
                            </div>
                            <div className="searchBills__formData__item__value">
                              {summary.periodNotPaid || "-"}
                            </div>
                          </div>
                          <div className="searchBills__formData__item">
                            <div className="searchBills__formData__item__label">
                              {t("bill.user")}:
                            </div>
                            <div className="searchBills__formData__item__value">
                              {summary.user || "-"}
                            </div>
                          </div>
                          <div className="searchBills__formData__item">
                            <div className="searchBills__formData__item__label">
                              {t("bill.notpaid")}:
                            </div>
                            <div className="searchBills__formData__item__value">
                              {summary.userNotPaid || "-"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="searchBills__content">
                  <RouterTabs config={tabConfig} defaultRoute={"/billstable"} />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
  }
};
