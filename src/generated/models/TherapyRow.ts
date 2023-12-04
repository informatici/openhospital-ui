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
    Patient,
} from './';

/**
 * @export
 * @interface TherapyRow
 */
export interface TherapyRow {
    /**
     * @type {string}
     * @memberof TherapyRow
     */
    createdBy?: string;
    /**
     * @type {string}
     * @memberof TherapyRow
     */
    createdDate?: string;
    /**
     * @type {string}
     * @memberof TherapyRow
     */
    lastModifiedBy?: string;
    /**
     * @type {string}
     * @memberof TherapyRow
     */
    lastModifiedDate?: string;
    /**
     * @type {number}
     * @memberof TherapyRow
     */
    active?: number;
    /**
     * @type {number}
     * @memberof TherapyRow
     */
    therapyID?: number;
    /**
     * @type {Patient}
     * @memberof TherapyRow
     */
    patient: Patient;
    /**
     * @type {string}
     * @memberof TherapyRow
     */
    startDate: string;
    /**
     * @type {string}
     * @memberof TherapyRow
     */
    endDate: string;
    /**
     * @type {number}
     * @memberof TherapyRow
     */
    medicalId: number;
    /**
     * @type {number}
     * @memberof TherapyRow
     */
    qty: number;
    /**
     * @type {number}
     * @memberof TherapyRow
     */
    unitID: number;
    /**
     * @type {number}
     * @memberof TherapyRow
     */
    freqInDay: number;
    /**
     * @type {number}
     * @memberof TherapyRow
     */
    freqInPeriod: number;
    /**
     * @type {string}
     * @memberof TherapyRow
     */
    note?: string;
    /**
     * @type {number}
     * @memberof TherapyRow
     */
    notifyInt: number;
    /**
     * @type {number}
     * @memberof TherapyRow
     */
    smsInt: number;
    /**
     * @type {number}
     * @memberof TherapyRow
     */
    medical?: number;
    /**
     * @type {boolean}
     * @memberof TherapyRow
     */
    notify?: boolean;
    /**
     * @type {boolean}
     * @memberof TherapyRow
     */
    sms?: boolean;
}
