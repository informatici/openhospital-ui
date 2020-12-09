import { AUTH_KEY } from "../../consts";
import { SessionStorage } from "../storage/storage";

export const isAuthenticated = (): boolean => {
  const auth = SessionStorage.read(AUTH_KEY);
  return !!auth;
};
