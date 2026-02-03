import { useAppDispatch } from "libraries/hooks/redux";
import React, { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAdmByAgeTypeData } from "../../../../../libraries/dashboardUtils/admissions/useAdmByAgeTypeData";
import { getAdmissions } from "../../../../../state/admissions";
import { Barchart } from "../../../charts/bar/Barchart";
import DataDownloadButton from "../../../dataDownloadButton/DataDownloadButton";
import { DashboardCard } from "../../card/DashboardCard";
import { TDashboardCardOptionActions } from "../../card/types";
import { TDashboardComponentProps } from "../../layouts/types";
import { DataSummary } from "../../summary/DataSummary";
import { IOwnProps } from "../types";

import { Skeleton } from "@mui/material";
import { getAgeTypes } from "state/types/ageTypes";
import "../../card/styles.scss";
import { useDisplaySize } from "../../hooks";

export const AdmissionsByAgeType: FC<TDashboardComponentProps & IOwnProps> = ({
  onRemove,
  onFullScreenEnter,
  period,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getAgeTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAdmissions({ admissionrange: period }));
  }, [period, dispatch]);

  const { total, success, status, ageTypeStatus, data, csvData } =
    useAdmByAgeTypeData();

  const { displaySize, onSizeChange } = useDisplaySize();

  const downloadOptions = (
    <DataDownloadButton
      csvData={csvData}
      title={t("admission.admissionbyagetype").replace(/ /g, "-")}
      graphRef={cardRef}
    />
  );

  const actions: TDashboardCardOptionActions = {
    onClose: onRemove ? () => onRemove() : undefined,

    onExpand: onFullScreenEnter ? () => onFullScreenEnter() : undefined,

    downloadButton: downloadOptions,
  };

  return (
    <>
      {(status === "LOADING" || ageTypeStatus === "LOADING") && (
        <div className="item">
          <Skeleton />
        </div>
      )}

      {success && ageTypeStatus === "SUCCESS" && (
        <DashboardCard
          cardRef={cardRef}
          title={t("admission.admissionbyagetype")}
          actions={actions}
          sizeChangeHandler={onSizeChange}
        >
          <Barchart data={data} width={"100%"} height={"calc(100% - 75px)"} />
          <DataSummary
            label={t("admission.admregistered")}
            value={total.toString()}
          />
        </DashboardCard>
      )}
    </>
  );
};
