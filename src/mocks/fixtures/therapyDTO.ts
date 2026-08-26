import type { TherapyDTO } from '../../generated/models';
import { medicalDTO } from './medicalDTO';
import patientDTO from './patientDTO';

const therapyDTO: TherapyDTO = {
	therapyID: Math.floor(Math.random() * 100 + 1),
	patID: patientDTO.code,
	dates: ['2021-07-30T14:58:00.000Z', '2021-08-15T15:19:44.000Z'],
	medical: medicalDTO,
	qty: 48,
	units: '1',
	freqInDay: 2,
	note: 'Sample note',
	notify: false,
	sms: false,
};

export default therapyDTO;
