import { AUTH_KEY } from "consts";
import { LoginApi } from "generated";
import { saveAuthenticationDataToSession } from "libraries/authUtils/saveAuthenticationDataToSession";
import { refreshTokenHasExpired } from "libraries/authUtils/tokenHasExpired";
import { SessionStorage } from "libraries/storage/storage";
import { Observable, throwError } from "rxjs";
import { catchError, delay, switchMap, tap } from "rxjs/operators";
import { customConfiguration } from "./configuration";

const loginApi = new LoginApi(customConfiguration(false));

export function wrapper<T>(callback: () => Observable<T>): Observable<T> {
  return callback().pipe(
    catchError((error) => {
      const refreshToken = SessionStorage.read(AUTH_KEY)?.refreshToken;
      if (
        error.status === 401 &&
        refreshToken &&
        !refreshTokenHasExpired(refreshToken)
      ) {
        return loginApi
          .refreshToken({
            tokenRefreshRequest: { refreshToken },
          })
          .pipe(
            tap(saveAuthenticationDataToSession),
            delay(500),
            switchMap(() => callback())
          );
      }
      return throwError(error);
    })
  );
}
