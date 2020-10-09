// tslint:disable
/**
 * Api Documentation
 * Api Documentation
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
 * @interface PatientExaminationDTO
 */
export interface PatientExaminationDTO {
    /**
     * Patient Examination Id
     * @type {number}
     * @memberof PatientExaminationDTO
     */
    pex_ID?: number;
    /**
     * Date of Patient Examination
     * @type {string}
     * @memberof PatientExaminationDTO
     */
    pex_date?: string;
    /**
     * Patient Examination Code
     * @type {number}
     * @memberof PatientExaminationDTO
     */
    patientCode?: number;
    /**
     * Patient Height in cm
     * @type {number}
     * @memberof PatientExaminationDTO
     */
    pex_height?: number;
    /**
     * Patient Weight in Kg
     * @type {number}
     * @memberof PatientExaminationDTO
     */
    pex_weight?: number;
    /**
     * Blood Pressure MIN in mmHg
     * @type {number}
     * @memberof PatientExaminationDTO
     */
    pex_pa_min?: number;
    /**
     * Blood Pressure MAX in mmHg
     * @type {number}
     * @memberof PatientExaminationDTO
     */
    pex_pa_max?: number;
    /**
     * Heart Rate in APm
     * @type {number}
     * @memberof PatientExaminationDTO
     */
    pex_fc?: number;
    /**
     * Patient Temperature in °C
     * @type {number}
     * @memberof PatientExaminationDTO
     */
    pex_temp?: number;
    /**
     * Patient Saturation in %
     * @type {number}
     * @memberof PatientExaminationDTO
     */
    pex_sat?: number;
    /**
     * Examination Note
     * @type {string}
     * @memberof PatientExaminationDTO
     */
    pex_note?: string;
}
