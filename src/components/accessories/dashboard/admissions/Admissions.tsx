import { Skeleton } from "@mui/lab";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "@/libraries/hooks/redux";
import { getAdmissions } from "../../../../state/admissions";
import { getAgeTypes } from "../../../../state/ageTypes";
import { getWards } from "../../../../state/ward";
import { Barchart } from "../../charts/bar/Barchart";
import { Piechart } from "../../charts/pie/Piechart";
import { DataSummary } from "../summary/DataSummary";
import "./styles.scss";
import { IOwnProps } from "./types";
import { useData } from "./useData";
import { getAdmissionTypes } from "../../../../state/types/admissions";

export const Admissions: FC<IOwnProps> = ({ period }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAdmissions({
        admissionrange: period,
      })
    );
    dispatch(getAgeTypes());
    dispatch(getAdmissionTypes());
    dispatch(getWards());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAdmissions({ admissionrange: period }));
  }, [period]);
  const {
    admissionStatus,
    admissionTypeStatus,
    ageTypeStatus,
    dataByAdmissionType,
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
          <Piechart title={t("admission.admissionbysex")} data={dataBySex} />
          <DataSummary
            label={t("admission.admregistered")}
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
            title={t("admission.admissionbyagetype")}
            data={dataByAgeType}
          />
          <DataSummary
            label={t("admission.admregistered")}
            value={total.toString()}
          />
        </div>
      )}
      {admissionStatus === "LOADING" && (
        <div className="item">
          <Skeleton />
        </div>
      )}
      {success && admissionTypeStatus === "SUCCESS" && (
        <div className="item">
          <Piechart
            title={t("admission.admissionbytype")}
            data={dataByAdmissionType}
          />
          <DataSummary
            label={t("admission.admregistered")}
            value={total.toString()}
          />
        </div>
      )}
      {(admissionStatus === "LOADING" || admissionTypeStatus === "LOADING") && (
        <div className="item">
          <Skeleton />
        </div>
      )}
      {success && wardStatus === "SUCCESS" && (
        <div className="item">
          <Barchart
            title={t("admission.admissionbywards")}
            data={dataByWards}
          />
          <DataSummary
            label={t("admission.admregistered")}
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
