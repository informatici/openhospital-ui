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
    PageInfoDTO,
    PatientDTO,
} from './';

/**
 * @export
 * @interface PagePatientDTO
 */
export interface PagePatientDTO {
    /**
     * @type {Array<PatientDTO>}
     * @memberof PagePatientDTO
     */
    data?: Array<PatientDTO>;
    /**
     * @type {PageInfoDTO}
     * @memberof PagePatientDTO
     */
    pageInfo?: PageInfoDTO;
}
