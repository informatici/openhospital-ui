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
    Color,
    Font,
    FontMetrics,
    Rectangle,
    Shape,
} from './';

/**
 * @export
 * @interface Graphics
 */
export interface Graphics {
    /**
     * @type {Shape}
     * @memberof Graphics
     */
    clip?: Shape;
    /**
     * @type {Rectangle}
     * @memberof Graphics
     */
    clipBounds?: Rectangle;
    /**
     * @type {Rectangle}
     * @memberof Graphics
     */
    clipRect?: Rectangle;
    /**
     * @type {Color}
     * @memberof Graphics
     */
    color?: Color;
    /**
     * @type {Font}
     * @memberof Graphics
     */
    font?: Font;
    /**
     * @type {FontMetrics}
     * @memberof Graphics
     */
    fontMetrics?: FontMetrics;
}
