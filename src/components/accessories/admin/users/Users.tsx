import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router";

import { Tabs, Tab } from "@material-ui/core";

import Button from "../../button/Button";
import UsersTable from "./usersTable";
import UserGroupsTable from "./userGroupsTable";

import { PATHS } from "../../../../consts";

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
      {state?.tab === TabOptions.users ? (
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
        />
      )}
    </>
  );
};
