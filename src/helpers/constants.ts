export const BASE_PATH = `${process.env.BASE_PATH}`;
export const ENV_NAME = `${process.env.ENV_NAME}`;

export const PATH_PATIENTS_DATABASE = "/patients-database"
export const PATH_NEW_PATIENT = "/patients-database/new-patient";
export const PATH_PATIENT_DETAILS = "/patients-database/:patientId";
export const PATH_PATIENT_VISIT = "/patients-database/:patientId/visit";
export const PATH_PATIENT_ADMISSION = "/patients-database/:patientId/admission";
export const PATH_NEW_LAB_TEST = "/patients-database/:patientId/new-lab-test";
export const PATH_PATIENT_THERAPY = "/patients-database/:patientId/therapy";
export const PATH_PATIENT_EXAMINATION = "/patients-database/:patientId/examination";
export const PATH_PATIENT_VACCINATION = "/patients-database/:patientId/vaccination";
export const PATH_PATIENT_NEW_VACCINATION = "/patients-database/:patientId/vaccination/new-vaccination";
export const PATH_OPD = "/patients-database/:patientId/opd";
export const PATH_NEW_OPD = "/patients-database/:patientId/opd/new-opd";