import jwtDecode from "jwt-decode";
import {
  REFRESH_TOKEN_EXPIRATION_TIMEOUT,
  TOKEN_EXPIRATION_TIMEOUT,
} from "../../consts";

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

export const refreshTokenHasExpired = (token: any): boolean => {
  const { exp } = jwtDecode<JwtTokenModel>(token);
  const expirationTime = exp * 1000 - REFRESH_TOKEN_EXPIRATION_TIMEOUT;
  return Date.now() >= expirationTime;
};
