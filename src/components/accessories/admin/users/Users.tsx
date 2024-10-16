import { Tab, Tabs } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

import Button from "../../button/Button";
import UserGroupsTable from "./userGroupsTable";
import UsersTable from "./usersTable";

import { PATHS } from "../../../../consts";
import { UserGroupDTO } from "../../../../generated";

export enum TabOptions {
  "users" = "users",
  "groups" = "groups",
}

export const Users = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { state }: { state: { tab?: TabOptions } } = useLocation();
  const setTab = (tab: TabOptions) =>
    navigate(PATHS.admin_users, { state: { tab } });

  const handleEditGroup = (row: UserGroupDTO) =>
    navigate(PATHS.admin_usergroups_edit.replace(":id", row.code!), {
      state: row,
    });

  return (
    <>
      <Tabs
        value={state?.tab ?? TabOptions.users}
        onChange={(_, value) => setTab(value)}
        aria-label="switch between users and groups"
      >
        <Tab label={t("user.users")} value="users" />
        <Tab label={t("user.groups")} value="groups" />
      </Tabs>
      {state?.tab !== TabOptions.groups ? (
        <UsersTable
          headerActions={
            <Button
              onClick={() => {
                navigate(PATHS.admin_users_new);
              }}
              type="button"
              variant="contained"
              color="primary"
            >
              {t("user.addUser")}
            </Button>
          }
        />
      ) : (
        <UserGroupsTable
          headerActions={
            <Button
              onClick={() => {
                navigate(PATHS.admin_usergroups_new);
              }}
              type="button"
              variant="contained"
              color="primary"
            >
              {t("user.addGroup")}
            </Button>
          }
          onEdit={handleEditGroup}
        />
      )}
    </>
  );
};
