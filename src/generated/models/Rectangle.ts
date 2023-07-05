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
    Dimension,
    Point,
    Rectangle2D,
} from './';

/**
 * @export
 * @interface Rectangle
 */
export interface Rectangle {
    /**
     * @type {Rectangle2D}
     * @memberof Rectangle
     */
    bounds2D?: Rectangle2D;
    /**
     * @type {number}
     * @memberof Rectangle
     */
    centerX?: number;
    /**
     * @type {number}
     * @memberof Rectangle
     */
    centerY?: number;
    /**
     * @type {boolean}
     * @memberof Rectangle
     */
    empty?: boolean;
    /**
     * @type {number}
     * @memberof Rectangle
     */
    height?: number;
    /**
     * @type {Point}
     * @memberof Rectangle
     */
    location?: Point;
    /**
     * @type {number}
     * @memberof Rectangle
     */
    maxX?: number;
    /**
     * @type {number}
     * @memberof Rectangle
     */
    maxY?: number;
    /**
     * @type {number}
     * @memberof Rectangle
     */
    minX?: number;
    /**
     * @type {number}
     * @memberof Rectangle
     */
    minY?: number;
    /**
     * @type {Dimension}
     * @memberof Rectangle
     */
    size?: Dimension;
    /**
     * @type {number}
     * @memberof Rectangle
     */
    width?: number;
    /**
     * @type {number}
     * @memberof Rectangle
     */
    x?: number;
    /**
     * @type {number}
     * @memberof Rectangle
     */
    y?: number;
}
