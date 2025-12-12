import type { AdmissionDTO } from '../../../../generated';
import type {
	IForm,
	TFields,
} from '../../../../libraries/formDataHandling/types';

export type TProps = IForm<TCurrentAdmissionFieldName, any>;

export type TCurrentAdmissionFieldName =
	| 'ward'
	| 'transUnit'
	| 'admDate'
	| 'admType'
	| 'diseaseIn'
	| 'fhu'
	| 'note';

export type TActivityTransitionState = 'IDLE' | 'TO_RESET' | 'FAIL';

export interface IOwnProps {
	onDiscard: () => void;
	fields: TFields<TCurrentAdmissionFieldName>;
	onSubmit: (adm: AdmissionDTO) => void;
}
