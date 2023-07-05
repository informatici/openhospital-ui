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
    MedicalDTO,
} from '../models';

export interface DeleteMedicalUsingDELETERequest {
    code: number;
}

export interface FilterMedicalsUsingGETRequest {
    critical?: boolean;
    desc?: string;
    nameSorted?: boolean;
    type?: string;
}

export interface GetMedicalUsingGETRequest {
    code: number;
}

export interface GetMedicalsUsingGETRequest {
    sortBy?: GetMedicalsUsingGETSortByEnum;
}

export interface NewMedicalUsingPOSTRequest {
    medicalDTO: MedicalDTO;
    ignoreSimilar?: boolean;
}

export interface UpdateMedicalUsingPUTRequest {
    medicalDTO: MedicalDTO;
    ignoreSimilar?: boolean;
}

/**
 * no description
 */
export class MedicalControllerApi extends BaseAPI {

    /**
     * deleteMedical
     */
    deleteMedicalUsingDELETE({ code }: DeleteMedicalUsingDELETERequest): Observable<boolean>
    deleteMedicalUsingDELETE({ code }: DeleteMedicalUsingDELETERequest, opts?: OperationOpts): Observable<RawAjaxResponse<boolean>>
    deleteMedicalUsingDELETE({ code }: DeleteMedicalUsingDELETERequest, opts?: OperationOpts): Observable<boolean | RawAjaxResponse<boolean>> {
        throwIfNullOrUndefined(code, 'code', 'deleteMedicalUsingDELETE');

        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<boolean>({
            url: '/medicals/{code}'.replace('{code}', encodeURI(code)),
            method: 'DELETE',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * filterMedicals
     */
    filterMedicalsUsingGET({ critical, desc, nameSorted, type }: FilterMedicalsUsingGETRequest): Observable<Array<MedicalDTO>>
    filterMedicalsUsingGET({ critical, desc, nameSorted, type }: FilterMedicalsUsingGETRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Array<MedicalDTO>>>
    filterMedicalsUsingGET({ critical, desc, nameSorted, type }: FilterMedicalsUsingGETRequest, opts?: OperationOpts): Observable<Array<MedicalDTO> | RawAjaxResponse<Array<MedicalDTO>>> {

        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        const query: HttpQuery = {};

        if (critical != null) { query['critical'] = critical; }
        if (desc != null) { query['desc'] = desc; }
        if (nameSorted != null) { query['name_sorted'] = nameSorted; }
        if (type != null) { query['type'] = type; }

        return this.request<Array<MedicalDTO>>({
            url: '/medicals/filter',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * getMedical
     */
    getMedicalUsingGET({ code }: GetMedicalUsingGETRequest): Observable<MedicalDTO>
    getMedicalUsingGET({ code }: GetMedicalUsingGETRequest, opts?: OperationOpts): Observable<RawAjaxResponse<MedicalDTO>>
    getMedicalUsingGET({ code }: GetMedicalUsingGETRequest, opts?: OperationOpts): Observable<MedicalDTO | RawAjaxResponse<MedicalDTO>> {
        throwIfNullOrUndefined(code, 'code', 'getMedicalUsingGET');

        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<MedicalDTO>({
            url: '/medicals/{code}'.replace('{code}', encodeURI(code)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * getMedicals
     */
    getMedicalsUsingGET({ sortBy }: GetMedicalsUsingGETRequest): Observable<Array<MedicalDTO>>
    getMedicalsUsingGET({ sortBy }: GetMedicalsUsingGETRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Array<MedicalDTO>>>
    getMedicalsUsingGET({ sortBy }: GetMedicalsUsingGETRequest, opts?: OperationOpts): Observable<Array<MedicalDTO> | RawAjaxResponse<Array<MedicalDTO>>> {

        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        const query: HttpQuery = {};

        if (sortBy != null) { query['sort_by'] = sortBy; }

        return this.request<Array<MedicalDTO>>({
            url: '/medicals',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     * newMedical
     */
    newMedicalUsingPOST({ medicalDTO, ignoreSimilar }: NewMedicalUsingPOSTRequest): Observable<MedicalDTO>
    newMedicalUsingPOST({ medicalDTO, ignoreSimilar }: NewMedicalUsingPOSTRequest, opts?: OperationOpts): Observable<RawAjaxResponse<MedicalDTO>>
    newMedicalUsingPOST({ medicalDTO, ignoreSimilar }: NewMedicalUsingPOSTRequest, opts?: OperationOpts): Observable<MedicalDTO | RawAjaxResponse<MedicalDTO>> {
        throwIfNullOrUndefined(medicalDTO, 'medicalDTO', 'newMedicalUsingPOST');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        const query: HttpQuery = {};

        if (ignoreSimilar != null) { query['ignore_similar'] = ignoreSimilar; }

        return this.request<MedicalDTO>({
            url: '/medicals',
            method: 'POST',
            headers,
            query,
            body: medicalDTO,
        }, opts?.responseOpts);
    };

    /**
     * updateMedical
     */
    updateMedicalUsingPUT({ medicalDTO, ignoreSimilar }: UpdateMedicalUsingPUTRequest): Observable<MedicalDTO>
    updateMedicalUsingPUT({ medicalDTO, ignoreSimilar }: UpdateMedicalUsingPUTRequest, opts?: OperationOpts): Observable<RawAjaxResponse<MedicalDTO>>
    updateMedicalUsingPUT({ medicalDTO, ignoreSimilar }: UpdateMedicalUsingPUTRequest, opts?: OperationOpts): Observable<MedicalDTO | RawAjaxResponse<MedicalDTO>> {
        throwIfNullOrUndefined(medicalDTO, 'medicalDTO', 'updateMedicalUsingPUT');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        const query: HttpQuery = {};

        if (ignoreSimilar != null) { query['ignore_similar'] = ignoreSimilar; }

        return this.request<MedicalDTO>({
            url: '/medicals',
            method: 'PUT',
            headers,
            query,
            body: medicalDTO,
        }, opts?.responseOpts);
    };

}

/**
 * @export
 * @enum {string}
 */
export enum GetMedicalsUsingGETSortByEnum {
    CODE = 'CODE',
    NAME = 'NAME',
    NONE = 'NONE'
}
