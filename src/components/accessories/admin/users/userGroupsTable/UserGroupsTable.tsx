import React, { useEffect, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@material-ui/core";

import Table from "../../../table/Table";
import InfoBox from "../../../infoBox/InfoBox";
import { getUserGroups } from "../../../../../state/usergroups/actions";
import { IState } from "../../../../../types";
import { UserGroupDTO } from "../../../../../generated";
import { ApiResponse } from "../../../../../state/types";
import { usePermission } from "../../../../../libraries/permissionUtils/usePermission";
import {
  deleteUserGroup,
  deleteUserGroupReset,
} from "../../../../../state/usergroups/actions";

import classes from "./UserGroupsTable.module.scss";

interface IOwnProps {
  headerActions: ReactNode;
  onEdit: (row: UserGroupDTO) => void;
}

export const UserGroupsTable = ({ headerActions, onEdit }: IOwnProps) => {
  const dispatch = useDispatch();
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

  const deleteGroup = useSelector<IState, ApiResponse<UserGroupDTO>>(
    (state) => state.usergroups.delete
  );

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
