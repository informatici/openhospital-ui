import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";

import { PATHS } from "../../../../../consts";
import { UserDTO } from "../../../../../generated";
import { getUserGroups } from "../../../../../state/usergroups";
import { getUsers, updateUser, updateUserReset } from "../../../../../state/users";
import { EditUserForm } from "./EditUserForm";

export const EditUser = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [user, setUser] = useState<UserDTO | null>();
  const [userNotFound, setUserNotFound] = useState<boolean>(false);
  const { isLoading, hasSucceeded, hasFailed, error } = useAppSelector(
    (state) => state.users.update
  );
  const users = useAppSelector((state) => state.users.userList);
  const groups = useAppSelector((state) => state.usergroups.groupList)

  useEffect(() => {
    dispatch(getUsers({}))
    dispatch(getUserGroups())
    return () => {
      dispatch(updateUserReset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (users.hasSucceeded) {
      const user = users.data?.find(({ userName }) => userName === id);
      if (!!user) setUser(user);
      else setUserNotFound(true);
    }
  }, [users.hasSucceeded, users.data, id]);

  const handleUpdate = (user: UserDTO) => {
    dispatch(updateUser(user));
  };

  if(userNotFound) return <Navigate to={PATHS.admin_users} />;

  if (users.isLoading || groups.isLoading || !users || !user || !groups.data) {
    return <CircularProgress style={{ marginLeft: "50%", position: "relative" }} />;
  }
  if(!user) {
    console.log("user not found")
  }

  return (
    <EditUserForm
      groups={groups.data}
      initialValues={user}
      onSubmit={handleUpdate}
      isLoading={isLoading}
      hasSucceeded={hasSucceeded}
      hasFailed={hasFailed}
      error={error}
    />
  );
};
