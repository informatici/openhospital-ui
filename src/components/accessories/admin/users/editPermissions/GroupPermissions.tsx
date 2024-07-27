import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllPermissions } from "../../../../../state/permissions/actions";
import { IState } from "../../../../../types";
import { UserGroupDTO } from "../../../../../generated";
import InfoBox from "../../../infoBox/InfoBox";
import { GroupPermissionsEditor } from "./GroupPermissionsEditor";

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
    />
  );
};
