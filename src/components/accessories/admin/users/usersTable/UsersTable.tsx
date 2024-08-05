import React, { useEffect, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";

import Table from "../../../table/Table";
import { TFilterField } from "../../../table/filter/types";
import InfoBox from "../../../infoBox/InfoBox";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { getUsers } from "../../../../../state/users";
import { IState } from "../../../../../types";
import { UserDTO } from "../../../../../generated";
import { ApiResponse } from "../../../../../state/types";

import classes from "./UsersTable.module.scss";

interface IOwnProps {
  headerActions: ReactNode;
}

export const UsersTable = ({ headerActions }: IOwnProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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

  const { data, status, error } = useAppSelector<
    IState,
    ApiResponse<UserDTO[]>
  >((state) => state.users.userList);

  const formatDataToDisplay = (data: UserDTO[]) => {
    return data.map((item) => {
      return {
        userName: item.userName ?? "",
        userGroupName:
          item.userGroupName?.desc ?? item.userGroupName?.code ?? "",
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
                filterColumns={filters}
                manualFilter={false}
                isCollapsabile={false}
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
