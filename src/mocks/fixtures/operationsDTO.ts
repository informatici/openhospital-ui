import { type OperationDTO, OperationDTOOpeForEnum } from '../../generated';

export const operationsDTO: OperationDTO[] = [
	{
		code: 'ABLSG1',
		description: 'Ablation',
		major: 1,
		opeFor: OperationDTOOpeForEnum.Admission,
		type: {
			code: 'SG',
			description: 'Surgery',
		},
		lock: 1,
	},
	{
		code: 'STRX',
		description: 'Stomach X-ray',
		major: 1,
		opeFor: OperationDTOOpeForEnum.Admission,
		type: {
			code: 'RX',
			description: 'Radiology',
		},
		lock: 1,
	},
	{
		code: 'LNGRX',
		description: 'Lung X-ray',
		major: 0,
		opeFor: OperationDTOOpeForEnum.OpdAdmission,
		type: {
			code: 'RX',
			description: 'Radiology',
		},
		lock: 1,
	},
	{
		code: 'DLSG',
		description: 'Delivery Surgery',
		major: 1,
		opeFor: OperationDTOOpeForEnum.OpdAdmission,
		type: {
			code: 'MT',
			description: 'Maternity',
		},
		lock: 1,
	},
];
