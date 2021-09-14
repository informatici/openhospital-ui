import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { TUserCredentials } from "../../../state/main/types";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import BillFilterForm from "../../accessories/billFilterForm/BillFilterForm";

export const SearchBillActivity: FC = () => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.dashboard")]: "/",
    [t("nav.billing")]: "/billing",
    [t("nav.searchbill")]: "/searchbills",
  };

  const userCredentials = useSelector<IState, TUserCredentials>(
    (state) => state.main.authentication.data
  );
  const submit = (filter: any) => {};

  return (
    <div className="searchBills">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="searchBills__content">
        <BillFilterForm onSubmit={submit} />
      </div>
    </div>
  );
};
