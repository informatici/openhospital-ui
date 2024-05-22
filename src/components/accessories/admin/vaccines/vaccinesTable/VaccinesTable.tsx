import React, { useEffect } from "react";
import Table from "../../../table/Table";
import { useTranslation } from "react-i18next";
import InfoBox from "../../../infoBox/InfoBox";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../types";
import { VaccineDTO } from "../../../../../generated";
import { IApiResponse } from "../../../../../state/types";
import classes from "./VaccinesTable.module.scss";
import { getVaccines } from "../../../../../state/vaccines/actions";

export const VaccinesTable = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getVaccines());
  }, [dispatch]);

  const header = ["code", "type", "description"];

  const label = {
    code: t("vaccine.code"),
    type: t("vaccine.vaccinetype"),
    description: t("vaccine.description"),
  };
  const order = ["code", "type", "description"];

  const { data, status, error } = useSelector<
    IState,
    IApiResponse<VaccineDTO[]>
  >((state) => state.vaccines.vaccineList);

  const formatDataToDisplay = (data: VaccineDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code ?? "",
        type: item.vaccineType?.description ?? "",
        description: item.description ?? "",
      };
    });
  };

  return (
    <div className={classes.table}>
      {(() => {
        switch (status) {
          case "FAIL":
            return <InfoBox type="error" message={error?.message} />;
          case "LOADING":
            return (
              <div style={{ minWidth: "100%" }}>
                <CircularProgress
                  style={{ marginLeft: "50%", position: "relative" }}
                />
              </div>
            );

          case "SUCCESS":
            return (
              <Table
                rowData={formatDataToDisplay(data ?? [])}
                tableHeader={header}
                labelData={label}
                columnsOrder={order}
                rowsPerPage={10}
                isCollapsabile={false}
              />
            );
          case "SUCCESS_EMPTY":
            return <InfoBox type="info" message={t("common.emptydata")} />;
          default:
            return;
        }
      })()}
    </div>
  );
};
