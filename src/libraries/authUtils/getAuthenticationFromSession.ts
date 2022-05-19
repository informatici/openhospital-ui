import { AUTH_KEY, PERMISSION_KEY } from "../../consts";
import { IAuthentication } from "../../state/main/types";
import { SessionStorage } from "../storage/storage";

export const getAuthenticationFromSession = (): IAuthentication => {
  const { permission } = SessionStorage.read(PERMISSION_KEY);
  const { username, token } = SessionStorage.read(AUTH_KEY);

  if (!(token && username && permission)) {
    throw new Error("unauthenticated");
  }

  return {
    username,
    permission,
    token,
  };
};
