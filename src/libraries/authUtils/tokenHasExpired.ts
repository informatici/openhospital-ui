import jwtDecode from "jwt-decode";

export interface JwtTokenModel {
  exp: number;
  sub: string;
  auth: string;
}

export const tokenHasExpired = (token: any): boolean => {
  const { exp } = jwtDecode<JwtTokenModel>(token);
  const expirationTime = exp * 1000 - 60000;
  return Date.now() >= expirationTime;
};
