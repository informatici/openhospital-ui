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
    VisitDTO,
} from '../models';

export interface DeleteVisitsRelatedToPatientUsingDELETERequest {
    patID: number;
}

export interface GetVisitUsingGETRequest {
    patID: number;
}

export interface NewVisitUsingPOSTRequest {
    newVisit: VisitDTO;
}

export interface NewVisitsUsingPOSTRequest {
    newVisits: Array<VisitDTO>;
}

/**
 * no description
 */
export class VisitsControllerApi extends BaseAPI {

    /**
     * deleteVisitsRelatedToPatient
     */
    deleteVisitsRelatedToPatientUsingDELETE({ patID }: DeleteVisitsRelatedToPatientUsingDELETERequest): Observable<ResponseEntity>
    deleteVisitsRelatedToPatientUsingDELETE({ patID }: DeleteVisitsRelatedToPatientUsingDELETERequest, opts?: OperationOpts): Observable<RawAjaxResponse<ResponseEntity>>
    deleteVisitsRelatedToPatientUsingDELETE({ patID }: DeleteVisitsRelatedToPatientUsingDELETERequest, opts?: OperationOpts): Observable<ResponseEntity | RawAjaxResponse<ResponseEntity>> {
        throwIfNullOrUndefined(patID, 'patID', 'deleteVisitsRelatedToPatientUsingDELETE');

        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<ResponseEntity>({
            url: '/visit/{patID}'.replace('{patID}', encodeURI(patID)),
            method: 'DELETE',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * getVisit
     */
    getVisitUsingGET({ patID }: GetVisitUsingGETRequest): Observable<Array<VisitDTO>>
    getVisitUsingGET({ patID }: GetVisitUsingGETRequest, opts?: OperationOpts): Observable<RawAjaxResponse<Array<VisitDTO>>>
    getVisitUsingGET({ patID }: GetVisitUsingGETRequest, opts?: OperationOpts): Observable<Array<VisitDTO> | RawAjaxResponse<Array<VisitDTO>>> {
        throwIfNullOrUndefined(patID, 'patID', 'getVisitUsingGET');

        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<Array<VisitDTO>>({
            url: '/visit/{patID}'.replace('{patID}', encodeURI(patID)),
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * newVisit
     */
    newVisitUsingPOST({ newVisit }: NewVisitUsingPOSTRequest): Observable<number>
    newVisitUsingPOST({ newVisit }: NewVisitUsingPOSTRequest, opts?: OperationOpts): Observable<RawAjaxResponse<number>>
    newVisitUsingPOST({ newVisit }: NewVisitUsingPOSTRequest, opts?: OperationOpts): Observable<number | RawAjaxResponse<number>> {
        throwIfNullOrUndefined(newVisit, 'newVisit', 'newVisitUsingPOST');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<number>({
            url: '/visit',
            method: 'POST',
            headers,
            body: newVisit,
        }, opts?.responseOpts);
    };

    /**
     * newVisits
     */
    newVisitsUsingPOST({ newVisits }: NewVisitsUsingPOSTRequest): Observable<ResponseEntity>
    newVisitsUsingPOST({ newVisits }: NewVisitsUsingPOSTRequest, opts?: OperationOpts): Observable<RawAjaxResponse<ResponseEntity>>
    newVisitsUsingPOST({ newVisits }: NewVisitsUsingPOSTRequest, opts?: OperationOpts): Observable<ResponseEntity | RawAjaxResponse<ResponseEntity>> {
        throwIfNullOrUndefined(newVisits, 'newVisits', 'newVisitsUsingPOST');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<ResponseEntity>({
            url: '/visits',
            method: 'POST',
            headers,
            body: newVisits,
        }, opts?.responseOpts);
    };

}
