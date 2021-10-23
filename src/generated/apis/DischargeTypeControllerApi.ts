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

import { Observable } from "rxjs";
import {
  BaseAPI,
  HttpHeaders,
  throwIfNullOrUndefined,
  encodeURI,
  OperationOpts,
  RawAjaxResponse,
} from "../runtime";
import { DischargeTypeDTO } from "../models";

export interface DeleteDischargeTypeUsingDELETERequest {
  code: string;
}

export interface NewDischargeTypeUsingPOSTRequest {
  dischTypeDTO: DischargeTypeDTO;
}

export interface UpdateDischargeTypetUsingPUTRequest {
  dischTypeDTO: DischargeTypeDTO;
}

/**
 * no description
 */
export class DischargeTypeControllerApi extends BaseAPI {
  /**
   * deleteDischargeType
   */
  deleteDischargeTypeUsingDELETE({
    code,
  }: DeleteDischargeTypeUsingDELETERequest): Observable<boolean>;
  deleteDischargeTypeUsingDELETE(
    { code }: DeleteDischargeTypeUsingDELETERequest,
    opts?: OperationOpts
  ): Observable<RawAjaxResponse<boolean>>;
  deleteDischargeTypeUsingDELETE(
    { code }: DeleteDischargeTypeUsingDELETERequest,
    opts?: OperationOpts
  ): Observable<boolean | RawAjaxResponse<boolean>> {
    throwIfNullOrUndefined(code, "code", "deleteDischargeTypeUsingDELETE");

    const headers: HttpHeaders = {
      ...(this.configuration.apiKey && {
        Authorization: this.configuration.apiKey("Authorization"),
      }), // JWT authentication
    };

    return this.request<boolean>(
      {
        url: "/dischargetypes/{code}".replace("{code}", encodeURI(code)),
        method: "DELETE",
        headers,
      },
      opts?.responseOpts
    );
  }

  /**
   * getDischargeTypes
   */
  getDischargeTypesUsingGET(): Observable<Array<DischargeTypeDTO>>;
  getDischargeTypesUsingGET(
    opts?: OperationOpts
  ): Observable<RawAjaxResponse<Array<DischargeTypeDTO>>>;
  getDischargeTypesUsingGET(
    opts?: OperationOpts
  ): Observable<
    Array<DischargeTypeDTO> | RawAjaxResponse<Array<DischargeTypeDTO>>
  > {
    const headers: HttpHeaders = {
      ...(this.configuration.apiKey && {
        Authorization: this.configuration.apiKey("Authorization"),
      }), // JWT authentication
    };

    return this.request<Array<DischargeTypeDTO>>(
      {
        url: "/dischargetypes",
        method: "GET",
        headers,
      },
      opts?.responseOpts
    );
  }

  /**
   * newDischargeType
   */
  newDischargeTypeUsingPOST({
    dischTypeDTO,
  }: NewDischargeTypeUsingPOSTRequest): Observable<string>;
  newDischargeTypeUsingPOST(
    { dischTypeDTO }: NewDischargeTypeUsingPOSTRequest,
    opts?: OperationOpts
  ): Observable<RawAjaxResponse<string>>;
  newDischargeTypeUsingPOST(
    { dischTypeDTO }: NewDischargeTypeUsingPOSTRequest,
    opts?: OperationOpts
  ): Observable<string | RawAjaxResponse<string>> {
    throwIfNullOrUndefined(
      dischTypeDTO,
      "dischTypeDTO",
      "newDischargeTypeUsingPOST"
    );

    const headers: HttpHeaders = {
      "Content-Type": "application/json",
      ...(this.configuration.apiKey && {
        Authorization: this.configuration.apiKey("Authorization"),
      }), // JWT authentication
    };

    return this.request<string>(
      {
        url: "/dischargetypes",
        method: "POST",
        headers,
        body: dischTypeDTO,
      },
      opts?.responseOpts
    );
  }

  /**
   * updateDischargeTypet
   */
  updateDischargeTypetUsingPUT({
    dischTypeDTO,
  }: UpdateDischargeTypetUsingPUTRequest): Observable<string>;
  updateDischargeTypetUsingPUT(
    { dischTypeDTO }: UpdateDischargeTypetUsingPUTRequest,
    opts?: OperationOpts
  ): Observable<RawAjaxResponse<string>>;
  updateDischargeTypetUsingPUT(
    { dischTypeDTO }: UpdateDischargeTypetUsingPUTRequest,
    opts?: OperationOpts
  ): Observable<string | RawAjaxResponse<string>> {
    throwIfNullOrUndefined(
      dischTypeDTO,
      "dischTypeDTO",
      "updateDischargeTypetUsingPUT"
    );

    const headers: HttpHeaders = {
      "Content-Type": "application/json",
      ...(this.configuration.apiKey && {
        Authorization: this.configuration.apiKey("Authorization"),
      }), // JWT authentication
    };

    return this.request<string>(
      {
        url: "/dischargetypes",
        method: "PUT",
        headers,
        body: dischTypeDTO,
      },
      opts?.responseOpts
    );
  }
}
