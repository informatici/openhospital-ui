import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";

import UsersTable from "./usersTable";
import UserGroupsTable from "./userGroupsTable";

export const Users = () => {
  const [tab, setTab] = useState<"users" | "groups">("users");
  return (
    <>
      <Tabs
        value={tab}
        onChange={(_, value) => setTab(value)}
        aria-label="switch between users and groups"
      >
        <Tab label="Users" value="users" />
        <Tab label="Groups" value="groups" />
      </Tabs>
      {tab === "users" ? <UsersTable /> : <UserGroupsTable />}
    </>
  );
};
