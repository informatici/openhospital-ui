import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllPermissions,
  updatePermission,
  updatePermissionReset,
} from "../../../../../state/permissions/actions";
import { IState } from "../../../../../types";
import { PermissionDTO, UserGroupDTO } from "../../../../../generated";
import InfoBox from "../../../infoBox/InfoBox";
import { GroupPermissionsEditor } from "./GroupPermissionsEditor";

interface IProps {
  userGroupId: Pick<UserGroupDTO, "code"> | string;
  setDirty: (v: boolean) => void;
}

export const GroupPermissions = ({ userGroupId, setDirty }: IProps) => {
  const dispatch = useDispatch();
  const permissionsState = useSelector(
    (state: IState) => state.permissions.getAll
  );
  useEffect(() => {
    dispatch(getAllPermissions());
    return () => {
      dispatch(updatePermissionReset());
    };
  }, [dispatch]);

  const handleUpdate = (newPerm: PermissionDTO) => {
    console.log("newPerm");
    console.log(newPerm);
    dispatch(updatePermission({ id: newPerm.id, permissionDTO: newPerm }));
  };

  if (permissionsState.hasFailed)
    return (
      <InfoBox
        type="error"
        message={`Unable to load permissions ${permissionsState.error?.toString()}`}
      />
    );
  if (!permissionsState.hasSucceeded || !permissionsState.data) return <>...</>;
  if (!permissionsState.data.length) return <>no permissions</>;

  return (
    <GroupPermissionsEditor
      permissions={permissionsState.data}
      thisGroupId={userGroupId as string}
      setDirty={setDirty}
      update={handleUpdate}
    />
  );
};
