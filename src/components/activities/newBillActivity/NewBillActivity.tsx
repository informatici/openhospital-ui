import React, { FC, useEffect, useRef, useState } from "react";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import { useTranslation } from "react-i18next";
import "./styles.scss";

import SkeletonLoader from "../../accessories/skeletonLoader/SkeletonLoader";
import { useSelector } from "react-redux";
import { IState } from "../../../types";
import { TUserCredentials } from "../../../state/main/types";
import BillDataForm from "../../accessories/billDataForm/BillDataForm";
import { TActivityTransitionState } from "../billingActivity/types";
import { FullBillDTO } from "../../../generated";
import PatientBill from "../../accessories/patientBill/PatientBill";

const NewBillActivity: FC = () => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.newbill")]: "/bills",
  };
  const userCredentials = useSelector<IState, TUserCredentials>(
    (state) => state.main.authentication.data
  );

  const onSubmit = (patient: FullBillDTO) => {};

  const [activityTransitionState, setActivityTransitionState] =
    useState<TActivityTransitionState>("IDLE");

  useEffect(() => {
    if (
      activityTransitionState === "TO_NEW_BILL" ||
      activityTransitionState === "TO_MANAGE_BILL"
    ) {
      setShouldResetForm(true);
    }
  }, [activityTransitionState]);

  const infoBoxRef = useRef<HTMLDivElement>(null);

  const [shouldResetForm, setShouldResetForm] = useState(false);

  const resetFormCallback = () => {
    setShouldResetForm(false);
    setActivityTransitionState("IDLE");
  };

  return (
    <div className="newBill">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="newBill__background">
        <div className="newBill__content">
          <div className="newBill__title">{t("nav.newbill")}</div>
          <PatientBill />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewBillActivity;
