import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation, useParams } from 'react-router';
import { AdminActivityContent } from '~/components/activities/adminActivity';
import { useAppDispatch, useAppSelector } from '~/libraries/hooks/redux';
import { PATHS } from '../../../../../consts';
import type { ExamDTO } from '../../../../../generated';
import { getExamRows, updateExam } from '../../../../../state/exams';
import { getInitialFields } from '../examForm/consts';
import ExamForm from '../examForm/ExamForm';

export const EditExam = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { state }: { state: ExamDTO | undefined } = useLocation();
	const { id } = useParams();
	const update = useAppSelector((state) => state.exams.examUpdate);

	const examRows: string[] | undefined = useAppSelector((state) =>
		state.exams.examRowsByExamCode.data?.map((row) => row.description ?? ''),
	);

	useEffect(() => {
		if (id) {
			dispatch(getExamRows(id));
		}
	}, [dispatch, id]);

	const handleSubmit = ({
		rows,
		...examDTO
	}: ExamDTO & { rows: string[] | undefined }) => {
		dispatch(
			updateExam({
				code: examDTO.code ?? '',
				examWithRowsDTO: { exam: examDTO, rows },
			}),
		);
	};

	if (state?.code !== id) {
		return <Navigate to={PATHS.admin_exams} />;
	}

	return (
		<AdminActivityContent title={t('exam.editExam')}>
			<ExamForm
				creationMode={false}
				onSubmit={handleSubmit}
				isLoading={!!update.isLoading}
				resetButtonLabel={t('common.reset')}
				submitButtonLabel={t('exam.updateExam')}
				fields={getInitialFields(state, examRows)}
			/>
		</AdminActivityContent>
	);
};
