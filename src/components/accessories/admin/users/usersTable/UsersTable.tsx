import { CircularProgress } from "@mui/material";
import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { usePermission } from "libraries/permissionUtils/usePermission";
import checkIcon from "../../../../../assets/check-icon.png";
import { UserDTO } from "../../../../../generated";
import {
  deleteUserReset,
  getUsers,
  updateUser,
  updateUserReset,
} from "../../../../../state/users";
import ConfirmationDialog from "../../../confirmationDialog/ConfirmationDialog";
import InfoBox from "../../../infoBox/InfoBox";
import Table from "../../../table/Table";
import { TFilterField } from "../../../table/filter/types";

import { CheckOutlined } from "@mui/icons-material";
import { TActions } from "components/accessories/table/types";
import { scrollToElement } from "libraries/uiUtils/scrollToElement";
import { getUserGroups } from "state/usergroups";
import classes from "./UsersTable.module.scss";

interface IOwnProps {
  headerActions: ReactNode;
  onEdit: (row: UserDTO) => void;
  onDelete: (row: UserDTO) => void;
}

export const UsersTable = ({ headerActions, onEdit, onDelete }: IOwnProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const infoBoxRef = useRef<HTMLDivElement>(null);

  const canUpdate = usePermission("users.update");
  const canDelete = usePermission("users.update");

  const deleteUser = useAppSelector((state) => state.users.delete);
  const update = useAppSelector((state) => state.users.update);

  useEffect(() => {
    dispatch(getUsers({}));
    dispatch(getUserGroups());

    return () => {
      dispatch(deleteUserReset());
      dispatch(updateUserReset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (update.hasFailed) {
      scrollToElement(infoBoxRef.current);
    }

    if (update.hasSucceeded) {
      dispatch(getUsers({}));
    }
    return () => {
      dispatch(deleteUserReset());
    };
  }, [update.status, dispatch]);

  useEffect(() => {
    if (deleteUser.hasFailed) {
      scrollToElement(infoBoxRef.current);
    }

    if (deleteUser.hasSucceeded) {
      dispatch(getUsers({}));
    }
    return () => {
      dispatch(updateUserReset());
    };
  }, [deleteUser.status, dispatch]);

  const header = ["userName", "userGroupName", "desc", "deleted"];
  const label = {
    userName: t("user.username"),
    userGroupName: t("user.group"),
    desc: t("user.description"),
    deleted: t("common.deleted"),
  };
  const order = ["userName", "userGroupName", "desc", "deleted"];
  const userGroupOptions = useAppSelector(
    (state) =>
      state.usergroups.groupList.data?.map((item) => ({
        value: item.code ?? "",
        label: item.code ?? "",
      })) ?? []
  );

  const filters: TFilterField[] = [
    {
      key: "userGroupName",
      label: t("user.group"),
      type: "select",
      options: userGroupOptions,
    },
    { key: "userName", label: t("user.username"), type: "text" },
    {
      key: "deleted",
      label: t("common.deleted"),
      type: "boolean",
    },
  ];

  const { data, status, error } = useAppSelector(
    (state) => state.users.userList
  );

  const formatDataToDisplay = (data: UserDTO[]) => {
    return data.map((item) => {
      return {
        userName: item.userName ?? "",
        userGroupName: item.userGroupName?.code ?? "",
        desc: item.desc ?? "",
        passwd: item.passwd ?? "",
        deleted: item.deleted ? <CheckOutlined fontSize="small" /> : "",
      };
    });
  };

  const handleUpdate = useCallback(
    (deleted: boolean) => (row: UserDTO) => {
      dispatch(
        updateUser({
          ...row,
          userGroupName: data!.find((user) => user.userName === row.userName)!
            .userGroupName,
          deleted,
        })
      );
    },
    [updateUser, data]
  );

  const displayRowAction = useCallback(
    (row: UserDTO, action: TActions) =>
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
                {(deleteUser.hasFailed || update.hasFailed) && (
                  <div ref={infoBoxRef} className="info-box-container">
                    <InfoBox
                      type="error"
                      message={t(
                        deleteUser.hasFailed
                          ? deleteUser.error?.message
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
                  filterColumns={filters}
                  manualFilter={false}
                  isCollapsabile={false}
                  rawData={(data ?? []).map((user) => ({
                    ...user,
                    userGroupName: user.userGroupName?.code,
                    selected: user.deleted,
                  }))}
                  rowKey="userName"
                  headerActions={headerActions}
                  onEdit={canUpdate ? onEdit : undefined}
                  onDelete={canDelete ? onDelete : undefined}
                  onRestore={canUpdate ? handleUpdate(false) : undefined}
                  onSoftDelete={canUpdate ? handleUpdate(true) : undefined}
                  labels={{
                    delete: { message: t("user.confirmUserDeletion") },
                  }}
                  displayRowAction={displayRowAction}
                />
                <ConfirmationDialog
                  isOpen={!!deleteUser.hasSucceeded}
                  title={t("user.deleted")}
                  icon={checkIcon}
                  info={t("user.deleteSuccess")}
                  primaryButtonLabel="Ok"
                  handlePrimaryButtonClick={() => {
                    dispatch(deleteUserReset());
                  }}
                  handleSecondaryButtonClick={() => ({})}
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
