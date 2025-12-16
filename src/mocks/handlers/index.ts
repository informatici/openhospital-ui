import type { setupWorker } from 'msw/browser';
import { admissionsHandlers } from './admissions';
import { admissionTypes } from './admissionTypes';
import { ageTypes } from './ageTypes';
import { auth } from './auth';
import { bills } from './bills';
import { deliveryResultTypes } from './deliveryResultTypes';
import { deliveryTypes } from './deliveryTypes';
import { dischargeTypes } from './dischargeTypes';
import { diseases } from './diseases';
import { diseaseTypes } from './diseaseTypes';
import { examinations } from './examinations';
import { examRows } from './examRows';
import { exams } from './exams';
import { examTypes } from './examTypes';
import { hospitals } from './hospitals';
import { labExamRequest } from './labExamRequest';
import { laboratories } from './labs';
import { medicals } from './medicals';
import { medicalTypes } from './medicalTypes';
import { opds } from './opds';
import { operations } from './operations';
import { operationTypes } from './operationTypes';
import { patients } from './patients';
import { permissions } from './permissions';
import { pregnantTreatmentTypes } from './pregnantTreatmentTypes';
import { prices } from './prices';
import { settings } from './settings';
import { suppliers } from './suppliers';
import { therapies } from './therapies';
import { userGroups } from './userGroups';
import { users } from './users';
import { vaccines } from './vaccines';
import { vaccineTypes } from './vaccineTypes';
import { visits } from './visits';
import { wardsHandlers } from './wards';

export const handlers: Parameters<typeof setupWorker> = [
	...admissionTypes,
	...admissionsHandlers,
	...ageTypes,
	...auth,
	...bills,
	...deliveryResultTypes,
	...deliveryTypes,
	...diseaseTypes,
	...dischargeTypes,
	...diseases,
	...examRows,
	...examinations,
	...examTypes,
	...exams,
	...hospitals,
	...laboratories,
	...labExamRequest,
	...medicalTypes,
	...medicals,
	...opds,
	...operationTypes,
	...operations,
	...patients,
	...permissions,
	...pregnantTreatmentTypes,
	...prices,
	...settings,
	...suppliers,
	...therapies,
	...userGroups,
	...users,
	...vaccines,
	...vaccineTypes,
	...visits,
	...wardsHandlers,
];
