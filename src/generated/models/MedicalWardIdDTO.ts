// tslint:disable
/**
 * Open Hospital API Documentation
 * Open Hospital API Documentation
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {
    MedicalDTO,
    WardDTO,
} from './';

/**
 * The medical ward\'s id
 * @export
 * @interface MedicalWardIdDTO
 */
export interface MedicalWardIdDTO {
    /**
     * @type {WardDTO}
     * @memberof MedicalWardIdDTO
     */
    ward: WardDTO;
    /**
     * @type {MedicalDTO}
     * @memberof MedicalWardIdDTO
     */
    medical: MedicalDTO;
}
