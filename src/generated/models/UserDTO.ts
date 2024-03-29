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
    UserGroupDTO,
} from './';

/**
 * @export
 * @interface UserDTO
 */
export interface UserDTO {
    /**
     * The username (must be unique)
     * @type {string}
     * @memberof UserDTO
     */
    userName: string;
    /**
     * @type {UserGroupDTO}
     * @memberof UserDTO
     */
    userGroupName: UserGroupDTO;
    /**
     * The user\'s password
     * @type {string}
     * @memberof UserDTO
     */
    passwd: string;
    /**
     * The user\'s description
     * @type {string}
     * @memberof UserDTO
     */
    desc?: string;
}
