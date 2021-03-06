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
    DeliveryResultTypeDTO,
} from '../models';

export interface DeleteDeliveryResultTypeUsingDELETERequest {
    code: string;
}

export interface NewDeliveryResultTypeUsingPOSTRequest {
    dlvrrestTypeDTO: DeliveryResultTypeDTO;
}

export interface UpdateDeliveryResultTypetUsingPUTRequest {
    dlvrrestTypeDTO: DeliveryResultTypeDTO;
}

/**
 * no description
 */
export class DeliveryResultTypeControllerApi extends BaseAPI {

    /**
     * deleteDeliveryResultType
     */
    deleteDeliveryResultTypeUsingDELETE({ code }: DeleteDeliveryResultTypeUsingDELETERequest): Observable<boolean>
    deleteDeliveryResultTypeUsingDELETE({ code }: DeleteDeliveryResultTypeUsingDELETERequest, opts?: OperationOpts): Observable<RawAjaxResponse<boolean>>
    deleteDeliveryResultTypeUsingDELETE({ code }: DeleteDeliveryResultTypeUsingDELETERequest, opts?: OperationOpts): Observable<boolean | RawAjaxResponse<boolean>> {
        throwIfNullOrUndefined(code, 'code', 'deleteDeliveryResultTypeUsingDELETE');

        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<boolean>({
            url: '/deliveryresulttypes/{code}'.replace('{code}', encodeURI(code)),
            method: 'DELETE',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * getDeliveryResultTypes
     */
    getDeliveryResultTypesUsingGET(): Observable<Array<DeliveryResultTypeDTO>>
    getDeliveryResultTypesUsingGET(opts?: OperationOpts): Observable<RawAjaxResponse<Array<DeliveryResultTypeDTO>>>
    getDeliveryResultTypesUsingGET(opts?: OperationOpts): Observable<Array<DeliveryResultTypeDTO> | RawAjaxResponse<Array<DeliveryResultTypeDTO>>> {
        const headers: HttpHeaders = {
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<Array<DeliveryResultTypeDTO>>({
            url: '/deliveryresulttypes',
            method: 'GET',
            headers,
        }, opts?.responseOpts);
    };

    /**
     * newDeliveryResultType
     */
    newDeliveryResultTypeUsingPOST({ dlvrrestTypeDTO }: NewDeliveryResultTypeUsingPOSTRequest): Observable<string>
    newDeliveryResultTypeUsingPOST({ dlvrrestTypeDTO }: NewDeliveryResultTypeUsingPOSTRequest, opts?: OperationOpts): Observable<RawAjaxResponse<string>>
    newDeliveryResultTypeUsingPOST({ dlvrrestTypeDTO }: NewDeliveryResultTypeUsingPOSTRequest, opts?: OperationOpts): Observable<string | RawAjaxResponse<string>> {
        throwIfNullOrUndefined(dlvrrestTypeDTO, 'dlvrrestTypeDTO', 'newDeliveryResultTypeUsingPOST');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<string>({
            url: '/deliveryresulttypes',
            method: 'POST',
            headers,
            body: dlvrrestTypeDTO,
        }, opts?.responseOpts);
    };

    /**
     * updateDeliveryResultTypet
     */
    updateDeliveryResultTypetUsingPUT({ dlvrrestTypeDTO }: UpdateDeliveryResultTypetUsingPUTRequest): Observable<string>
    updateDeliveryResultTypetUsingPUT({ dlvrrestTypeDTO }: UpdateDeliveryResultTypetUsingPUTRequest, opts?: OperationOpts): Observable<RawAjaxResponse<string>>
    updateDeliveryResultTypetUsingPUT({ dlvrrestTypeDTO }: UpdateDeliveryResultTypetUsingPUTRequest, opts?: OperationOpts): Observable<string | RawAjaxResponse<string>> {
        throwIfNullOrUndefined(dlvrrestTypeDTO, 'dlvrrestTypeDTO', 'updateDeliveryResultTypetUsingPUT');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
            ...(this.configuration.apiKey && { 'Authorization': this.configuration.apiKey('Authorization') }), // JWT authentication
        };

        return this.request<string>({
            url: '/deliveryresulttypes',
            method: 'PUT',
            headers,
            body: dlvrrestTypeDTO,
        }, opts?.responseOpts);
    };

}
