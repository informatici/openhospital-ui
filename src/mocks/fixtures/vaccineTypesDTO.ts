import type { VaccineTypeDTO } from '../../generated/models';

const vaccineTypesDTO: VaccineTypeDTO[] = [
	{ code: 'C', description: 'Child' },
	{ code: 'P', description: 'Pregnant' },
	{ code: 'N', description: 'No pregnant' },
];

export default vaccineTypesDTO;
