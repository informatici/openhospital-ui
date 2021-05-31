import { AUTH_KEY, PERMISSION_KEY } from "../../consts";
import { IAuthentication } from "../../state/main/types";
import { SessionStorage } from "../storage/storage";

export const getAuthenticationFromSession = (): IAuthentication => {
  const { permission } = SessionStorage.read(PERMISSION_KEY);
  const { displayName, token } = SessionStorage.read(AUTH_KEY);

  if (!(token && displayName && permission)) {
    throw new Error("unauthenticated");
  }

  return {
    displayName,
    permission,
    token,
  };
};
