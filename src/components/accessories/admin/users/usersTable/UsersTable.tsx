import { CircularProgress } from "@mui/material";
import React, { ReactNode, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import { usePermission } from "libraries/permissionUtils/usePermission";
import { UserDTO } from "../../../../../generated";
import { deleteUserReset, getUsers } from "../../../../../state/users";
import InfoBox from "../../../infoBox/InfoBox";
import Table from "../../../table/Table";
import { TFilterField } from "../../../table/filter/types";

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

  useEffect(() => {
    dispatch(getUsers({}));
    dispatch(getUserGroups());

    return () => {
      dispatch(deleteUserReset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (deleteUser.status === "FAIL") {
      scrollToElement(infoBoxRef.current);
    }

    if (
      deleteUser.status === "SUCCESS" ||
      deleteUser.status === "SUCCESS_EMPTY"
    ) {
      dispatch(getUsers({}));
    }
  }, [deleteUser.status, dispatch]);

  const header = ["userName", "userGroupName", "desc"];

  const label = {
    userName: t("user.username"),
    userGroupName: t("user.groups"),
    desc: t("user.description"),
  };
  const order = ["userName", "userGroupName", "desc"];
  const userGroupOptions = useAppSelector(
    (state) =>
      state.usergroups.groupList.data?.map((item) => ({
        value: item.code ?? "",
        label: item.desc ?? item.code ?? "",
      })) ?? []
  );

  const filters: TFilterField[] = [
    {
      key: "userGroupName",
      label: t("user.groups"),
      type: "select",
      options: userGroupOptions,
    },
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
        passwd: item.passwd ?? "",
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
                {deleteUser.status === "FAIL" && (
                  <div ref={infoBoxRef} className="info-box-container">
                    <InfoBox type="error" message={deleteUser.error?.message} />
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
                  }))}
                  rowKey="userName"
                  headerActions={headerActions}
                  onEdit={canUpdate ? onEdit : undefined}
                  onDelete={canDelete ? onDelete : undefined}
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
