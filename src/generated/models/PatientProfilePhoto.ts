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
    Image,
    Patient,
} from './';

/**
 * @export
 * @interface PatientProfilePhoto
 */
export interface PatientProfilePhoto {
    /**
     * @type {Patient}
     * @memberof PatientProfilePhoto
     */
    patient?: Patient;
    /**
     * @type {string}
     * @memberof PatientProfilePhoto
     */
    photo?: string;
    /**
     * @type {Image}
     * @memberof PatientProfilePhoto
     */
    photoAsImage?: Image;
}
