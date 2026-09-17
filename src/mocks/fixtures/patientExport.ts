import type { PatientExportDTO, PatientVaccineDTO } from '../../generated';
import { admissionDTO } from './admissionDTO';
import { billDTO } from './billDTO';
import billItemDTO from './billItemDTO';
import billPaymentsDTO from './billPaymentsDTO';
import { laboratoryDTO } from './laboratoryDTO';
import { opdDTO } from './opdDTO';
import { operationRowsDTO } from './operationRowsDTO';
import patientDTO from './patientDTO';
import { patientExaminationDTO } from './patientExaminationDTO';
import { therapyRowDTO } from './therapyRowDTO';
import { vaccineDTO } from './vaccineDTO';

const patientVaccineDTO: PatientVaccineDTO = {
	code: 1,
	progr: 1,
	vaccineDate: '2021-08-05T15:19:44.000Z',
	patient: patientDTO,
	vaccine: vaccineDTO[0],
};

export const patientExportDTO: PatientExportDTO = {
	patient: patientDTO,
	admissions: [admissionDTO],
	opds: [opdDTO],
	laboratories: laboratoryDTO,
	therapies: [therapyRowDTO],
	operations: operationRowsDTO,
	vaccines: [patientVaccineDTO],
	examinations: [patientExaminationDTO],
	bills: [billDTO],
	billItems: [billItemDTO],
	billPayments: [billPaymentsDTO],
};

export default patientExportDTO;
