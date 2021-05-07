import { AUTH_KEY, PERMISSION_KEY } from "../../consts";
import { SessionStorage } from "../storage/storage";

export const isAuthenticated = (): boolean => {
  const auth = SessionStorage.read(AUTH_KEY);
  const permission = SessionStorage.read(PERMISSION_KEY);
  return auth && permission;
};
