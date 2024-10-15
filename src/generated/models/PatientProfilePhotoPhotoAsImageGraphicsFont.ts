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

import {
    PatientProfilePhotoPhotoAsImageGraphicsFontTransform,
} from './';

/**
 * @export
 * @interface PatientProfilePhotoPhotoAsImageGraphicsFont
 */
export interface PatientProfilePhotoPhotoAsImageGraphicsFont {
    /**
     * @type {string}
     * @memberof PatientProfilePhotoPhotoAsImageGraphicsFont
     */
    name?: string;
    /**
     * @type {number}
     * @memberof PatientProfilePhotoPhotoAsImageGraphicsFont
     */
    style?: number;
    /**
     * @type {number}
     * @memberof PatientProfilePhotoPhotoAsImageGraphicsFont
     */
    size?: number;
    /**
     * @type {{ [key: string]: object; }}
     * @memberof PatientProfilePhotoPhotoAsImageGraphicsFont
     */
    attributes?: { [key: string]: object; };
    /**
     * @type {string}
     * @memberof PatientProfilePhotoPhotoAsImageGraphicsFont
     */
    family?: string;
    /**
     * @type {boolean}
     * @memberof PatientProfilePhotoPhotoAsImageGraphicsFont
     */
    plain?: boolean;
    /**
     * @type {string}
     * @memberof PatientProfilePhotoPhotoAsImageGraphicsFont
     */
    fontName?: string;
    /**
     * @type {PatientProfilePhotoPhotoAsImageGraphicsFontTransform}
     * @memberof PatientProfilePhotoPhotoAsImageGraphicsFont
     */
    transform?: PatientProfilePhotoPhotoAsImageGraphicsFontTransform;
    /**
     * @type {boolean}
     * @memberof PatientProfilePhotoPhotoAsImageGraphicsFont
     */
    bold?: boolean;
    /**
     * @type {boolean}
     * @memberof PatientProfilePhotoPhotoAsImageGraphicsFont
     */
    italic?: boolean;
    /**
     * @type {number}
     * @memberof PatientProfilePhotoPhotoAsImageGraphicsFont
     */
    numGlyphs?: number;
    /**
     * @type {number}
     * @memberof PatientProfilePhotoPhotoAsImageGraphicsFont
     */
    missingGlyphCode?: number;
    /**
     * @type {number}
     * @memberof PatientProfilePhotoPhotoAsImageGraphicsFont
     */
    italicAngle?: number;
    /**
     * @type {boolean}
     * @memberof PatientProfilePhotoPhotoAsImageGraphicsFont
     */
    transformed?: boolean;
    /**
     * @type {string}
     * @memberof PatientProfilePhotoPhotoAsImageGraphicsFont
     */
    psname?: string;
    /**
     * @type {number}
     * @memberof PatientProfilePhotoPhotoAsImageGraphicsFont
     */
    size2D?: number;
    /**
     * @type {Array<object>}
     * @memberof PatientProfilePhotoPhotoAsImageGraphicsFont
     */
    availableAttributes?: Array<object>;
}
