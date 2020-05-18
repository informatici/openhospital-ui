import { SET_TOKEN } from "./consts";

export const setToken = (token: string) => ({
  type: SET_TOKEN,
  token,
});
