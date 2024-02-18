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
    ExamRowDTO,
} from '../models';

export interface DeleteExam2Request {
    code: number;
}

export interface GetExamRowsByCodeRequest {
    code: number;
}

export interface GetExamRowsByCodeAndDescriptionRequest {
    code: number;
    description: string;
}

export interface GetExamRowsByExamCodeRequest {
    examCode: string;
}

export interface NewExamRowRequest {
    examRowDTO: ExamRowDTO;
}

/**
 * no description
 */
export class ExamRowsApi extends BaseAPI {

    /**
     */
    deleteExam2({ code }: DeleteExam2Request): Observable<boolean>
    deleteExam2({ code }: DeleteExam2Request, opts?: OperationOpts): Observable<RawAjaxResponse<boolean>>
    deleteExam2({ code }: DeleteExam2Request, opts?: OperationOpts): Observable<boolean | RawAjaxResponse<boolean>> {
        throwIfNullOrUndefined(code, 'code', 'deleteExam2');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<boolean>({
            url: '/examrows/{code}'.replace('{code}', encodeURI(code)),
            method: 'DELETE',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    getExamRows(): Observable<Array<ExamRowDTO>>
    getExamRows(opts?: OperationOpts): Observable<RawAjaxResponse<Array<ExamRowDTO>>>
    getExamRows(opts?: OperationOpts): Observable<Array<ExamRowDTO> | RawAjaxResponse<Array<ExamRowDTO>>> {
        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<Array<ExamRowDTO>>({
            url: '/examrows',
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    getExamRowsByCode({ code }: GetExamRowsByCodeRequest): Observable<Array<ExamRowDTO>>
    getExamRowsByCode({ code }: GetExamRowsByCodeRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Array<ExamRowDTO>>>
    getExamRowsByCode({ code }: GetExamRowsByCodeRequest, opts?: OperationOpts): Observable<Array<ExamRowDTO> | RawAjaxResponse<Array<ExamRowDTO>>> {
        throwIfNullOrUndefined(code, 'code', 'getExamRowsByCode');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<Array<ExamRowDTO>>({
            url: '/examrows/{code}'.replace('{code}', encodeURI(code)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    getExamRowsByCodeAndDescription({ code, description }: GetExamRowsByCodeAndDescriptionRequest): Observable<Array<ExamRowDTO>>
    getExamRowsByCodeAndDescription({ code, description }: GetExamRowsByCodeAndDescriptionRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Array<ExamRowDTO>>>
    getExamRowsByCodeAndDescription({ code, description }: GetExamRowsByCodeAndDescriptionRequest, opts?: OperationOpts): Observable<Array<ExamRowDTO> | RawAjaxResponse<Array<ExamRowDTO>>> {
        throwIfNullOrUndefined(code, 'code', 'getExamRowsByCodeAndDescription');
        throwIfNullOrUndefined(description, 'description', 'getExamRowsByCodeAndDescription');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        const query: HttpQuery = { // required parameters are used directly since they are already checked by throwIfNullOrUndefined
            'code': code,
            'description': description,
        };

        return this.request<Array<ExamRowDTO>>({
            url: '/examrows/search',
            method: 'GET',
            headers,
            query,
        }, opts?.responseOpts);
    };

    /**
     */
    getExamRowsByExamCode({ examCode }: GetExamRowsByExamCodeRequest): Observable<Array<ExamRowDTO>>
    getExamRowsByExamCode({ examCode }: GetExamRowsByExamCodeRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Array<ExamRowDTO>>>
    getExamRowsByExamCode({ examCode }: GetExamRowsByExamCodeRequest, opts?: OperationOpts): Observable<Array<ExamRowDTO> | RawAjaxResponse<Array<ExamRowDTO>>> {
        throwIfNullOrUndefined(examCode, 'examCode', 'getExamRowsByExamCode');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<Array<ExamRowDTO>>({
            url: '/examrows/byExamCode/{examCode}'.replace('{examCode}', encodeURI(examCode)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    newExamRow({ examRowDTO }: NewExamRowRequest): Observable<ExamRowDTO>
    newExamRow({ examRowDTO }: NewExamRowRequest, opts?: OperationOpts): Observable<RawAjaxResponse<ExamRowDTO>>
    newExamRow({ examRowDTO }: NewExamRowRequest, opts?: OperationOpts): Observable<ExamRowDTO | RawAjaxResponse<ExamRowDTO>> {
        throwIfNullOrUndefined(examRowDTO, 'examRowDTO', 'newExamRow');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<ExamRowDTO>({
            url: '/examrows',
            method: 'POST',
            headers,
            body: examRowDTO,
        }, opts?.responseOpts);
    };

}
