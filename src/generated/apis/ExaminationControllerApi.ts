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
import { BaseAPI, HttpHeaders, HttpQuery, throwIfNullOrUndefined, encodeURI, OperationOpts, RawAjaxResponse } from '../runtime';
import {
    PageOfPatientExaminationDTO,
    PatientExaminationDTO,
} from '../models';

export interface GetByIDUsingGETRequest {
    id: number;
}

export interface GetByPatientIdUsingGETRequest {
    patId: number;
}

export interface GetDefaultPatientExaminationUsingGETRequest {
    patId: number;
}

export interface GetFromLastPatientExaminationUsingGETRequest {
    id: number;
}

export interface GetLastByPatientIdUsingGETRequest {
    patId: number;
}

export interface GetLastNByPatIDUsingGETRequest {
    limit: number;
    patId: number;
}

export interface NewPatientExaminationUsingPOSTRequest {
    newPatientExamination: PatientExaminationDTO;
}

export interface UpdateExaminationUsingPUTRequest {
    id: number;
    dto: PatientExaminationDTO;
}

/**
 * no description
 */
export class ExaminationControllerApi extends BaseAPI {

    /**
     * getByID
     */
    getByIDUsingGET({ id }: GetByIDUsingGETRequest): Observable<PatientExaminationDTO>
    getByIDUsingGET({ id }: GetByIDUsingGETRequest, opts?: OperationOpts): Observable<RawAjaxResponse<PatientExaminationDTO>>
    getByIDUsingGET({ id }: GetByIDUsingGETRequest, opts?: OperationOpts): Observable<PatientExaminationDTO | RawAjaxResponse<PatientExaminationDTO>> {
        throwIfNullOrUndefined(id, 'id', 'getByIDUsingGET');

        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<PatientExaminationDTO>({
            url: '/examinations/{id}'.replace('{id}', encodeURI(id)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * getByPatientId
     */
    getByPatientIdUsingGET({ patId }: GetByPatientIdUsingGETRequest): Observable<Array<PatientExaminationDTO>>
    getByPatientIdUsingGET({ patId }: GetByPatientIdUsingGETRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Array<PatientExaminationDTO>>>
    getByPatientIdUsingGET({ patId }: GetByPatientIdUsingGETRequest, opts?: OperationOpts): Observable<Array<PatientExaminationDTO> | RawAjaxResponse<Array<PatientExaminationDTO>>> {
        throwIfNullOrUndefined(patId, 'patId', 'getByPatientIdUsingGET');

        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<Array<PatientExaminationDTO>>({
            url: '/examinations/byPatientId/{patId}'.replace('{patId}', encodeURI(patId)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * getDefaultPatientExamination
     */
    getDefaultPatientExaminationUsingGET({ patId }: GetDefaultPatientExaminationUsingGETRequest): Observable<PatientExaminationDTO>
    getDefaultPatientExaminationUsingGET({ patId }: GetDefaultPatientExaminationUsingGETRequest, opts?: OperationOpts): Observable<RawAjaxResponse<PatientExaminationDTO>>
    getDefaultPatientExaminationUsingGET({ patId }: GetDefaultPatientExaminationUsingGETRequest, opts?: OperationOpts): Observable<PatientExaminationDTO | RawAjaxResponse<PatientExaminationDTO>> {
        throwIfNullOrUndefined(patId, 'patId', 'getDefaultPatientExaminationUsingGET');

        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'patId': patId,
        };

        return this.request<PatientExaminationDTO>({
            url: '/examinations/defaultPatientExamination',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * getFromLastPatientExamination
     */
    getFromLastPatientExaminationUsingGET({ id }: GetFromLastPatientExaminationUsingGETRequest): Observable<PatientExaminationDTO>
    getFromLastPatientExaminationUsingGET({ id }: GetFromLastPatientExaminationUsingGETRequest, opts?: OperationOpts): Observable<RawAjaxResponse<PatientExaminationDTO>>
    getFromLastPatientExaminationUsingGET({ id }: GetFromLastPatientExaminationUsingGETRequest, opts?: OperationOpts): Observable<PatientExaminationDTO | RawAjaxResponse<PatientExaminationDTO>> {
        throwIfNullOrUndefined(id, 'id', 'getFromLastPatientExaminationUsingGET');

        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<PatientExaminationDTO>({
            url: '/examinations/fromLastPatientExamination/{id}'.replace('{id}', encodeURI(id)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * getLastByPatientId
     */
    getLastByPatientIdUsingGET({ patId }: GetLastByPatientIdUsingGETRequest): Observable<PatientExaminationDTO>
    getLastByPatientIdUsingGET({ patId }: GetLastByPatientIdUsingGETRequest, opts?: OperationOpts): Observable<RawAjaxResponse<PatientExaminationDTO>>
    getLastByPatientIdUsingGET({ patId }: GetLastByPatientIdUsingGETRequest, opts?: OperationOpts): Observable<PatientExaminationDTO | RawAjaxResponse<PatientExaminationDTO>> {
        throwIfNullOrUndefined(patId, 'patId', 'getLastByPatientIdUsingGET');

        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<PatientExaminationDTO>({
            url: '/examinations/lastByPatientId/{patId}'.replace('{patId}', encodeURI(patId)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * getLastNByPatID
     */
    getLastNByPatIDUsingGET({ limit, patId }: GetLastNByPatIDUsingGETRequest): Observable<PageOfPatientExaminationDTO>
    getLastNByPatIDUsingGET({ limit, patId }: GetLastNByPatIDUsingGETRequest, opts?: OperationOpts): Observable<RawAjaxResponse<PageOfPatientExaminationDTO>>
    getLastNByPatIDUsingGET({ limit, patId }: GetLastNByPatIDUsingGETRequest, opts?: OperationOpts): Observable<PageOfPatientExaminationDTO | RawAjaxResponse<PageOfPatientExaminationDTO>> {
        throwIfNullOrUndefined(limit, 'limit', 'getLastNByPatIDUsingGET');
        throwIfNullOrUndefined(patId, 'patId', 'getLastNByPatIDUsingGET');

        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'limit': limit,
            'patId': patId,
        };

        return this.request<PageOfPatientExaminationDTO>({
            url: '/examinations/lastNByPatId',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * newPatientExamination
     */
    newPatientExaminationUsingPOST({ newPatientExamination }: NewPatientExaminationUsingPOSTRequest): Observable<boolean>
    newPatientExaminationUsingPOST({ newPatientExamination }: NewPatientExaminationUsingPOSTRequest, opts?: OperationOpts): Observable<RawAjaxResponse<boolean>>
    newPatientExaminationUsingPOST({ newPatientExamination }: NewPatientExaminationUsingPOSTRequest, opts?: OperationOpts): Observable<boolean | RawAjaxResponse<boolean>> {
        throwIfNullOrUndefined(newPatientExamination, 'newPatientExamination', 'newPatientExaminationUsingPOST');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<boolean>({
            url: '/examinations',
            method: 'POST',
            headers,
            body: newPatientExamination,
        }, opts?.responseOpts);
    };

    /**
     * updateExamination
     */
    updateExaminationUsingPUT({ id, dto }: UpdateExaminationUsingPUTRequest): Observable<boolean>
    updateExaminationUsingPUT({ id, dto }: UpdateExaminationUsingPUTRequest, opts?: OperationOpts): Observable<RawAjaxResponse<boolean>>
    updateExaminationUsingPUT({ id, dto }: UpdateExaminationUsingPUTRequest, opts?: OperationOpts): Observable<boolean | RawAjaxResponse<boolean>> {
        throwIfNullOrUndefined(id, 'id', 'updateExaminationUsingPUT');
        throwIfNullOrUndefined(dto, 'dto', 'updateExaminationUsingPUT');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<boolean>({
            url: '/examinations/{id}'.replace('{id}', encodeURI(id)),
            method: 'PUT',
            headers,
            body: dto,
        }, opts?.responseOpts);
    };

}
