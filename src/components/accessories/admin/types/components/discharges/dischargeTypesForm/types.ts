import type { DischargeTypeDTO } from '../../../../../../../generated';
import type { TFields } from '../../../../../../../libraries/formDataHandling/types';

export interface IDischargeTypeFormProps {
	fields: TFields<DischargeTypeFormFieldName>;
	onSubmit: (adm: DischargeTypeDTO) => void;
	creationMode: boolean;
	submitButtonLabel: string;
	resetButtonLabel: string;
	isLoading: boolean;
}

export type DischargeTypeFormFieldName = 'code' | 'description';
