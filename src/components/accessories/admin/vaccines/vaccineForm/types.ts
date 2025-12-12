import type { VaccineDTO } from '../../../../../generated';
import type { TFields } from '../../../../../libraries/formDataHandling/types';

export interface IVaccineFormProps {
	fields: TFields<VaccineFormFieldName>;
	onSubmit: (adm: VaccineDTO) => void;
	creationMode: boolean;
	submitButtonLabel: string;
	resetButtonLabel: string;
	isLoading: boolean;
}

export type VaccineFormFieldName = 'code' | 'description' | 'vaccineType';
