import React, { useEffect } from "react";
import Table from "../../../table/Table";
import { useTranslation } from "react-i18next";
import InfoBox from "../../../infoBox/InfoBox";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../../state/users/actions";
import { IState } from "../../../../../types";
import { UserDTO } from "../../../../../generated";
import { ApiResponse } from "../../../../../state/types";
import classes from "./UsersTable.module.scss";

export const UsersTable = () => {
  const dispatch = useDispatch();
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

  const { data, status, error } = useSelector<IState, ApiResponse<UserDTO[]>>(
    (state) => state.users.userList
  );

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
