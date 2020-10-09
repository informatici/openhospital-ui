// tslint:disable
/**
 * Api Documentation
 * Api Documentation
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Observable } from 'rxjs';
import { BaseAPI, HttpHeaders, HttpQuery, throwIfNullOrUndefined, encodeURI } from '../runtime';
import {
    UserDTO,
    UserGroupDTO,
    UserMenuItemDTO,
} from '../models';

export interface DeleteGroupUsingDELETERequest {
    groupCode: string;
}

export interface DeleteUserUsingDELETERequest {
    username: string;
}

export interface GetGroupMenuUsingGETRequest {
    groupCode: string;
}

export interface GetMenuUsingGETRequest {
    username: string;
}

export interface GetUserByNameUsingGETRequest {
    username: string;
}

export interface GetUserUsingGETRequest {
    groupId?: string;
}

export interface NewUserGroupUsingPOSTRequest {
    aGroup: UserGroupDTO;
}

export interface NewUserUsingPOSTRequest {
    userDTO: UserDTO;
}

export interface SetGroupMenuUsingPOSTRequest {
    groupCode: string;
    menusDTO: Array<UserMenuItemDTO>;
}

export interface UpdateUserGroupUsingPUTRequest {
    aGroup: UserGroupDTO;
}

export interface UpdateUserUsingPUTRequest {
    userDTO: UserDTO;
    password?: boolean;
}

/**
 * no description
 */
export class UserControllerApi extends BaseAPI {

    /**
     * deleteGroup
     */
    deleteGroupUsingDELETE = ({ groupCode }: DeleteGroupUsingDELETERequest): Observable<boolean> => {
        throwIfNullOrUndefined(groupCode, 'deleteGroupUsingDELETE');

        return this.request<boolean>({
            path: '/users/groups/{group_code}'.replace('{group_code}', encodeURI(groupCode)),
            method: 'DELETE',
        });
    };

    /**
     * deleteUser
     */
    deleteUserUsingDELETE = ({ username }: DeleteUserUsingDELETERequest): Observable<boolean> => {
        throwIfNullOrUndefined(username, 'deleteUserUsingDELETE');

        return this.request<boolean>({
            path: '/users/{username}'.replace('{username}', encodeURI(username)),
            method: 'DELETE',
        });
    };

    /**
     * getGroupMenu
     */
    getGroupMenuUsingGET = ({ groupCode }: GetGroupMenuUsingGETRequest): Observable<Array<UserMenuItemDTO>> => {
        throwIfNullOrUndefined(groupCode, 'getGroupMenuUsingGET');

        return this.request<Array<UserMenuItemDTO>>({
            path: '/users/group-menus/{group_code}'.replace('{group_code}', encodeURI(groupCode)),
            method: 'GET',
        });
    };

    /**
     * getMenu
     */
    getMenuUsingGET = ({ username }: GetMenuUsingGETRequest): Observable<Array<UserMenuItemDTO>> => {
        throwIfNullOrUndefined(username, 'getMenuUsingGET');

        return this.request<Array<UserMenuItemDTO>>({
            path: '/users/menus/{username}'.replace('{username}', encodeURI(username)),
            method: 'GET',
        });
    };

    /**
     * getUserByName
     */
    getUserByNameUsingGET = ({ username }: GetUserByNameUsingGETRequest): Observable<UserDTO> => {
        throwIfNullOrUndefined(username, 'getUserByNameUsingGET');

        return this.request<UserDTO>({
            path: '/users/{username}'.replace('{username}', encodeURI(username)),
            method: 'GET',
        });
    };

    /**
     * getUserGroup
     */
    getUserGroupUsingGET = (): Observable<Array<UserGroupDTO>> => {
        return this.request<Array<UserGroupDTO>>({
            path: '/users/groups',
            method: 'GET',
        });
    };

    /**
     * getUser
     */
    getUserUsingGET = ({ groupId }: GetUserUsingGETRequest): Observable<Array<UserDTO>> => {

        const query: HttpQuery = {};

        if (groupId != null) { query['group_id'] = groupId; }

        return this.request<Array<UserDTO>>({
            path: '/users',
            method: 'GET',
            query,
        });
    };

    /**
     * newUserGroup
     */
    newUserGroupUsingPOST = ({ aGroup }: NewUserGroupUsingPOSTRequest): Observable<boolean> => {
        throwIfNullOrUndefined(aGroup, 'newUserGroupUsingPOST');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<boolean>({
            path: '/users/groups',
            method: 'POST',
            headers,
            body: aGroup,
        });
    };

    /**
     * newUser
     */
    newUserUsingPOST = ({ userDTO }: NewUserUsingPOSTRequest): Observable<boolean> => {
        throwIfNullOrUndefined(userDTO, 'newUserUsingPOST');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<boolean>({
            path: '/users',
            method: 'POST',
            headers,
            body: userDTO,
        });
    };

    /**
     * setGroupMenu
     */
    setGroupMenuUsingPOST = ({ groupCode, menusDTO }: SetGroupMenuUsingPOSTRequest): Observable<boolean> => {
        throwIfNullOrUndefined(groupCode, 'setGroupMenuUsingPOST');
        throwIfNullOrUndefined(menusDTO, 'setGroupMenuUsingPOST');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<boolean>({
            path: '/users/groups/{group_code}'.replace('{group_code}', encodeURI(groupCode)),
            method: 'POST',
            headers,
            body: menusDTO,
        });
    };

    /**
     * updateUserGroup
     */
    updateUserGroupUsingPUT = ({ aGroup }: UpdateUserGroupUsingPUTRequest): Observable<boolean> => {
        throwIfNullOrUndefined(aGroup, 'updateUserGroupUsingPUT');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<boolean>({
            path: '/users/groups',
            method: 'PUT',
            headers,
            body: aGroup,
        });
    };

    /**
     * updateUser
     */
    updateUserUsingPUT = ({ userDTO, password }: UpdateUserUsingPUTRequest): Observable<boolean> => {
        throwIfNullOrUndefined(userDTO, 'updateUserUsingPUT');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        const query: HttpQuery = {};

        if (password != null) { query['password'] = password; }

        return this.request<boolean>({
            path: '/users',
            method: 'PUT',
            headers,
            query,
            body: userDTO,
        });
    };

}
