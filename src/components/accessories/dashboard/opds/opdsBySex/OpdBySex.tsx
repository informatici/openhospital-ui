import { FC, useEffect, useRef, useState } from "react";
import { TDashboardComponentProps } from "../../layouts/types";
import { IOwnProps } from "../types";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { searchOpds } from "../../../../../state/opds/actions";
import { TDashboardCardOptionActions } from "../../card/types";
import React from "react";
import { DashboardCard } from "../../card/DashboardCard";
import { Piechart } from "../../../charts/pie/Piechart";
import { DataSummary } from "../../summary/DataSummary";
import { Skeleton } from "@material-ui/lab";

import "../../card/styles.scss";
import { useOpdBySexData } from "../../../../../libraries/dashboardUtils/opds/useOpdBySexData";
import DataDownloadButton from "../../../dataDownloadButton/DataDownloadButton";

export const OpdBySex: FC<TDashboardComponentProps & IOwnProps> = ({
  onRemove,
  onFullScreenEnter,
  period,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const opdbysexcardref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(searchOpds({ dateFrom: period[0], dateTo: period[1] }));
  }, [dispatch, period]);

  const { status, data, success, total, csvData } = useOpdBySexData();

  const [displaySize, setDisplaySize] =
    useState<{ width: number; height: number }>();

  const onSizeChange = (width: number, height: number) => {
    setDisplaySize({ width: width - 1, height: height - 73 });
  };

  const downloadOptions = (
    <DataDownloadButton
      csvData={csvData}
      title={t("opd.opdbysex").replace(/ /g, "-")}
      graphRef={opdbysexcardref}
    />
  );

  const actions: TDashboardCardOptionActions = {
    onClose: onRemove ? () => onRemove() : undefined,
    onExpand: onFullScreenEnter ? () => onFullScreenEnter() : undefined,
    downloadButton: downloadOptions,
  };

  return (
    <>
      {status === "LOADING" && (
        <div className="item">
          <Skeleton />
        </div>
      )}

      {success && (
        <DashboardCard
          cardRef={opdbysexcardref}
          title={t("opd.opdbysex")}
          actions={actions}
          sizeChangeHandler={onSizeChange}
        >
          <Piechart
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
