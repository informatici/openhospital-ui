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
import { BaseAPI, HttpHeaders, throwIfNullOrUndefined, encodeURI, OperationOpts, RawAjaxResponse } from '../runtime';
import {
    ResponseEntity,
    WardDTO,
} from '../models';

export interface CheckWardCodeUsingGETRequest {
    code: string;
}

export interface CheckWardMaternityCodeUsingGETRequest {
    createIfNotExist: boolean;
}

export interface DeleteWardUsingDELETERequest {
    code: string;
}

export interface GetCurrentOccupationUsingGETRequest {
    code: string;
}

export interface NewWardUsingPOSTRequest {
    newWard: WardDTO;
}

export interface UpdateWardUsingPUTRequest {
    updateWard: WardDTO;
}

/**
 * no description
 */
export class WardControllerApi extends BaseAPI {

    /**
     * checkWardCode
     */
    checkWardCodeUsingGET({ code }: CheckWardCodeUsingGETRequest): Observable<boolean>
    checkWardCodeUsingGET({ code }: CheckWardCodeUsingGETRequest, opts?: OperationOpts): Observable<RawAjaxResponse<boolean>>
    checkWardCodeUsingGET({ code }: CheckWardCodeUsingGETRequest, opts?: OperationOpts): Observable<boolean | RawAjaxResponse<boolean>> {
        throwIfNullOrUndefined(code, 'code', 'checkWardCodeUsingGET');

        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<boolean>({
            url: '/wards/check/{code}'.replace('{code}', encodeURI(code)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * checkWardMaternityCode
     */
    checkWardMaternityCodeUsingGET({ createIfNotExist }: CheckWardMaternityCodeUsingGETRequest): Observable<boolean>
    checkWardMaternityCodeUsingGET({ createIfNotExist }: CheckWardMaternityCodeUsingGETRequest, opts?: OperationOpts): Observable<RawAjaxResponse<boolean>>
    checkWardMaternityCodeUsingGET({ createIfNotExist }: CheckWardMaternityCodeUsingGETRequest, opts?: OperationOpts): Observable<boolean | RawAjaxResponse<boolean>> {
        throwIfNullOrUndefined(createIfNotExist, 'createIfNotExist', 'checkWardMaternityCodeUsingGET');

        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<boolean>({
            url: '/wards/check/maternity/{createIfNotExist}'.replace('{createIfNotExist}', encodeURI(createIfNotExist)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * deleteWard
     */
    deleteWardUsingDELETE({ code }: DeleteWardUsingDELETERequest): Observable<ResponseEntity>
    deleteWardUsingDELETE({ code }: DeleteWardUsingDELETERequest, opts?: OperationOpts): Observable<RawAjaxResponse<ResponseEntity>>
    deleteWardUsingDELETE({ code }: DeleteWardUsingDELETERequest, opts?: OperationOpts): Observable<ResponseEntity | RawAjaxResponse<ResponseEntity>> {
        throwIfNullOrUndefined(code, 'code', 'deleteWardUsingDELETE');

        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<ResponseEntity>({
            url: '/wards/{code}'.replace('{code}', encodeURI(code)),
            method: 'DELETE',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * getCurrentOccupation
     */
    getCurrentOccupationUsingGET({ code }: GetCurrentOccupationUsingGETRequest): Observable<number>
    getCurrentOccupationUsingGET({ code }: GetCurrentOccupationUsingGETRequest, opts?: OperationOpts): Observable<RawAjaxResponse<number>>
    getCurrentOccupationUsingGET({ code }: GetCurrentOccupationUsingGETRequest, opts?: OperationOpts): Observable<number | RawAjaxResponse<number>> {
        throwIfNullOrUndefined(code, 'code', 'getCurrentOccupationUsingGET');

        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<number>({
            url: '/wards/occupation/{code}'.replace('{code}', encodeURI(code)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * getWardsNoMaternity
     */
    getWardsNoMaternityUsingGET(): Observable<Array<WardDTO>>
    getWardsNoMaternityUsingGET(opts?: OperationOpts): Observable<RawAjaxResponse<Array<WardDTO>>>
    getWardsNoMaternityUsingGET(opts?: OperationOpts): Observable<Array<WardDTO> | RawAjaxResponse<Array<WardDTO>>> {
        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<Array<WardDTO>>({
            url: '/wardsNoMaternity',
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * getWards
     */
    getWardsUsingGET(): Observable<Array<WardDTO>>
    getWardsUsingGET(opts?: OperationOpts): Observable<RawAjaxResponse<Array<WardDTO>>>
    getWardsUsingGET(opts?: OperationOpts): Observable<Array<WardDTO> | RawAjaxResponse<Array<WardDTO>>> {
        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<Array<WardDTO>>({
            url: '/wards',
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * newWard
     */
    newWardUsingPOST({ newWard }: NewWardUsingPOSTRequest): Observable<WardDTO>
    newWardUsingPOST({ newWard }: NewWardUsingPOSTRequest, opts?: OperationOpts): Observable<RawAjaxResponse<WardDTO>>
    newWardUsingPOST({ newWard }: NewWardUsingPOSTRequest, opts?: OperationOpts): Observable<WardDTO | RawAjaxResponse<WardDTO>> {
        throwIfNullOrUndefined(newWard, 'newWard', 'newWardUsingPOST');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<WardDTO>({
            url: '/wards',
            method: 'POST',
            headers,
            body: newWard,
        }, opts?.responseOpts);
    };

    /**
     * updateWard
     */
    updateWardUsingPUT({ updateWard }: UpdateWardUsingPUTRequest): Observable<ResponseEntity>
    updateWardUsingPUT({ updateWard }: UpdateWardUsingPUTRequest, opts?: OperationOpts): Observable<RawAjaxResponse<ResponseEntity>>
    updateWardUsingPUT({ updateWard }: UpdateWardUsingPUTRequest, opts?: OperationOpts): Observable<ResponseEntity | RawAjaxResponse<ResponseEntity>> {
        throwIfNullOrUndefined(updateWard, 'updateWard', 'updateWardUsingPUT');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<ResponseEntity>({
            url: '/wards',
            method: 'PUT',
            headers,
            body: updateWard,
        }, opts?.responseOpts);
    };

}
