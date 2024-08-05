import { FC, useEffect, useRef, useState } from "react";
import { TDashboardComponentProps } from "../../layouts/types";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "libraries/hooks/redux";
import React from "react";
import { DashboardCard } from "../../card/DashboardCard";
import { DataSummary } from "../../summary/DataSummary";
import { TDashboardCardOptionActions } from "../../card/types";
import { Skeleton } from "@mui/lab";
import { getDischarges } from "../../../../../state/admissions";
import { IOwnProps } from "../types";
import { Piechart } from "../../../charts/pie/Piechart";
import DataDownloadButton from "../../../dataDownloadButton/DataDownloadButton";
import { useDisByDisTypeData } from "../../../../../libraries/dashboardUtils/discharges/useDisByDisTypeData";

import "../../card/styles.scss";
import { getDischargeTypes } from "../../../../../state/types/discharges";

export const DischargesByTypes: FC<TDashboardComponentProps & IOwnProps> = ({
  onRemove,
  onFullScreenEnter,
  period,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getDischargeTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDischarges({ dischargerange: period }));
  }, [dispatch, period]);

  const { total, success, status, dischargeTypeStatus, data, csvData } =
    useDisByDisTypeData();

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
      title={t("admission.dischargebytype").replace(/ /g, "-")}
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
      {(status === "LOADING" || dischargeTypeStatus === "LOADING") && (
        <div className="item">
          <Skeleton />
        </div>
      )}

      {success && dischargeTypeStatus === "SUCCESS" && (
        <DashboardCard
          cardRef={cardRef}
          title={t("admission.dischargebytype")}
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
