import { Mutex } from "async-mutex";
import { AUTH_KEY } from "consts";
import { LoginApi } from "generated";
import { saveAuthenticationDataToSession } from "libraries/authUtils/saveAuthenticationDataToSession";
import {
  refreshTokenHasExpired,
  tokenHasExpired,
} from "libraries/authUtils/tokenHasExpired";
import { SessionStorage } from "libraries/storage/storage";
import { Observable, from, throwError } from "rxjs";
import { catchError, delay, switchMap, tap } from "rxjs/operators";
import { customConfiguration } from "./configuration";

const mutex = new Mutex();

const loginApi = new LoginApi(customConfiguration(false));

export function wrapper<T>(callback: () => Observable<T>): Observable<T> {
  return callback().pipe(
    catchError((error) => {
      if (error.status === 401) {
        const refreshToken = SessionStorage.read(AUTH_KEY)?.refreshToken;
        if (refreshToken && !refreshTokenHasExpired(refreshToken)) {
          return from(
            mutex.runExclusive(async () => {
              const token = SessionStorage.read(AUTH_KEY)?.token;
              if (token && !tokenHasExpired(token)) {
                return callback().toPromise();
              }
              return loginApi
                .refreshToken({
                  tokenRefreshRequest: { refreshToken },
                })
                .pipe(
                  tap(saveAuthenticationDataToSession),
                  delay(500),
                  switchMap(() => callback())
                )
                .toPromise();
            })
          );
        }
      }
      return throwError(error);
    })
  );
}
