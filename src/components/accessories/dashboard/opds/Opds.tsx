import moment from "moment";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AgeTypeDTO, OpdDTO } from "../../../../generated";
import { ageTypeDTO } from "../../../../mockServer/fixtures/ageTypeDTO";
import { getAgeTypes } from "../../../../state/ageTypes/actions";
import { searchOpds } from "../../../../state/opds/actions";
import { TAPIResponseStatus } from "../../../../state/types";
import { IState } from "../../../../types";
import { Barchart } from "../../charts/bar/Barchart";
import { Piechart } from "../../charts/pie/Piechart";
import { DataSummary } from "../summary/DataSummary";
import "./styles.scss";
import { useData } from "./useData";

export const Opds: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchOpds({ dateFrom: moment(), dateTo: moment() }));
    dispatch(getAgeTypes());
  }, [dispatch]);
  const { ageTypeStatus, opdStatus, dataByAgeType, dataBySex } = useData();

  return (
    <>
      {opdStatus === "SUCCESS" && (
        <div className="item">
          <Piechart title={t("opd.opdbysex")} data={dataBySex} />
        </div>
      )}
      {opdStatus === "SUCCESS" && ageTypeStatus === "SUCCESS" && (
        <div className="item">
          <Barchart title={t("opd.opdbyagetype")} data={dataByAgeType} />
        </div>
      )}
    </>
  );
};
