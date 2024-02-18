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
    ExamDTO,
} from '../models';

export interface DeleteExam1Request {
    code: string;
}

export interface GetExams1Request {
    description: string;
}

export interface NewExamRequest {
    examDTO: ExamDTO;
}

export interface UpdateExamsRequest {
    code: string;
    examDTO: ExamDTO;
}

/**
 * no description
 */
export class ExamsApi extends BaseAPI {

    /**
     */
    deleteExam1({ code }: DeleteExam1Request): Observable<boolean>
    deleteExam1({ code }: DeleteExam1Request, opts?: OperationOpts): Observable<RawAjaxResponse<boolean>>
    deleteExam1({ code }: DeleteExam1Request, opts?: OperationOpts): Observable<boolean | RawAjaxResponse<boolean>> {
        throwIfNullOrUndefined(code, 'code', 'deleteExam1');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<boolean>({
            url: '/exams/{code}'.replace('{code}', encodeURI(code)),
            method: 'DELETE',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    getExams(): Observable<Array<ExamDTO>>
    getExams(opts?: OperationOpts): Observable<RawAjaxResponse<Array<ExamDTO>>>
    getExams(opts?: OperationOpts): Observable<Array<ExamDTO> | RawAjaxResponse<Array<ExamDTO>>> {
        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<Array<ExamDTO>>({
            url: '/exams',
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    getExams1({ description }: GetExams1Request): Observable<Array<ExamDTO>>
    getExams1({ description }: GetExams1Request, opts?: OperationOpts): Observable<RawAjaxResponse<Array<ExamDTO>>>
    getExams1({ description }: GetExams1Request, opts?: OperationOpts): Observable<Array<ExamDTO> | RawAjaxResponse<Array<ExamDTO>>> {
        throwIfNullOrUndefined(description, 'description', 'getExams1');

        const headers: HttpHeaders = {
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<Array<ExamDTO>>({
            url: '/exams/description/{description}'.replace('{description}', encodeURI(description)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     */
    newExam({ examDTO }: NewExamRequest): Observable<ExamDTO>
    newExam({ examDTO }: NewExamRequest, opts?: OperationOpts): Observable<RawAjaxResponse<ExamDTO>>
    newExam({ examDTO }: NewExamRequest, opts?: OperationOpts): Observable<ExamDTO | RawAjaxResponse<ExamDTO>> {
        throwIfNullOrUndefined(examDTO, 'examDTO', 'newExam');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<ExamDTO>({
            url: '/exams',
            method: 'POST',
            headers,
            body: examDTO,
        }, opts?.responseOpts);
    };

    /**
     */
    updateExams({ code, examDTO }: UpdateExamsRequest): Observable<ExamDTO>
    updateExams({ code, examDTO }: UpdateExamsRequest, opts?: OperationOpts): Observable<RawAjaxResponse<ExamDTO>>
    updateExams({ code, examDTO }: UpdateExamsRequest, opts?: OperationOpts): Observable<ExamDTO | RawAjaxResponse<ExamDTO>> {
        throwIfNullOrUndefined(code, 'code', 'updateExams');
        throwIfNullOrUndefined(examDTO, 'examDTO', 'updateExams');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.username != null && this.configuration.password != null ? { Authorization: `Basic ${btoa(this.configuration.username + ':' + this.configuration.password)}` } : undefined),
        };

        return this.request<ExamDTO>({
            url: '/exams/{code}'.replace('{code}', encodeURI(code)),
            method: 'PUT',
            headers,
            body: examDTO,
        }, opts?.responseOpts);
    };

}
