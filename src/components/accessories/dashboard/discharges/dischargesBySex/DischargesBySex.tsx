import { FC, useEffect, useRef, useState } from "react";
import { TDashboardComponentProps } from "../../layouts/types";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useData } from "../useData";
import React from "react";
import { DashboardCard } from "../../card/DashboardCard";
import { DataSummary } from "../../summary/DataSummary";
import { TDashboardCardOptionActions } from "../../card/types";
import { Skeleton } from "@material-ui/lab";
import { getDischarges } from "../../../../../state/admissions/actions";
import { IOwnProps } from "../types";
import { toggleFullscreen } from "../../card/consts";
import { ListItemIcon } from "@material-ui/core";
import { Description, PictureAsPdf, SaveAlt } from "@material-ui/icons";

import "../../card/styles.scss";
import { Piechart } from "../../../charts/pie/Piechart";
import DataDownloadButton from "../../../dataDownloadButton/DataDownloadButton";
import { useDisBySexData } from "../../../../../libraries/dashboardUtils/discharges/useDisBySexData";

export const DischargesBySex: FC<TDashboardComponentProps & IOwnProps> = ({
  onRemove,
  onFullScreenEnter,
  period,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getDischarges({ dischargerange: period }));
  }, [dispatch, period]);

  const { total, success, status, data, csvData } = useDisBySexData();

  const [displaySize, setDisplaySize] =
    useState<{ width: number; height: number }>();

  const onSizeChange = (width: number, height: number) => {
    setDisplaySize({ width: width - 1, height: height - 73 });
  };

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
      {status === "LOADING" && (
        <div className="item">
          <Skeleton />
        </div>
      )}

      {success && (
        <DashboardCard
          cardRef={cardRef}
          title={t("admission.dischargebysex")}
          actions={actions}
          sizeChangeHandler={onSizeChange}
        >
          <Piechart
            data={data}
            width={displaySize?.width ? `${displaySize.width}px` : "320px"}
            height={displaySize?.height ? `${displaySize.height}px` : "320px"}
          />
          <DataSummary
            label={t("admission.disregistered")}
            value={total.toString()}
          />
        </DashboardCard>
      )}
    </>
  );
};
