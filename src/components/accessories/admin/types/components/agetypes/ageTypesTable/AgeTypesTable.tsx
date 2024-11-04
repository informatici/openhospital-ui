import { CircularProgress } from "@mui/material";
import { useAppSelector } from "libraries/hooks/redux";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { AgeTypeDTO } from "../../../../../../../generated";
import InfoBox from "../../../../../infoBox/InfoBox";
import Table from "../../../../../table/Table";
import "./styles.scss";

interface IOwnProps {
  headerActions?: ReactNode;
}

const AgeTypesTable = (props: IOwnProps) => {
  const { headerActions } = props;
  const { t } = useTranslation();

  const header = ["code", "description", "from", "to"];

  const label = {
    code: t("ageTypes.code"),
    description: t("ageTypes.description"),
    from: t("ageTypes.from"),
    to: t("ageTypes.to"),
  };
  const order = ["code", "description", "from", "to"];

  const { data, status, error } = useAppSelector(
    (state) => state.types.ageTypes.getAll
  );

  const formatDataToDisplay = (data: AgeTypeDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code,
        description: t(item.description),
        from: item.from,
        to: item.to,
      };
    });
  };

  return (
    <div className="ageTypesTable">
      {(() => {
        switch (status) {
          case "FAIL":
            return (
              <div className="fullWidth">
                <InfoBox
                  type="error"
                  message={error?.error || error?.message}
                />
              </div>
            );
          case "LOADING":
            return <CircularProgress className="loader" />;

          case "SUCCESS":
            return (
              <>
                <Table
                  rowData={formatDataToDisplay(data ?? [])}
                  tableHeader={header}
                  labelData={label}
                  columnsOrder={order}
                  rowsPerPage={20}
                  isCollapsabile={false}
                  showEmptyCell={false}
                  rawData={data}
                  manualFilter={false}
                  rowKey="code"
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

export default AgeTypesTable;
