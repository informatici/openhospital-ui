import { FC, useEffect, useRef, useState } from "react";
import { TDashboardComponentProps } from "../../layouts/types";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import React from "react";
import { DashboardCard } from "../../card/DashboardCard";
import { DataSummary } from "../../summary/DataSummary";
import { TDashboardCardOptionActions } from "../../card/types";
import { Skeleton } from "@material-ui/lab";
import { getAdmissions } from "../../../../../state/admissions/actions";
import { IOwnProps } from "../types";
import { getWards } from "../../../../../state/ward/actions";
import { Barchart } from "../../../charts/bar/Barchart";
import DataDownloadButton from "../../../dataDownloadButton/DataDownloadButton";
import { useAdmByAdmWardData } from "../../../../../libraries/dashboardUtils/admissions/useAdmByWardData";

import "../../card/styles.scss";

export const AdmissionsByWards: FC<TDashboardComponentProps & IOwnProps> = ({
  onRemove,
  onFullScreenEnter,
  period,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //dispatch(getAdmissions({ admissionrange: period }));
    dispatch(getWards());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAdmissions({ admissionrange: period }));
  }, [period]);

  const { total, success, status, wardStatus, data, csvData } =
    useAdmByAdmWardData();

  const [displaySize, setDisplaySize] =
    useState<{ width: number; height: number }>();

  const onSizeChange = (width: number, height: number) => {
    setDisplaySize({ width: width - 1, height: height - 73 });
  };

  const downloadOptions = (
    <DataDownloadButton
      csvData={csvData}
      title={t("admission.admissionbywards").replace(/ /g, "-")}
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
          title={t("admission.admissionbywards")}
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
