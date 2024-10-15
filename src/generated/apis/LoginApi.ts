// tslint:disable
/**
 * Open Hospital API Documentation
 * Open Hospital API Documentation
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Observable } from 'rxjs';
import { BaseAPI, HttpHeaders, throwIfNullOrUndefined, OperationOpts, RawAjaxResponse } from '../runtime';
import {
    LoginRequest,
    LoginResponse,
    TokenRefreshRequest,
} from '../models';

export interface AuthenticateUserRequest {
    loginRequest: LoginRequest;
}

export interface RefreshTokenRequest {
    tokenRefreshRequest: TokenRefreshRequest;
}

/**
 * no description
 */
export class LoginApi extends BaseAPI {

    /**
     */
    authenticateUser({ loginRequest }: AuthenticateUserRequest): Observable<LoginResponse>
    authenticateUser({ loginRequest }: AuthenticateUserRequest, opts?: OperationOpts): Observable<RawAjaxResponse<LoginResponse>>
    authenticateUser({ loginRequest }: AuthenticateUserRequest, opts?: OperationOpts): Observable<LoginResponse | RawAjaxResponse<LoginResponse>> {
        throwIfNullOrUndefined(loginRequest, 'loginRequest', 'authenticateUser');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<LoginResponse>({
            url: '/auth/login',
            method: 'POST',
            headers,
            body: loginRequest,
        }, opts?.responseOpts);
    };

    /**
     * Logout the current user.
     */
    logout(): Observable<void>
    logout(opts?: OperationOpts): Observable<void | RawAjaxResponse<void>>
    logout(opts?: OperationOpts): Observable<void | RawAjaxResponse<void>> {
        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<void>({
            url: '/auth/logout',
            method: 'POST',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    refreshToken({ tokenRefreshRequest }: RefreshTokenRequest): Observable<LoginResponse>
    refreshToken({ tokenRefreshRequest }: RefreshTokenRequest, opts?: OperationOpts): Observable<RawAjaxResponse<LoginResponse>>
    refreshToken({ tokenRefreshRequest }: RefreshTokenRequest, opts?: OperationOpts): Observable<LoginResponse | RawAjaxResponse<LoginResponse>> {
        throwIfNullOrUndefined(tokenRefreshRequest, 'tokenRefreshRequest', 'refreshToken');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<LoginResponse>({
            url: '/auth/refresh-token',
            method: 'POST',
            headers,
            body: tokenRefreshRequest,
        }, opts?.responseOpts);
    };

}
