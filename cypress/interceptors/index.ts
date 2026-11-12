import { admissions } from './admissions';
import { admissionTypes } from './admissionTypes';
import { ageTypes } from './ageTypes';
import { auth } from './auth';
import { bill } from './bill';
import { deliveryResultType } from './deliveryResultType';
import { deliveryTypes } from './deliveryTypes';
import { dischargeTypes } from './dischargeTypes';
import { diseases } from './diseases';
import { diseaseTypes } from './diseaseTypes';
import { examinations } from './examinations';
import { examRows } from './examRows';
import { exams } from './exams';
import { examTypes } from './examTypes';
import { hospitals } from './hospitals';
import { lab } from './lab';
import { labExamRequest } from './labExamRequest';
import { medicals } from './medicals';
import { medicalTypes } from './medicalTypes';
import { opd } from './opd';
import { operations } from './operations';
import { operationTypes } from './operationTypes';
import { patients } from './patients';
import { permission } from './permission';
import { pregnantTreatmentType } from './pregnantTreatmentType';
import { prices } from './prices';
import { settings } from './settings';
import { suppliers } from './suppliers';
import { therapies } from './therapies';
import { userGroups } from './userGroups';
import { users } from './users';
import { vaccine } from './vaccine';
import { vaccineTypes } from './vaccineTypes';
import { visits } from './visits';
import { wards } from './wards';

export * from './admissions';
export * from './admissionTypes';
export * from './ageTypes';
export * from './auth';
export * from './bill';
export * from './deliveryResultType';
export * from './deliveryTypes';
export * from './dischargeTypes';
export * from './diseases';
export * from './diseaseTypes';
export * from './examinations';
export * from './examRows';
export * from './exams';
export * from './examTypes';
export * from './hospitals';
export * from './lab';
export * from './labExamRequest';
export * from './medicals';
export * from './medicalTypes';
export * from './opd';
export * from './operations';
export * from './operationTypes';
export * from './patients';
export * from './permission';
export * from './pregnantTreatmentType';
export * from './prices';
export * from './settings';
export * from './suppliers';
export * from './therapies';
export * from './userGroups';
export * from './users';
export * from './vaccine';
export * from './vaccineTypes';
export * from './visits';
export * from './wards';

export const interceptors = [
	...admissions,
	...admissionTypes,
	...ageTypes,
	...auth,
	...bill,
	...deliveryResultType,
	...deliveryTypes,
	...dischargeTypes,
	...diseases,
	...diseaseTypes,
	...examinations,
	...exams,
	...examRows,
	...examTypes,
	...hospitals,
	// lab before labExamRequest: setupInterceptors() keeps the last matching
	// registration, so labExamRequest's POST /laboratories/examRequest handler
	// is the one that actually wins.
	...lab,
	...labExamRequest,
	...medicals,
	...medicalTypes,
	...opd,
	...operations,
	...operationTypes,
	...patients,
	...permission,
	...pregnantTreatmentType,
	...prices,
	...settings,
	...suppliers,
	...therapies,
	...userGroups,
	...users,
	...vaccine,
	...vaccineTypes,
	...visits,
	...wards,
];
