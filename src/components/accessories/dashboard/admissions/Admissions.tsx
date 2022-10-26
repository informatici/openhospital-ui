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
import { searchOpds } from "../../../../state/opds/actions";
import { TAPIResponseStatus } from "../../../../state/types";
import { getWards } from "../../../../state/ward/actions";
import { IState } from "../../../../types";
import { Barchart } from "../../charts/bar/Barchart";
import { Piechart } from "../../charts/pie/Piechart";
import { DataSummary } from "../summary/DataSummary";
import "./styles.scss";
import { useData } from "./useData";

export const Admissions: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAdmissions({
        admissionrange: [
          moment().add(-7, "days").toISOString(),
          moment().toISOString(),
        ],
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
  } = useData();

  return (
    <>
      {admissionStatus === "SUCCESS" && (
        <div className="item">
          <Piechart title={t("admission.admissionbysex")} data={dataBySex} />
        </div>
      )}
      {admissionStatus === "SUCCESS" && ageTypeStatus === "SUCCESS" && (
        <div className="item">
          <Barchart
            title={t("admission.admissionbyagetype")}
            data={dataByAgeType}
          />
        </div>
      )}
      {admissionStatus === "SUCCESS" && admissionTypeStatus === "SUCCESS" && (
        <div className="item">
          <Piechart
            title={t("admission.admissionbytype")}
            data={dataByAdmissionType}
          />
        </div>
      )}
      {admissionStatus === "SUCCESS" && wardStatus === "SUCCESS" && (
        <div className="item">
          <Barchart
            title={t("admission.admissionbywards")}
            data={dataByWards}
          />
        </div>
      )}
    </>
  );
};
