import { Receipt, Search } from "@material-ui/icons";
import classNames from "classnames";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
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
import SkeletonLoader from "../../accessories/skeletonLoader/SkeletonLoader";
import RouterTabs from "../../accessories/tabs/RouterTabs";
import { TTabConfig } from "../../accessories/tabs/types";
import SearchBillActivityContent from "../searchBillActivityContent/SearchBillActivityContent";
import "./styles.scss";
import Add from "@material-ui/icons/Add";
import { Redirect } from "react-router";
import { TActivityTransitionState } from "./types";
import { BillTable } from "../../accessories/billTable/BillTable";

export const SearchBillActivity: FC = () => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.billing")]: "/billing",
    [t("nav.newbill")]: "/bills",
    [t("nav.searchbill")]: "/searchbills",
  };
  const [expanded, setExpanded] = useState<string | false>("form");
  const [isOpen, setIsOpen] = useState(false);
  const summary = {
    today: 500,
    todayNotPaid: 0,
    period: 1000,
    periodNotPaid: 0,
    user: 0,
    userNotPaid: 0,
    totalpaid: 1000,
    totalnotpaid: 0,
  };
  const tabConfig: TTabConfig = [
    {
      label: t("bill.allbills"),
      path: "/allBills",
      content: (
        <SearchBillActivityContent
          title="All Bills"
          content={<BillTable status="ALL" />}
        />
      ),
    },
    {
      label: t("bill.pending"),
      path: "/pendingBills",
      content: (
        <SearchBillActivityContent
          title="Pending Bills"
          content={<BillTable status="PENDING" />}
        />
      ),
    },
    {
      label: t("bill.closed"),
      path: "/closedBills",
      content: (
        <SearchBillActivityContent
          title="closed Bills"
          content={<BillTable status="CLOSE" />}
        />
      ),
    },
    {
      label: t("bill.deleted"),
      path: "/deletedBills",
      content: (
        <SearchBillActivityContent
          title="Deleted Bills"
          content={<BillTable status="DELETE" />}
        />
      ),
    },
  ];

  const userCredentials = useSelector<IState, TUserCredentials>(
    (state) => state.main.authentication.data
  );
  const submit = (filter: any) => {};

  const handleOnExpanded = (section: string) => {
    setExpanded(section === expanded ? "form" : section);
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
                      <Accordion expanded={expanded === "form"}>
                        <AccordionSummary
                          onClick={() => handleOnExpanded("form")}
                        >
                          <Search fontSize="small" style={{ color: "white" }} />
                          <span>Bills Filter</span>
                        </AccordionSummary>
                        <AccordionDetails>
                          <BillFilterForm
                            theme="light"
                            className="searchBills__formData__item"
                            onSubmit={submit}
                          />
                        </AccordionDetails>
                      </Accordion>
                      <Accordion expanded={expanded === "details"}>
                        <AccordionSummary
                          onClick={() => handleOnExpanded("details")}
                        >
                          <Receipt
                            fontSize="small"
                            style={{ color: "white" }}
                          />
                          <span>Bills Recap</span>
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
                          <div className="searchBills__formData__item">
                            <div className="searchBills__formData__item__label">
                              {t("bill.totalpaid")}:
                            </div>
                            <div className="searchBills__formData__item__value">
                              {summary.totalpaid || "-"}
                            </div>
                          </div>
                          <div className="searchBills__formData__item">
                            <div className="searchBills__formData__item__label">
                              {t("bill.totalnotpaid")}:
                            </div>
                            <div className="searchBills__formData__item__value">
                              {summary.totalnotpaid || "-"}
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
