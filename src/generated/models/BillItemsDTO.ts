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
 * Class representing a billItem
 * @export
 * @interface BillItemsDTO
 */
export interface BillItemsDTO {
    /**
     * @type {number}
     * @memberof BillItemsDTO
     */
    hashCode?: number;
    /**
     * @type {number}
     * @memberof BillItemsDTO
     */
    id?: number;
    /**
     * @type {boolean}
     * @memberof BillItemsDTO
     */
    price?: boolean;
    /**
     * Bill id
     * @type {number}
     * @memberof BillItemsDTO
     */
    billId?: number;
    /**
     * The price Id
     * @type {string}
     * @memberof BillItemsDTO
     */
    priceId?: string;
    /**
     * item description
     * @type {string}
     * @memberof BillItemsDTO
     */
    itemDescription?: string;
    /**
     * item amount
     * @type {number}
     * @memberof BillItemsDTO
     */
    itemAmount?: number;
    /**
     * item quantity
     * @type {number}
     * @memberof BillItemsDTO
     */
    itemQuantity?: number;
    /**
     * item display code
     * @type {string}
     * @memberof BillItemsDTO
     */
    itemDisplayCode?: string;
    /**
     * item id
     * @type {string}
     * @memberof BillItemsDTO
     */
    itemId?: string;
}
