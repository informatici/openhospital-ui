import { Skeleton } from "@material-ui/lab";
import moment from "moment";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAgeTypes } from "../../../../state/ageTypes/actions";
import { searchOpds } from "../../../../state/opds/actions";
import { Barchart } from "../../charts/bar/Barchart";
import { Piechart } from "../../charts/pie/Piechart";
import SkeletonLoader from "../../skeletonLoader/SkeletonLoader";
import { DataSummary } from "../summary/DataSummary";
import "./styles.scss";
import { IOwnProps } from "./types";
import { useData } from "./useData";

export const Opds: FC<IOwnProps> = ({ period }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      searchOpds({
        dateFrom: period[0],
        dateTo: period[1],
      })
    );
    dispatch(getAgeTypes());
  }, [dispatch, period]);
  const { ageTypeStatus, opdStatus, dataByAgeType, dataBySex, success, total } =
    useData();

  return (
    <>
      {success && (
        <div className="item">
          <Piechart title={t("opd.opdbysex")} data={dataBySex} />
          <DataSummary
            label={t("opd.opdregistered")}
            value={total.toString()}
          />
        </div>
      )}
      {opdStatus === "LOADING" && (
        <div className="item">
          <Skeleton />
        </div>
      )}
      {success && ageTypeStatus === "SUCCESS" && (
        <div className="item">
          <Barchart title={t("opd.opdbyagetype")} data={dataByAgeType} />
          <DataSummary
            label={t("opd.opdregistered")}
            value={total.toString()}
          />
        </div>
      )}
      {(opdStatus === "LOADING" || ageTypeStatus === "LOADING") && (
        <div className="item">
          <Skeleton />
        </div>
      )}
    </>
  );
};
