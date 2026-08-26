import type { ExamDTO } from '../../../../../generated';
import type { TFields } from '../../../../../libraries/formDataHandling/types';
import type { ExamFormFieldName } from '../types';

export interface IExamProps {
	fields: TFields<ExamFormFieldName>;
	onSubmit: (values: ExamDTO & { rows: string[] | undefined }) => void;
	creationMode: boolean;
	submitButtonLabel: string;
	resetButtonLabel: string;
	isLoading: boolean;
}
