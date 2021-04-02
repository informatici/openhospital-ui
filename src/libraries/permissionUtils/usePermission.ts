import { useSelector } from "react-redux";
import { IState, TPermission } from "../../types";

export const usePermission = (name: TPermission): boolean => {
  const permissions = useSelector<IState, string[]>(
    (state) => state.main.me?.data?.permission || []
  );

  return Boolean(permissions.find((permission: string) => permission === name));
};
