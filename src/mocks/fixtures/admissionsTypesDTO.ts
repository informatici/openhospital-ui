import type { AdmissionTypeDTO } from '../../generated/models';

export const admissionTypesDTO: AdmissionTypeDTO[] = [
	{
		code: 'A',
		description: 'AMBULANCE',
	},
	{
		code: 'R',
		description: 'REFERRAL',
	},
	{
		code: 'I',
		description: 'SELF',
	},
];
