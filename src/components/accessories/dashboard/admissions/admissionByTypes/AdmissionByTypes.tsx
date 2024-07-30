import { FC, useEffect, useRef, useState } from "react";
import { TDashboardComponentProps } from "../../layouts/types";
import { useTranslation } from "react-i18next";
import { useDispatch } from "@/libraries/hooks/redux";
import React from "react";
import { DashboardCard } from "../../card/DashboardCard";
import { DataSummary } from "../../summary/DataSummary";
import { TDashboardCardOptionActions } from "../../card/types";
import { Skeleton } from "@mui/lab";
import { getAdmissions } from "../../../../../state/admissions";
import { IOwnProps } from "../types";
import { Piechart } from "../../../charts/pie/Piechart";
import DataDownloadButton from "../../../dataDownloadButton/DataDownloadButton";
import { useAdmByAdmTypeData } from "../../../../../libraries/dashboardUtils/admissions/useAdmByAdmTypeData";

import "../../card/styles.scss";
import { getAdmissionTypes } from "../../../../../state/types/admissions";

export const AdmissionsByTypes: FC<TDashboardComponentProps & IOwnProps> = ({
  onRemove,
  onFullScreenEnter,
  period,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const admtcardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //dispatch(getAdmissions({ admissionrange: period }));
    dispatch(getAdmissionTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAdmissions({ admissionrange: period }));
  }, [period]);

  const { total, success, status, admissionTypeStatus, data, csvData } =
    useAdmByAdmTypeData();

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
          <Piechart
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
