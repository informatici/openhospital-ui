import React, { FunctionComponent, useState } from "react";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import { TActivityTransitionState, TProps } from "./types";
import { Trans, useTranslation } from "react-i18next";
import "./styles.scss";
import PlusIcon from "../../../assets/PlusIcon";
import LargeButton from "../../accessories/largeButton/LargeButton";
import { Redirect } from "react-router";
import { MoneyRounded } from "@material-ui/icons";

const BillingActivity: FunctionComponent<TProps> = ({ userCredentials }) => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.billing")]: "/bill",
  };

  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

  switch (activityTransitionState) {
    case "TO_NEW_BILL":
      return <Redirect to={"/bills"} />;
    case "TO_MANAGE_BILL":
      return <Redirect to={"/managebills"} />;
    default:
      return (
        <div className="billing">
          <AppHeader
            userCredentials={userCredentials ? userCredentials : {}}
            breadcrumbMap={breadcrumbMap}
          />
          <div className="billing__background">
            <div className="billing__title">
              <Trans
                i18nKey="bill.title"
                values={{ name: userCredentials?.displayName }}
              />
            </div>
            <div className="billing__actions">
              <div className="billing__actions__button">
                <LargeButton
                  handleClick={() => setActivityTransitionState("TO_NEW_BILL")}
                >
                  <div className="largeButton__inner">
                    <PlusIcon />
                    <div className="largeButton__inner__label">
                      {t("nav.newbill")}
                    </div>
                  </div>
                </LargeButton>
              </div>
              <div className="billing__actions__button">
                <LargeButton
                  handleClick={() =>
                    setActivityTransitionState("TO_MANAGE_BILL")
                  }
                >
                  <div className="largeButton__inner">
                    <MoneyRounded width="43" height="43" />
                    <div
                      id="manage__bills__button"
                      className="largeButton__inner__label"
                    >
                      {t("nav.managebills")}
                    </div>
                  </div>
                </LargeButton>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
  }
};

export default BillingActivity;
