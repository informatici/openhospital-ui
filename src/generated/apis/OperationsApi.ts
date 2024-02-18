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
    OpdDTO,
    OperationDTO,
    OperationRowDTO,
} from '../models';

export interface DeleteOperationRequest {
    code: string;
}

export interface DeleteOperationRowRequest {
    code: number;
}

export interface GetOperationByCodeRequest {
    code: string;
}

export interface GetOperationByTypeDescriptionRequest {
    typeDescription: string;
}

export interface GetOperationRowsByAdmtRequest {
    admissionId: number;
}

export interface GetOperationRowsByOpdRequest {
    opdDTO: OpdDTO;
}

export interface GetOperationRowsByPatientRequest {
    patientCode: number;
}

export interface NewOperationRequest {
    operationDTO: OperationDTO;
}

export interface NewOperationRowRequest {
    operationRowDTO: OperationRowDTO;
}

export interface UpdateOperationRequest {
    code: string;
    operationDTO: OperationDTO;
}

export interface UpdateOperationRowRequest {
    operationRowDTO: OperationRowDTO;
}

/**
 * no description
 */
export class OperationsApi extends BaseAPI {

    /**
     */
    deleteOperation({ code }: DeleteOperationRequest): Observable<boolean>
    deleteOperation({ code }: DeleteOperationRequest, opts?: OperationOpts): Observable<RawAjaxResponse<boolean>>
    deleteOperation({ code }: DeleteOperationRequest, opts?: OperationOpts): Observable<boolean | RawAjaxResponse<boolean>> {
        throwIfNullOrUndefined(code, 'code', 'deleteOperation');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<boolean>({
            url: '/operations/{code}'.replace('{code}', encodeURI(code)),
            method: 'DELETE',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    deleteOperationRow({ code }: DeleteOperationRowRequest): Observable<boolean>
    deleteOperationRow({ code }: DeleteOperationRowRequest, opts?: OperationOpts): Observable<RawAjaxResponse<boolean>>
    deleteOperationRow({ code }: DeleteOperationRowRequest, opts?: OperationOpts): Observable<boolean | RawAjaxResponse<boolean>> {
        throwIfNullOrUndefined(code, 'code', 'deleteOperationRow');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<boolean>({
            url: '/operations/rows/{code}'.replace('{code}', encodeURI(code)),
            method: 'DELETE',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    getOperationByCode({ code }: GetOperationByCodeRequest): Observable<OperationDTO>
    getOperationByCode({ code }: GetOperationByCodeRequest, opts?: OperationOpts): Observable<RawAjaxResponse<OperationDTO>>
    getOperationByCode({ code }: GetOperationByCodeRequest, opts?: OperationOpts): Observable<OperationDTO | RawAjaxResponse<OperationDTO>> {
        throwIfNullOrUndefined(code, 'code', 'getOperationByCode');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<OperationDTO>({
            url: '/operations/{code}'.replace('{code}', encodeURI(code)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    getOperationByTypeDescription({ typeDescription }: GetOperationByTypeDescriptionRequest): Observable<Array<OperationDTO>>
    getOperationByTypeDescription({ typeDescription }: GetOperationByTypeDescriptionRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Array<OperationDTO>>>
    getOperationByTypeDescription({ typeDescription }: GetOperationByTypeDescriptionRequest, opts?: OperationOpts): Observable<Array<OperationDTO> | RawAjaxResponse<Array<OperationDTO>>> {
        throwIfNullOrUndefined(typeDescription, 'typeDescription', 'getOperationByTypeDescription');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'typeDescription': typeDescription,
        };

        return this.request<Array<OperationDTO>>({
            url: '/operations/search/type',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     */
    getOperationRowsByAdmt({ admissionId }: GetOperationRowsByAdmtRequest): Observable<Array<OperationRowDTO>>
    getOperationRowsByAdmt({ admissionId }: GetOperationRowsByAdmtRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Array<OperationRowDTO>>>
    getOperationRowsByAdmt({ admissionId }: GetOperationRowsByAdmtRequest, opts?: OperationOpts): Observable<Array<OperationRowDTO> | RawAjaxResponse<Array<OperationRowDTO>>> {
        throwIfNullOrUndefined(admissionId, 'admissionId', 'getOperationRowsByAdmt');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'admissionId': admissionId,
        };

        return this.request<Array<OperationRowDTO>>({
            url: '/operations/rows/search/admission',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     */
    getOperationRowsByOpd({ opdDTO }: GetOperationRowsByOpdRequest): Observable<Array<OperationRowDTO>>
    getOperationRowsByOpd({ opdDTO }: GetOperationRowsByOpdRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Array<OperationRowDTO>>>
    getOperationRowsByOpd({ opdDTO }: GetOperationRowsByOpdRequest, opts?: OperationOpts): Observable<Array<OperationRowDTO> | RawAjaxResponse<Array<OperationRowDTO>>> {
        throwIfNullOrUndefined(opdDTO, 'opdDTO', 'getOperationRowsByOpd');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<Array<OperationRowDTO>>({
            url: '/operations/rows/search/opd',
            method: 'POST',
            headers,
            body: opdDTO,
        }, opts?.responseOpts);
    };

    /**
     */
    getOperationRowsByPatient({ patientCode }: GetOperationRowsByPatientRequest): Observable<Array<OperationRowDTO>>
    getOperationRowsByPatient({ patientCode }: GetOperationRowsByPatientRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Array<OperationRowDTO>>>
    getOperationRowsByPatient({ patientCode }: GetOperationRowsByPatientRequest, opts?: OperationOpts): Observable<Array<OperationRowDTO> | RawAjaxResponse<Array<OperationRowDTO>>> {
        throwIfNullOrUndefined(patientCode, 'patientCode', 'getOperationRowsByPatient');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'patientCode': patientCode,
        };

        return this.request<Array<OperationRowDTO>>({
            url: '/operations/rows/search/patient',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     */
    getOperations(): Observable<Array<OperationDTO>>
    getOperations(opts?: OperationOpts): Observable<RawAjaxResponse<Array<OperationDTO>>>
    getOperations(opts?: OperationOpts): Observable<Array<OperationDTO> | RawAjaxResponse<Array<OperationDTO>>> {
        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<Array<OperationDTO>>({
            url: '/operations',
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    newOperation({ operationDTO }: NewOperationRequest): Observable<OperationDTO>
    newOperation({ operationDTO }: NewOperationRequest, opts?: OperationOpts): Observable<RawAjaxResponse<OperationDTO>>
    newOperation({ operationDTO }: NewOperationRequest, opts?: OperationOpts): Observable<OperationDTO | RawAjaxResponse<OperationDTO>> {
        throwIfNullOrUndefined(operationDTO, 'operationDTO', 'newOperation');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<OperationDTO>({
            url: '/operations',
            method: 'POST',
            headers,
            body: operationDTO,
        }, opts?.responseOpts);
    };

    /**
     */
    newOperationRow({ operationRowDTO }: NewOperationRowRequest): Observable<OperationRowDTO>
    newOperationRow({ operationRowDTO }: NewOperationRowRequest, opts?: OperationOpts): Observable<RawAjaxResponse<OperationRowDTO>>
    newOperationRow({ operationRowDTO }: NewOperationRowRequest, opts?: OperationOpts): Observable<OperationRowDTO | RawAjaxResponse<OperationRowDTO>> {
        throwIfNullOrUndefined(operationRowDTO, 'operationRowDTO', 'newOperationRow');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<OperationRowDTO>({
            url: '/operations/rows',
            method: 'POST',
            headers,
            body: operationRowDTO,
        }, opts?.responseOpts);
    };

    /**
     */
    updateOperation({ code, operationDTO }: UpdateOperationRequest): Observable<OperationDTO>
    updateOperation({ code, operationDTO }: UpdateOperationRequest, opts?: OperationOpts): Observable<RawAjaxResponse<OperationDTO>>
    updateOperation({ code, operationDTO }: UpdateOperationRequest, opts?: OperationOpts): Observable<OperationDTO | RawAjaxResponse<OperationDTO>> {
        throwIfNullOrUndefined(code, 'code', 'updateOperation');
        throwIfNullOrUndefined(operationDTO, 'operationDTO', 'updateOperation');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<OperationDTO>({
            url: '/operations/{code}'.replace('{code}', encodeURI(code)),
            method: 'PUT',
            headers,
            body: operationDTO,
        }, opts?.responseOpts);
    };

    /**
     */
    updateOperationRow({ operationRowDTO }: UpdateOperationRowRequest): Observable<number>
    updateOperationRow({ operationRowDTO }: UpdateOperationRowRequest, opts?: OperationOpts): Observable<RawAjaxResponse<number>>
    updateOperationRow({ operationRowDTO }: UpdateOperationRowRequest, opts?: OperationOpts): Observable<number | RawAjaxResponse<number>> {
        throwIfNullOrUndefined(operationRowDTO, 'operationRowDTO', 'updateOperationRow');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<number>({
            url: '/operations/rows',
            method: 'PUT',
            headers,
            body: operationRowDTO,
        }, opts?.responseOpts);
    };

}
