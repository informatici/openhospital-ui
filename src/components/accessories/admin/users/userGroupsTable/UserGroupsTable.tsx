import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { UserGroupDTO } from "../../../../../generated";
import { usePermission } from "../../../../../libraries/permissionUtils/usePermission";
import { ApiResponse } from "../../../../../state/types";
import {
  deleteUserGroup,
  deleteUserGroupReset,
  getUserGroups,
} from "../../../../../state/usergroups";
import { IState } from "../../../../../types";
import InfoBox from "../../../infoBox/InfoBox";
import Table from "../../../table/Table";

import classes from "./UserGroupsTable.module.scss";

interface IOwnProps {
  headerActions: ReactNode;
  onEdit: (row: UserGroupDTO) => void;
}

export const UserGroupsTable = ({ headerActions, onEdit }: IOwnProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const canUpdate = usePermission("users.update");
  const canDelete = usePermission("exams.delete");

  useEffect(() => {
    dispatch(getUserGroups());
    return () => {
      dispatch(deleteUserGroupReset());
    };
  }, [dispatch]);

  const handleDelete = (row: UserGroupDTO) => {
    dispatch(deleteUserGroup(row.code));
  };

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

  const deleteGroup = useAppSelector((state) => state.usergroups.delete);

  useEffect(() => {
    if (deleteGroup.hasSucceeded) dispatch(getUserGroups());
  }, [deleteGroup.hasSucceeded, dispatch]);

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
                onEdit={canUpdate ? onEdit : undefined}
                onDelete={canDelete ? handleDelete : undefined}
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
