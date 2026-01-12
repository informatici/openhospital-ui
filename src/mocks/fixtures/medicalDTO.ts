import type { MedicalDTO } from '../../generated';

export const medicalDTO: MedicalDTO = {
	code: 12,
	prod_code: 'PARA',
	type: {
		code: 'M',
		description: 'Medical material',
	},
	description: 'Paracétamol',
	initialqty: 21,
	pcsperpck: 100,
	inqty: 340,
	outqty: 8,
	minqty: 15,
};
