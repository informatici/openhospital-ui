import { FC, useEffect, useRef, useState } from "react";
import { TDashboardComponentProps } from "../../layouts/types";
import { IOwnProps } from "../types";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { searchOpds } from "../../../../../state/opds/actions";
import { getAgeTypes } from "../../../../../state/ageTypes/actions";
import { TDashboardCardOptionActions } from "../../card/types";
import React from "react";
import { DashboardCard } from "../../card/DashboardCard";
import { DataSummary } from "../../summary/DataSummary";
import { Skeleton } from "@mui/lab";
import { Barchart } from "../../../charts/bar/Barchart";
import { useOpdByAgeTypeData } from "../../../../../libraries/dashboardUtils/opds/useOpdByAgeTypeData";
import DataDownloadButton from "../../../dataDownloadButton/DataDownloadButton";

import "../../card/styles.scss";

export const OpdByAgeTypes: FC<TDashboardComponentProps & IOwnProps> = ({
  onRemove,
  onFullScreenEnter,
  period,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
