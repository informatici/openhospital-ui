import { Receipt, Search } from "@material-ui/icons";
import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { TUserCredentials } from "../../../state/main/types";
import { IState } from "../../../types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../accessories/accordion/Accordion";
import Button from "../../accessories/button/Button";
import AppHeader from "../../accessories/appHeader/AppHeader";
import BillFilterForm from "../../accessories/billFilterForm/BillFilterForm";
import Footer from "../../accessories/footer/Footer";
import RouterTabs from "../../accessories/tabs/RouterTabs";
import { TTabConfig } from "../../accessories/tabs/types";
import "./styles.scss";
import Add from "@material-ui/icons/Add";
import { Redirect } from "react-router";
import { IBillSummary, TActivityTransitionState } from "./types";
import { BillTable } from "../../accessories/billTable/BillTable";
import { searchBills } from "../../../state/bills/actions";
import { computeBillSummary, initializeBillFilter } from "./config";
import ManageBillActivityContent from "../manageBillActivityContent/ManageBillActivityContent";
import { TFilterValues } from "../../accessories/billTable/types";
import { initialFilter } from "./consts";

export const ManageBillActivity: FC = () => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.billing")]: "/billing",
    [t("nav.newbill")]: "/bills",
    [t("nav.managebills")]: "/managebills",
  };
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState(initialFilter);

  const userCredentials = useSelector<IState, TUserCredentials>(
    (state) => state.main.authentication.data
  );

  const summary = useSelector<IState, IBillSummary>((state) =>
    computeBillSummary(
      state.bills.searchBills.data,
      filter.fromDate,
      filter.toDate,
      userCredentials?.displayName ?? ""
    )
  );

  const tabConfig: TTabConfig = [
    {
      label: t("bill.allbills"),
      path: "/allBills",
      content: (
        <ManageBillActivityContent
          title="All Bills"
          content={<BillTable status="ALL" filter={filter} />}
        />
      ),
    },
    {
      label: t("bill.pending"),
      path: "/pendingBills",
      content: (
        <ManageBillActivityContent
          title="Pending Bills"
          content={<BillTable status="PENDING" filter={filter} />}
        />
      ),
    },
    {
      label: t("bill.closed"),
      path: "/closedBills",
      content: (
        <ManageBillActivityContent
          title="Closed Bills"
          content={<BillTable status="CLOSE" filter={filter} />}
        />
      ),
    },
    {
      label: t("bill.deleted"),
      path: "/deletedBills",
      content: (
        <ManageBillActivityContent
          title="Deleted Bills"
          content={<BillTable status="DELETE" filter={filter} />}
        />
      ),
    },
  ];

  const submit = (filter: any) => {
    setFilter(filter);
    dispatch(searchBills(filter));
  };

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
                      <Accordion>
                        <AccordionSummary>
                          <Search fontSize="small" style={{ color: "white" }} />
                          <span> {t("bill.filter")}</span>
                        </AccordionSummary>
                        <AccordionDetails>
                          <BillFilterForm
                            className="searchBills__formData__item"
                            onSubmit={submit}
                            fields={initializeBillFilter(
                              filter.fromDate,
                              filter.toDate
                            )}
                          />
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary>
                          <Receipt
                            fontSize="small"
                            style={{ color: "white" }}
                          />
                          <span> {t("bill.recap")}</span>
                        </AccordionSummary>
                        <AccordionDetails>
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
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </div>
                </div>
                <div className="searchBills__content">
                  <RouterTabs config={tabConfig} defaultRoute={"/allBills"} />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
  }
};
