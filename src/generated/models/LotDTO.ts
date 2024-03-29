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

/**
 * The lot
 * @export
 * @interface LotDTO
 */
export interface LotDTO {
    /**
     * The lot\'s code
     * @type {string}
     * @memberof LotDTO
     */
    code: string;
    /**
     * The preparation date
     * @type {string}
     * @memberof LotDTO
     */
    preparationDate: string;
    /**
     * The due date
     * @type {string}
     * @memberof LotDTO
     */
    dueDate: string;
    /**
     * The lot\'s code
     * @type {number}
     * @memberof LotDTO
     */
    cost?: number;
}
