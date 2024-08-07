import { CircularProgress } from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { usePermission } from "libraries/permissionUtils/usePermission";
import { UserDTO } from "../../../../../generated";
import { getUsers } from "../../../../../state/users";
import InfoBox from "../../../infoBox/InfoBox";
import Table from "../../../table/Table";
import { TFilterField } from "../../../table/filter/types";

import classes from "./UsersTable.module.scss";

interface IOwnProps {
  headerActions: ReactNode;
  onEdit: (row: UserDTO) => void;
}

export const UsersTable = ({ headerActions, onEdit }: IOwnProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const canUpdate = usePermission("users.update");

  useEffect(() => {
    dispatch(getUsers({}));
  }, [dispatch]);

  const header = ["userName", "userGroupName", "desc"];

  const label = {
    userName: t("user.username"),
    userGroupName: t("user.groups"),
    desc: t("user.description"),
  };
  const order = ["userName", "userGroupName", "desc"];

  const filters: TFilterField[] = [
    { key: "userName", label: t("user.username"), type: "text" },
  ];

  const { data, status, error } = useAppSelector(
    (state) => state.users.userList
  );

  const formatDataToDisplay = (data: UserDTO[]) => {
    return data.map((item) => {
      return {
        userName: item.userName ?? "",
        userGroupName:
          item.userGroupName?.desc ?? item.userGroupName?.code ?? "",
        desc: item.desc ?? "",
        passwd: item.passwd ?? ""
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
                filterColumns={filters}
                manualFilter={false}
                isCollapsabile={false}
                rawData={data}
                rowKey="userName"
                headerActions={headerActions}
                onEdit={canUpdate ? onEdit: undefined}
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
