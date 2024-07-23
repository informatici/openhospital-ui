import { FC, useEffect, useRef, useState } from "react";
import { TDashboardComponentProps } from "../../layouts/types";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import React from "react";
import { DashboardCard } from "../../card/DashboardCard";
import { DataSummary } from "../../summary/DataSummary";
import { TDashboardCardOptionActions } from "../../card/types";
import { Skeleton } from "@mui/lab";
import { getDischarges } from "../../../../../state/admissions/actions";
import { IOwnProps } from "../types";
import { getWards } from "../../../../../state/ward/actions";
import { Barchart } from "../../../charts/bar/Barchart";
import { useDisByWardData } from "../../../../../libraries/dashboardUtils/discharges/useDisByWardData";
import DataDownloadButton from "../../../dataDownloadButton/DataDownloadButton";

import "../../card/styles.scss";

export const DischargesByWards: FC<TDashboardComponentProps & IOwnProps> = ({
  onRemove,
  onFullScreenEnter,
  period,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDischarges({ dischargerange: period }));
    dispatch(getWards());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDischarges({ dischargerange: period }));
  }, [period]);

  const { total, success, status, wardStatus, data, csvData } =
    useDisByWardData();
  const cardRef = useRef<HTMLDivElement>(null);

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
      title={t("admission.dischargebywards").replace(/ /g, "-")}
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
      {(status === "LOADING" || wardStatus === "LOADING") && (
        <div className="item">
          <Skeleton />
        </div>
      )}

      {success && wardStatus === "SUCCESS" && (
        <DashboardCard
          cardRef={cardRef}
          title={t("admission.dischargebywards")}
          actions={actions}
          sizeChangeHandler={onSizeChange}
        >
          <Barchart
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
