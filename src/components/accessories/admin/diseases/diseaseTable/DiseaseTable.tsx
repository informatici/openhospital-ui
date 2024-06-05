import React, { FunctionComponent, ReactNode } from "react";
import Table from "../../../table/Table";
import { useTranslation } from "react-i18next";
import InfoBox from "../../../infoBox/InfoBox";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { IState } from "../../../../../types";
import { DiseaseDTO } from "../../../../../generated";
import { ApiResponse } from "../../../../../state/types";
import classes from "./DiseaseTable.module.scss";
import { CheckOutlined } from "@material-ui/icons";
import { TFilterField } from "../../../table/filter/types";

interface IOwnProps {
  onEdit: (row: any) => void;
  headerActions?: ReactNode;
}

export const DiseaseTable: FunctionComponent<IOwnProps> = ({
  onEdit,
  headerActions,
}) => {
  const { t } = useTranslation();

  const diseasesOptions = useSelector<
    IState,
    { label: string; value: string }[]
  >(
    (state) =>
      state.diseaseTypes.getDiseaseTypes.data?.map((item) => ({
        value: item.code,
        label: item.description ?? "",
      })) ?? []
  );

  const header = [
    "code",
    "diseaseType",
    "description",
    "opdInclude",
    "ipdInInclude",
    "ipdOutInclude",
  ];

  const label = {
    code: t("disease.code"),
    diseaseType: t("disease.diseaseType"),
    description: t("disease.name"),
    opdInclude: t("disease.opdInclude"),
    ipdInInclude: t("disease.ipdInInclude"),
    ipdOutInclude: t("disease.ipdOutInclude"),
  };
  const order = [
    "code",
    "diseaseType",
    "description",
    "opdInclude",
    "ipdInInclude",
    "ipdOutInclude",
  ];

  const filters: TFilterField[] = [
    { key: "description", label: t("disease.name"), type: "text" },
    {
      key: "diseaseType",
      label: t("disease.diseaseType"),
      type: "select",
      options: diseasesOptions,
    },
  ];

  const { data, status, error } = useSelector<
    IState,
    ApiResponse<DiseaseDTO[]>
  >((state) => state.diseases.allDiseases);

  const handleEdit = (row: DiseaseDTO) => {
    onEdit((data ?? []).find((item) => item.code === row?.code));
  };

  const formatDataToDisplay = (data: DiseaseDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code ?? "",
        diseaseType: item.diseaseType?.description ?? "",
        description: item.description ?? "",
        opdInclude: item.opdInclude ? <CheckOutlined fontSize="small" /> : "",
        ipdInInclude: item.ipdInInclude ? (
          <CheckOutlined fontSize="small" />
        ) : (
          ""
        ),
        ipdOutInclude: item.ipdOutInclude ? (
          <CheckOutlined fontSize="small" />
        ) : (
          ""
        ),
        lock: item.lock,
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
              <CircularProgress
                style={{ marginLeft: "50%", position: "relative" }}
              />
            );

          case "SUCCESS":
            return (
              <>
                <Table
                  rowData={formatDataToDisplay(data ?? [])}
                  tableHeader={header}
                  labelData={label}
                  columnsOrder={order}
                  rowsPerPage={20}
                  onEdit={handleEdit}
                  showEmptyCell={false}
                  rowKey={"code"}
                  manualFilter={false}
                  filterColumns={filters}
                  rawData={(data ?? []).map((disease) => ({
                    ...disease,
                    diseaseType: disease.diseaseType.code,
                  }))}
                  headerActions={headerActions}
                />
              </>
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
