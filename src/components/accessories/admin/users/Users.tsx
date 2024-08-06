import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import Button from "../../button/Button";
import UserGroupsTable from "./userGroupsTable";
import UsersTable from "./usersTable";

import { PATHS } from "../../../../consts";

export const Users = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [tab, setTab] = useState<"users" | "groups">("users");
  return (
    <>
      <Tabs
        value={tab}
        onChange={(_, value) => setTab(value)}
        aria-label="switch between users and groups"
      >
        <Tab label={t("user.users")} value="users" />
        <Tab label={t("user.groups")} value="groups" />
      </Tabs>
      {tab === "users" ? (
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
        <UserGroupsTable />
      )}
    </>
  );
};
