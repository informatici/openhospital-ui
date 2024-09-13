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

/**
 * @export
 * @interface SmsDTO
 */
export interface SmsDTO {
    /**
     * SMS Id
     * @type {number}
     * @memberof SmsDTO
     */
    smsId?: number;
    /**
     * SMS Date
     * @type {string}
     * @memberof SmsDTO
     */
    smsDate: string;
    /**
     * SMS scheduled date
     * @type {string}
     * @memberof SmsDTO
     */
    smsDateSched: string;
    /**
     * SMS target phone number
     * @type {string}
     * @memberof SmsDTO
     */
    smsNumber: string;
    /**
     * SMS content text
     * @type {string}
     * @memberof SmsDTO
     */
    smsText: string;
    /**
     * SMS sent date
     * @type {string}
     * @memberof SmsDTO
     */
    smsDateSent?: string;
    /**
     * SMS user
     * @type {string}
     * @memberof SmsDTO
     */
    smsUser: string;
    /**
     * SMS module name
     * @type {string}
     * @memberof SmsDTO
     */
    module: string;
    /**
     * SMS module Id
     * @type {string}
     * @memberof SmsDTO
     */
    moduleID?: string;
}
