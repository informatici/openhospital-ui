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

import {
    AdmissionDTO,
    PageInfoDTO,
} from './';

/**
 * @export
 * @interface PageAdmissionDTO
 */
export interface PageAdmissionDTO {
    /**
     * @type {Array<AdmissionDTO>}
     * @memberof PageAdmissionDTO
     */
    data?: Array<AdmissionDTO>;
    /**
     * @type {PageInfoDTO}
     * @memberof PageAdmissionDTO
     */
    pageInfo?: PageInfoDTO;
}
