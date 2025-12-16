import type { DischargeTypeDTO } from '~/generated';

export const dischargeTypesDTO: DischargeTypeDTO[] = [
	{
		code: 'N',
		description: 'NORMALE',
	},
	{
		code: 'T',
		description: 'TRANSFERT',
	},
	{
		code: 'F',
		description: 'FUGUE',
	},
];
