import { FC, useEffect, useRef } from "react";
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
import { Piechart } from "../../../charts/pie/Piechart";
import { DataSummary } from "../../summary/DataSummary";
import { Skeleton } from "@material-ui/lab";
import { toggleFullscreen } from "../../card/consts";
import { ListItemIcon } from "@material-ui/core";
import { Description, PictureAsPdf, SaveAlt } from "@material-ui/icons";

import "../../card/styles.scss";

export const OpdBySex: FC<TDashboardComponentProps & IOwnProps> = ({
  onRemove,
  period,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const opdbysexcardref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(
      searchOpds({
        dateFrom: period[0],
        dateTo: period[1],
      })
    );
    dispatch(getAgeTypes());
  }, [dispatch, period]);

  const { opdStatus, dataBySex, success, total } = useData();

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
    onClose: () => onRemove(),

    onExpand: async () => {
      if (opdbysexcardref.current) {
        await toggleFullscreen(opdbysexcardref.current);
      }
    },

    onDownload: [
      { action: PDFDownload },
      { action: XLSDownload },
      { action: CSVDownload },
    ],
  };

  return (
    <>
      {success && (
        <DashboardCard
          cardRef={opdbysexcardref}
          title={t("opd.opdbysex")}
          actions={actions}
        >
          <Piechart data={dataBySex} />
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
