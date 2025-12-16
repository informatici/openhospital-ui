import type { setupWorker } from 'msw/browser';
import { admissionsHandlers } from './admissions';
import { admissionTypes } from './admissionTypes';
import { ageTypes } from './ageTypes';
import { auth } from './auth';
import { bills } from './bills';
import { deliveryResultType } from './deliveryResultType';
import { deliveryTypes } from './deliveryTypes';
import { dischargeTypes } from './dischargeTypes';
import { diseases } from './diseases';
import { diseaseTypes } from './diseaseTypes';
import { examinations } from './examinations';
import { examRow } from './examRow';
import { exams } from './exams';
import { examTypes } from './examTypes';
import { hospital } from './hospital';
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
import { wardsHandlers } from './wards';

export const handlers: Parameters<typeof setupWorker> = [
	...admissionTypes,
	...admissionsHandlers,
	...ageTypes,
	...auth,
	...bills,
	...deliveryResultType,
	...deliveryTypes,
	...diseaseTypes,
	...dischargeTypes,
	...diseases,
	...examRow,
	...examinations,
	...examTypes,
	...exams,
	...hospital,
	...lab,
	...labExamRequest,
	...medicalTypes,
	...medicals,
	...opd,
	...operationTypes,
	...operations,
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
	...wardsHandlers,
];
