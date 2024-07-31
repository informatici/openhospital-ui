import { FC, useEffect, useRef, useState } from "react";
import { TDashboardComponentProps } from "../../layouts/types";
import { useTranslation } from "react-i18next";
import { useDispatch } from "libraries/hooks/redux";
import React from "react";
import { DashboardCard } from "../../card/DashboardCard";
import { Barchart } from "../../../charts/bar/Barchart";
import { DataSummary } from "../../summary/DataSummary";
import { TDashboardCardOptionActions } from "../../card/types";
import { Skeleton } from "@mui/lab";
import { getAdmissions } from "../../../../../state/admissions";
import { getAgeTypes } from "../../../../../state/ageTypes";
import { IOwnProps } from "../types";
import { useAdmByAgeTypeData } from "../../../../../libraries/dashboardUtils/admissions/useAdmByAgeTypeData";
import DataDownloadButton from "../../../dataDownloadButton/DataDownloadButton";

import "../../card/styles.scss";

export const AdmissionsByAgeType: FC<TDashboardComponentProps & IOwnProps> = ({
  onRemove,
  onFullScreenEnter,
  period,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getAgeTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAdmissions({ admissionrange: period }));
  }, [period]);

  const { total, success, status, ageTypeStatus, data, csvData } =
    useAdmByAgeTypeData();

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
          <Barchart
            data={data}
            width={displaySize?.width ? `${displaySize.width}px` : "320px"}
            height={displaySize?.height ? `${displaySize.height}px` : "320px"}
          />
          <DataSummary
            label={t("admission.admregistered")}
            value={total.toString()}
          />
        </DashboardCard>
      )}
    </>
  );
};
