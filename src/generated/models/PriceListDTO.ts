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
 * Class representing a price list
 * @export
 * @interface PriceListDTO
 */
export interface PriceListDTO {
    /**
     * @type {number}
     * @memberof PriceListDTO
     */
    id?: number;
    /**
     * The price list code
     * @type {string}
     * @memberof PriceListDTO
     */
    code?: string;
    /**
     * The name of the price list
     * @type {string}
     * @memberof PriceListDTO
     */
    name?: string;
    /**
     * The price list description
     * @type {string}
     * @memberof PriceListDTO
     */
    description?: string;
    /**
     * The currency
     * @type {string}
     * @memberof PriceListDTO
     */
    currency?: string;
    /**
     * @type {number}
     * @memberof PriceListDTO
     */
    readonly hashCode?: number;
}
