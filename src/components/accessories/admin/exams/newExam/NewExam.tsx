import { useTranslation } from 'react-i18next';
import { AdminActivityContent } from '~/components/activities/adminActivity';
import { useAppDispatch, useAppSelector } from '~/libraries/hooks/redux';
import type { ExamDTO } from '../../../../../generated';
import { createExam } from '../../../../../state/exams';
import { ExamForm, getInitialFields } from '../examForm';

export const NewExam = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const create = useAppSelector((state) => state.exams.examCreate);

	const handleSubmit = ({
		rows,
		...examDTO
	}: ExamDTO & { rows: string[] | undefined }) => {
		dispatch(createExam({ examWithRowsDTO: { exam: examDTO, rows } }));
	};

	return (
		<AdminActivityContent title={t('exam.addExam')}>
			<ExamForm
				creationMode
				onSubmit={handleSubmit}
				isLoading={!!create.isLoading}
				resetButtonLabel={t('common.reset')}
				submitButtonLabel={t('supplier.saveSupplier')}
				fields={getInitialFields(undefined, undefined)}
			/>
		</AdminActivityContent>
	);
};
