import { Skeleton } from "@material-ui/lab";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAdmissions } from "../../../../state/admissions/actions";
import { getAgeTypes } from "../../../../state/ageTypes/actions";
import { getDischargeTypes } from "../../../../state/dischargeTypes/actions";
import { getWards } from "../../../../state/ward/actions";
import { Barchart } from "../../charts/bar/Barchart";
import { Piechart } from "../../charts/pie/Piechart";
import { DataSummary } from "../summary/DataSummary";
import "./styles.scss";
import { IOwnProps } from "./types";
import { useData } from "./useData";

export const Discharges: FC<IOwnProps> = ({ period }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAdmissions({
        dischargerange: period,
      })
    );
    dispatch(getAgeTypes());
    dispatch(getDischargeTypes());
    dispatch(getWards());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAdmissions({ dischargerange: period }));
  }, [period]);
  const {
    admissionStatus,
    dischargeTypeStatus,
    ageTypeStatus,
    dataByDischargeType,
    dataByAgeType,
    dataBySex,
    dataByWards,
    wardStatus,
    success,
    total,
  } = useData();

  return (
    <>
      {success && (
        <div className="item">
          <Piechart title={t("admission.dischargebysex")} data={dataBySex} />
          <DataSummary
            label={t("admission.disregistered")}
            value={total.toString()}
          />
        </div>
      )}
      {admissionStatus === "LOADING" && (
        <div className="item">
          <Skeleton />
        </div>
      )}
      {success && ageTypeStatus === "SUCCESS" && (
        <div className="item">
          <Barchart
            title={t("admission.dischargebyagetype")}
            data={dataByAgeType}
          />
          <DataSummary
            label={t("admission.disregistered")}
            value={total.toString()}
          />
        </div>
      )}
      {admissionStatus === "LOADING" && (
        <div className="item">
          <Skeleton />
        </div>
      )}
      {success && dischargeTypeStatus === "SUCCESS" && (
        <div className="item">
          <Piechart
            title={t("admission.dischargebytype")}
            data={dataByDischargeType}
          />
          <DataSummary
            label={t("admission.disregistered")}
            value={total.toString()}
          />
        </div>
      )}
      {(admissionStatus === "LOADING" || dischargeTypeStatus === "LOADING") && (
        <div className="item">
          <Skeleton />
        </div>
      )}
      {success && wardStatus === "SUCCESS" && (
        <div className="item">
          <Barchart
            title={t("admission.dischargebywards")}
            data={dataByWards}
          />
          <DataSummary
            label={t("admission.disregistered")}
            value={total.toString()}
          />
        </div>
      )}
      {(admissionStatus === "LOADING" || wardStatus === "LOADING") && (
        <div className="item">
          <Skeleton />
        </div>
      )}
    </>
  );
};
