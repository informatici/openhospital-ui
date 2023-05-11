import { FC, useEffect, useRef, useState } from "react";
import { TDashboardComponentProps } from "../../layouts/types";
import { IOwnProps } from "../types";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { searchOpds } from "../../../../../state/opds/actions";
import { getAgeTypes } from "../../../../../state/ageTypes/actions";
import { useData } from "../useData";
import { TDashboardCardOptionActions } from "../../card/types";
import React from "react";
import { DashboardCard } from "../../card/DashboardCard";
import { DataSummary } from "../../summary/DataSummary";
import { Skeleton } from "@material-ui/lab";
import { toggleFullscreen } from "../../card/consts";
import { ListItemIcon } from "@material-ui/core";
import { Description, PictureAsPdf, SaveAlt } from "@material-ui/icons";

import "../../card/styles.scss";
import { Barchart } from "../../../charts/bar/Barchart";

export const OpdByAgeTypes: FC<TDashboardComponentProps & IOwnProps> = ({
  onRemove,
  onFullScreenEnter,
  period,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const opdbysexcardref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(searchOpds({ dateFrom: period[0], dateTo: period[1] }));
    dispatch(getAgeTypes());
  }, [dispatch, period]);

  const { opdStatus, ageTypeStatus, dataByAgeType, success, total } = useData();

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
      {success && ageTypeStatus === "SUCCESS" && (
        <DashboardCard
          cardRef={opdbysexcardref}
          title={t("opd.opdbyagetype")}
          actions={actions}
          sizeChangeHandler={onSizeChange}
        >
          <Barchart
            data={dataByAgeType}
            width={displaySize?.width ? `${displaySize.width}px` : "320px"}
            height={displaySize?.height ? `${displaySize.height}px` : "320px"}
          />
          <DataSummary
            label={t("opd.opdregistered")}
            value={total.toString()}
          />
        </DashboardCard>
      )}
      {opdStatus === "LOADING" && <Skeleton />}
    </>
  );
};
