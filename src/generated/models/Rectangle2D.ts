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
    Rectangle,
} from './';

/**
 * @export
 * @interface Rectangle2D
 */
export interface Rectangle2D {
    /**
     * @type {Rectangle}
     * @memberof Rectangle2D
     */
    bounds?: Rectangle;
    /**
     * @type {Rectangle2D}
     * @memberof Rectangle2D
     */
    bounds2D?: Rectangle2D;
    /**
     * @type {number}
     * @memberof Rectangle2D
     */
    centerX?: number;
    /**
     * @type {number}
     * @memberof Rectangle2D
     */
    centerY?: number;
    /**
     * @type {boolean}
     * @memberof Rectangle2D
     */
    empty?: boolean;
    /**
     * @type {number}
     * @memberof Rectangle2D
     */
    height?: number;
    /**
     * @type {number}
     * @memberof Rectangle2D
     */
    maxX?: number;
    /**
     * @type {number}
     * @memberof Rectangle2D
     */
    maxY?: number;
    /**
     * @type {number}
     * @memberof Rectangle2D
     */
    minX?: number;
    /**
     * @type {number}
     * @memberof Rectangle2D
     */
    minY?: number;
    /**
     * @type {number}
     * @memberof Rectangle2D
     */
    width?: number;
    /**
     * @type {number}
     * @memberof Rectangle2D
     */
    x?: number;
    /**
     * @type {number}
     * @memberof Rectangle2D
     */
    y?: number;
}
