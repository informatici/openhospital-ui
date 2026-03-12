import type { LaboratoryDTO } from '../../generated';

export const laboratoryForPrintDTO: LaboratoryDTO[] = [
	{
		code: 222,
		patientCode: 200,
		exam: {
			description: '1.1 HB',
		},
		labDate: '2021-08-05T15:19:44.000Z',
		result: 'POSITIVE',
		patName: 'Abernitho Zakaria',
	},
	{
		code: 224,
		patientCode: 200,
		exam: {
			description: '1.1 HB',
		},
		labDate: '2021-08-04T15:19:44.000Z',
		result: 'NEGATIVE',
		patName: 'Abernitho Zakaria',
	},
	{
		code: 225,
		patientCode: 200,
		exam: {
			description: '5.5 ZN',
		},
		labDate: '2021-08-05T15:19:44.000Z',
		result: 'POSITIVE',
		patName: 'Abernitho Zakaria',
	},
];
