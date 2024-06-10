import React, { useEffect } from "react";
import Table from "../../../table/Table";
import { useTranslation } from "react-i18next";
import InfoBox from "../../../infoBox/InfoBox";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../types";
import { VaccineDTO, VaccineTypeDTO } from "../../../../../generated";
import { ApiResponse } from "../../../../../state/types";
import classes from "./VaccinesTable.module.scss";
import { getVaccines } from "../../../../../state/vaccines/actions";
import { TFilterField } from "../../../table/filter/types";
import { getVaccineTypes } from "../../../../../state/types/vaccines/actions";

export const VaccinesTable = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getVaccines());
    dispatch(getVaccineTypes());
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
    ApiResponse<VaccineDTO[]>
  >((state) => state.vaccines.vaccineList);

  const { data: vaccineTypes } = useSelector<
    IState,
    ApiResponse<VaccineTypeDTO[]>
  >((state) => state.types.vaccines.getVaccineTypes);

  const filters: TFilterField[] = [
    {
      key: "type",
      label: t("vaccine.vaccinetype"),
      type: "select",
      options:
        vaccineTypes?.map((vt) => ({
          label: vt.description,
          value: vt.description,
        })) ?? [],
    },
    { key: "description", label: t("vaccine.description"), type: "text" },
  ];

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
                showEmptyCell={false}
                filterColumns={filters}
                manualFilter={false}
                rowKey="code"
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
