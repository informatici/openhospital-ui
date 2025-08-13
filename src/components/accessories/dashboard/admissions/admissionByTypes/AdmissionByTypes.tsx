import { Skeleton } from "@mui/material";
import { useAppDispatch } from "libraries/hooks/redux";
import React, { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAdmByAdmTypeData } from "../../../../../libraries/dashboardUtils/admissions/useAdmByAdmTypeData";
import { getAdmissions } from "../../../../../state/admissions";
import { Piechart } from "../../../charts/pie/Piechart";
import DataDownloadButton from "../../../dataDownloadButton/DataDownloadButton";
import { DashboardCard } from "../../card/DashboardCard";
import { TDashboardCardOptionActions } from "../../card/types";
import { TDashboardComponentProps } from "../../layouts/types";
import { DataSummary } from "../../summary/DataSummary";
import { IOwnProps } from "../types";

import { getAdmissionTypes } from "../../../../../state/types/admissions";
import "../../card/styles.scss";
import { useDisplaySize } from "../../hooks";

export const AdmissionsByTypes: FC<TDashboardComponentProps & IOwnProps> = ({
  onRemove,
  onFullScreenEnter,
  period,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const admtcardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getAdmissionTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAdmissions({ admissionrange: period }));
  }, [period, dispatch]);

  const { total, success, status, admissionTypeStatus, data, csvData } =
    useAdmByAdmTypeData();

  const { displaySize, onSizeChange } = useDisplaySize();

  const downloadOptions = (
    <DataDownloadButton
      csvData={csvData}
      title={t("admission.admissionbytype").replace(/ /g, "-")}
      graphRef={admtcardRef}
    />
  );

  const actions: TDashboardCardOptionActions = {
    onClose: onRemove ? () => onRemove() : undefined,

    onExpand: onFullScreenEnter ? () => onFullScreenEnter() : undefined,

    downloadButton: downloadOptions,
  };

  return (
    <>
      {(status === "LOADING" || admissionTypeStatus === "LOADING") && (
        <div className="item">
          <Skeleton />
        </div>
      )}

      {success && admissionTypeStatus === "SUCCESS" && (
        <DashboardCard
          cardRef={admtcardRef}
          title={t("admission.admissionbytype")}
          actions={actions}
          sizeChangeHandler={onSizeChange}
        >
          <Piechart data={data} width={"100%"} height={"calc(100% - 75px)"} />
          <DataSummary
            label={t("admission.admregistered")}
            value={total.toString()}
          />
        </DashboardCard>
      )}
    </>
  );
};
