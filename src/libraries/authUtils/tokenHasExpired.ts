import jwtDecode from "jwt-decode";
import { TOKEN_EXPIRATION_TIMEOUT } from "../../consts";

export interface JwtTokenModel {
  exp: number;
  sub: string;
  auth: string;
}

export const tokenHasExpired = (token: any): boolean => {
  const { exp } = jwtDecode<JwtTokenModel>(token);
  const expirationTime = exp * 1000 - TOKEN_EXPIRATION_TIMEOUT;
  return Date.now() >= expirationTime;
};
