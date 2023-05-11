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
import { getAdmissions } from "../../../../../state/admissions/actions";
import { IOwnProps } from "../types";
import { toggleFullscreen } from "../../card/consts";
import { ListItemIcon } from "@material-ui/core";
import { Description, PictureAsPdf, SaveAlt } from "@material-ui/icons";
import { getWards } from "../../../../../state/ward/actions";
import { Barchart } from "../../../charts/bar/Barchart";

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

  const { total, success, admissionStatus, wardStatus, dataByWards } =
    useData();

  const [displaySize, setDisplaySize] =
    useState<{ width: number; height: number }>();

  const onSizeChange = (width: number, height: number) => {
    setDisplaySize({ width: width - 1, height: height - 73 });
  };

  const PDFDownload = (
    <a href="#" className="download-link">
      <ListItemIcon>
        <PictureAsPdf />
      </ListItemIcon>
      <span className="download-format"> PDF </span>
    </a>
  );

  const CSVDownload = (
    <a href="#" className="download-link">
      <ListItemIcon>
        <Description />
      </ListItemIcon>
      <span className="download-format"> CSV </span>
    </a>
  );

  const XLSDownload = (
    <a href="#" className="download-link">
      <ListItemIcon>
        <SaveAlt />
      </ListItemIcon>
      <span className="download-format"> Excel </span>
    </a>
  );

  const actions: TDashboardCardOptionActions = {
    onClose: onRemove ? () => onRemove() : undefined,

    onExpand: onFullScreenEnter ? () => onFullScreenEnter() : undefined,

    onDownload: [
      { action: PDFDownload },
      { action: XLSDownload },
      { action: CSVDownload },
    ],
  };

  return (
    <>
      {(admissionStatus === "LOADING" || wardStatus === "LOADING") && (
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
            data={dataByWards}
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
