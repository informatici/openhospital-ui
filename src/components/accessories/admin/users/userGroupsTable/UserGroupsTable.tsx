import React, { useEffect, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@material-ui/core";

import Table from "../../../table/Table";
import InfoBox from "../../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import { getUserGroups } from "../../../../../state/usergroups/actions";
import { IState } from "../../../../../types";
import { UserGroupDTO } from "../../../../../generated";
import { ApiResponse } from "../../../../../state/types";

import classes from "./UserGroupsTable.module.scss";

interface IOwnProps {
  headerActions: ReactNode;
  onEdit: (row: UserGroupDTO) => void
}

export const UserGroupsTable = ({ headerActions, onEdit }: IOwnProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getUserGroups());
  }, [dispatch]);

  const header = ["code", "desc"];

  const label = {
    code: t("user.code"),
    desc: t("user.description"),
  };
  const order = ["code", "desc"];

  const { data, status, error } = useSelector<
    IState,
    ApiResponse<UserGroupDTO[]>
  >((state) => state.usergroups.groupList);

  const formatDataToDisplay = (data: UserGroupDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code,
        desc: item.desc ?? "",
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
              <Table
                rowData={formatDataToDisplay(data ?? [])}
                tableHeader={header}
                labelData={label}
                columnsOrder={order}
                rowsPerPage={10}
                manualFilter={false}
                isCollapsabile={false}
                onEdit={onEdit}
                rawData={data}
                rowKey="userName"
                headerActions={headerActions}
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
