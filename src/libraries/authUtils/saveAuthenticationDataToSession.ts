import { AUTH_KEY } from "../../consts";
import { LoginResponse } from "../../generated";
import { SessionStorage } from "../storage/storage";

export const saveAuthenticationDataToSession = (payload: LoginResponse) =>
  SessionStorage.write(AUTH_KEY, payload);
