// tslint:disable
/**
 * OH 2.0 Api Documentation
 * OH 2.0 Api Documentation
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Observable } from 'rxjs';
import { BaseAPI, HttpHeaders, throwIfNullOrUndefined, OperationOpts, RawAjaxResponse } from '../runtime';
import {
    UserSettingDTO,
} from '../models';

export interface NewUserSettingRequest {
    userSettingDTO: UserSettingDTO;
}

/**
 * no description
 */
export class UserSettingsApi extends BaseAPI {

    /**
     */
    getUserSettingDashboard(): Observable<UserSettingDTO>
    getUserSettingDashboard(opts?: OperationOpts): Observable<RawAjaxResponse<UserSettingDTO>>
    getUserSettingDashboard(opts?: OperationOpts): Observable<UserSettingDTO | RawAjaxResponse<UserSettingDTO>> {
        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<UserSettingDTO>({
            url: '/usersettings/dashboard',
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    newUserSetting({ userSettingDTO }: NewUserSettingRequest): Observable<UserSettingDTO>
    newUserSetting({ userSettingDTO }: NewUserSettingRequest, opts?: OperationOpts): Observable<RawAjaxResponse<UserSettingDTO>>
    newUserSetting({ userSettingDTO }: NewUserSettingRequest, opts?: OperationOpts): Observable<UserSettingDTO | RawAjaxResponse<UserSettingDTO>> {
        throwIfNullOrUndefined(userSettingDTO, 'userSettingDTO', 'newUserSetting');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<UserSettingDTO>({
            url: '/usersettings',
            method: 'POST',
            headers,
            body: userSettingDTO,
        }, opts?.responseOpts);
    };

}
