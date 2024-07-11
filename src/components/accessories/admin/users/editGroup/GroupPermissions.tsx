import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllPermissions } from "../../../../../state/permissions/actions";
import { IState } from "../../../../../types";
import { UserGroupDTO, PermissionDTO } from "../../../../../generated";

import { PermissionCheckbox } from "./PermissionCheckbox";
interface IProps {
  userGroupId: Pick<UserGroupDTO, "code"> | string;
}

export const GroupPermissions = ({ userGroupId }: IProps) => {
  const dispatch = useDispatch();
  const permissionsState = useSelector(
    (state: IState) => state.permissions.getAll
  );
  useEffect(() => {
    dispatch(getAllPermissions());
  }, [dispatch]);

  if (!permissionsState.hasSucceeded || !permissionsState.data) return <>...</>;
  if (!permissionsState.data.length) return <>no permissions</>;
  return (
    <>
      <h2>Areas</h2>
      <ul>
        {permissionsState.data
          .filter(
            (perm: PermissionDTO) => perm.name && /\.access$/.test(perm.name)
          )
          .map((perm) => (
            <li>
              <PermissionCheckbox
                permission={perm}
                onChange={() => console.log}
                thisGroup={userGroupId as string}
              />
            </li>
          ))}
      </ul>
      <h2>Permissions</h2>
      <ul>
        {permissionsState.data
          .filter(
            (perm: PermissionDTO) =>
              perm.name && /\.(create|read|update|delete)$/.test(perm.name)
          )
          .map((perm) => (
            <li>
              <PermissionCheckbox
                permission={perm}
                onChange={() => console.log}
                thisGroup={userGroupId as string}
              />
            </li>
          ))}
      </ul>
    </>
  );
};
