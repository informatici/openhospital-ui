import { Skeleton } from "@mui/material";
import { useAppDispatch } from "libraries/hooks/redux";
import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOpdByAgeTypeData } from "../../../../../libraries/dashboardUtils/opds/useOpdByAgeTypeData";
import { getAgeTypes } from "../../../../../state/ageTypes";
import { searchOpds } from "../../../../../state/opds";
import { Barchart } from "../../../charts/bar/Barchart";
import DataDownloadButton from "../../../dataDownloadButton/DataDownloadButton";
import { DashboardCard } from "../../card/DashboardCard";
import { TDashboardCardOptionActions } from "../../card/types";
import { TDashboardComponentProps } from "../../layouts/types";
import { DataSummary } from "../../summary/DataSummary";
import { IOwnProps } from "../types";

import "../../card/styles.scss";

export const OpdByAgeTypes: FC<TDashboardComponentProps & IOwnProps> = ({
  onRemove,
  onFullScreenEnter,
  period,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(searchOpds({ dateFrom: period[0], dateTo: period[1] }));
    dispatch(getAgeTypes());
  }, [dispatch, period]);

  const { status, ageTypeStatus, data, success, total, csvData } =
    useOpdByAgeTypeData();

  const [displaySize, setDisplaySize] = useState<{
    width: number;
    height: number;
  }>();

  const onSizeChange = (width: number, height: number) => {
    setDisplaySize({ width: width - 1, height: height - 73 });
  };

  const downloadOptions = (
    <DataDownloadButton
      csvData={csvData}
      title={t("opd.opdbyagetype").replace(/ /g, "-")}
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
      {status === "LOADING" ||
        (ageTypeStatus === "LOADING" && (
          <div className="item">
            <Skeleton />
          </div>
        ))}

      {success && ageTypeStatus === "SUCCESS" && (
        <DashboardCard
          cardRef={cardRef}
          title={t("opd.opdbyagetype")}
          actions={actions}
          sizeChangeHandler={onSizeChange}
        >
          <Barchart
            data={data}
            width={displaySize?.width ? `${displaySize.width}px` : "320px"}
            height={displaySize?.height ? `${displaySize.height}px` : "320px"}
          />
          <DataSummary
            label={t("opd.opdregistered")}
            value={total.toString()}
          />
        </DashboardCard>
      )}
    </>
  );
};
