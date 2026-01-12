import type { TherapyRowDTO } from '../../generated/models';
import patientDTO from './patientDTO';

export const therapyRowDTO: TherapyRowDTO = {
	therapyID: 0,
	patID: patientDTO,
	startDate: 'string',
	endDate: 'string',
	medicalId: 0,
	qty: 0,
	unitID: 0,
	freqInDay: 0,
	freqInPeriod: 0,
	note: 'string',
	notifyInt: 0,
	smsInt: 0,
};
