import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { UserGroupDTO } from "../../../../../generated";
import { usePermission } from "../../../../../libraries/permissionUtils/usePermission";
import { ApiResponse } from "../../../../../state/types";
import {
  deleteUserGroup,
  deleteUserGroupReset,
  getUserGroups,
  updateUserGroup,
  updateUserGroupReset,
} from "../../../../../state/usergroups";
import { IState } from "../../../../../types";
import InfoBox from "../../../infoBox/InfoBox";
import Table from "../../../table/Table";

import { CheckOutlined } from "@mui/icons-material";
import { TActions } from "components/accessories/table/types";
import { scrollToElement } from "libraries/uiUtils/scrollToElement";
import classes from "./UserGroupsTable.module.scss";

interface IOwnProps {
  headerActions: ReactNode;
  onEdit: (row: UserGroupDTO) => void;
}

export const UserGroupsTable = ({ headerActions, onEdit }: IOwnProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);
  const canUpdate = usePermission("users.update");
  const canDelete = usePermission("exams.delete");

  useEffect(() => {
    dispatch(getUserGroups());
    return () => {
      dispatch(deleteUserGroupReset());
      dispatch(updateUserGroupReset());
    };
  }, [dispatch]);

  const handleDelete = (row: UserGroupDTO) => {
    dispatch(deleteUserGroup(row.code));
  };

  const handleUpdate = useCallback(
    (deleted: boolean) => (row: UserGroupDTO) => {
      dispatch(updateUserGroup({ ...row, deleted }));
    },
    [updateUserGroup]
  );

  const header = ["code", "desc", "deleted"];

  const label = {
    code: t("user.code"),
    desc: t("user.description"),
    deleted: t("common.deleted"),
  };
  const order = ["code", "desc", "deleted"];

  const { data, status, error } = useSelector<
    IState,
    ApiResponse<UserGroupDTO[]>
  >((state) => state.usergroups.groupList);

  const deleteGroup = useAppSelector((state) => state.usergroups.delete);
  const update = useAppSelector((state) => state.usergroups.update);

  useEffect(() => {
    if (update.hasFailed) {
      scrollToElement(infoBoxRef.current);
    }

    if (update.hasSucceeded) dispatch(getUserGroups());
    return () => {
      dispatch(deleteUserGroupReset());
    };
  }, [update.status, dispatch]);

  useEffect(() => {
    if (deleteGroup.hasFailed) {
      scrollToElement(infoBoxRef.current);
    }

    if (deleteGroup.hasSucceeded) dispatch(getUserGroups());
    return () => {
      dispatch(updateUserGroupReset());
    };
  }, [deleteGroup.status, dispatch]);

  const formatDataToDisplay = (data: UserGroupDTO[]) => {
    return data.map((item) => {
      return {
        code: item.code,
        desc: item.desc ?? "",
        deleted: item.deleted ? <CheckOutlined fontSize="small" /> : "",
      };
    });
  };

  const displayRowAction = useCallback(
    (row: UserGroupDTO, action: TActions) =>
      action === "restore"
        ? !!row.deleted
        : action === "softDelete"
        ? !row.deleted
        : true,
    []
  );

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
                {(deleteGroup.hasFailed || update.hasFailed) && (
                  <div ref={infoBoxRef} className="info-box-container">
                    <InfoBox
                      type="error"
                      message={t(
                        deleteGroup.hasFailed
                          ? deleteGroup.error?.message
                          : update.error?.message
                      )}
                    />
                  </div>
                )}
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
                  onRestore={canUpdate ? handleUpdate(false) : undefined}
                  onSoftDelete={canUpdate ? handleUpdate(true) : undefined}
                  displayRowAction={displayRowAction}
                  labels={{
                    delete: { message: t("user.confirmUserGroupDeletion") },
                  }}
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
