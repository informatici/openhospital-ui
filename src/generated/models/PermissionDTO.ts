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
 * @export
 * @interface PermissionDTO
 */
export interface PermissionDTO {
    /**
     * @type {string}
     * @memberof PermissionDTO
     */
    name?: string;
    /**
     * The permission id
     * @type {number}
     * @memberof PermissionDTO
     */
    id: number;
    /**
     * The permission description
     * @type {string}
     * @memberof PermissionDTO
     */
    description: string;
    /**
     * The user group id
     * @type {Array<string>}
     * @memberof PermissionDTO
     */
    userGroupIds: Array<string>;
}
