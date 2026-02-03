import { Skeleton } from "@mui/material";
import { useAppDispatch } from "libraries/hooks/redux";
import React, { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { getAgeTypes } from "state/types/ageTypes";
import { useDisByAgeTypeData } from "../../../../../libraries/dashboardUtils/discharges/useDisByAgeTypeData";
import { getDischarges } from "../../../../../state/admissions";
import { Barchart } from "../../../charts/bar/Barchart";
import DataDownloadButton from "../../../dataDownloadButton/DataDownloadButton";
import { DashboardCard } from "../../card/DashboardCard";
import { TDashboardCardOptionActions } from "../../card/types";
import { TDashboardComponentProps } from "../../layouts/types";
import { DataSummary } from "../../summary/DataSummary";
import { IOwnProps } from "../types";

import "../../card/styles.scss";
import { useDisplaySize } from "../../hooks";

export const DischargesByAgeTypes: FC<TDashboardComponentProps & IOwnProps> = ({
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
    dispatch(getDischarges({ dischargerange: period }));
  }, [dispatch, period]);

  const { total, success, status, ageTypeStatus, data, csvData } =
    useDisByAgeTypeData();

  const { displaySize, onSizeChange } = useDisplaySize();

  const downloadOptions = (
    <DataDownloadButton
      csvData={csvData}
      title={t("admission.dischargebysex").replace(/ /g, "-")}
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
          title={t("admission.dischargebyagetype")}
          actions={actions}
          sizeChangeHandler={onSizeChange}
        >
          <Barchart data={data} width={"100%"} height={"calc(100% - 75px)"} />
          <DataSummary
            label={t("admission.disregistered")}
            value={total.toString()}
          />
        </DashboardCard>
      )}
    </>
  );
};
