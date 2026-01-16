import type { ExamTypeDTO } from '../../../../../../../generated';
import type { TFields } from '../../../../../../../libraries/formDataHandling/types';
import type { ExamTypeFormFieldName } from '.';

export const getInitialFields: (
	examType: ExamTypeDTO | undefined,
) => TFields<ExamTypeFormFieldName> = (examType) => ({
	code: { type: 'text', value: examType?.code ?? '' },
	description: { type: 'text', value: examType?.description ?? '' },
});
