import { Skeleton } from "@material-ui/lab";
import moment from "moment";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  AdmissionDTO,
  AdmissionTypeDTO,
  AgeTypeDTO,
  OpdDTO,
  PatientDTO,
  WardDTO,
} from "../../../../generated";
import { ageTypeDTO } from "../../../../mockServer/fixtures/ageTypeDTO";
import { getAdmissions } from "../../../../state/admissions/actions";
import { getAdmissionTypes } from "../../../../state/admissionTypes/actions";
import { getAgeTypes } from "../../../../state/ageTypes/actions";
import { getWards } from "../../../../state/ward/actions";
import { Barchart } from "../../charts/bar/Barchart";
import { Piechart } from "../../charts/pie/Piechart";
import "./styles.scss";
import { IOwnProps } from "./types";
import { useData } from "./useData";

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
  } = useData();

  return (
    <>
      {success && (
        <div className="item">
          <Piechart title={t("admission.admissionbysex")} data={dataBySex} />
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
