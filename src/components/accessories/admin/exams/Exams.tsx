import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { AdminActivityContent } from '~/components/activities/adminActivity';
import { useAppDispatch } from '~/libraries/hooks/redux';
import { PATHS } from '../../../../consts';
import type { ExamDTO } from '../../../../generated';
import { deleteExam } from '../../../../state/exams';
import Button from '../../button/Button';
import classes from './Exams.module.scss';
import ExamsTable from './examsTable';

export const Exams = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const handleDelete = (row: ExamDTO) => {
		dispatch(deleteExam(row.code ?? ''));
	};
	const handleEdit = (row: ExamDTO) => {
		navigate(PATHS.admin_exams_edit.replace(':id', `${row.code}`), {
			state: row,
		});
	};

	return (
		<AdminActivityContent title={t('nav.exams')}>
			<div className={classes.exams} data-cy="exams-table">
				<ExamsTable
					headerActions={
						<Button
							onClick={() => {
								navigate(PATHS.admin_exams_new);
							}}
							type="button"
							variant="contained"
							color="primary"
							dataCy="add-new-exam"
						>
							{t('exam.addExam')}
						</Button>
					}
					onDelete={handleDelete}
					onEdit={handleEdit}
				/>
			</div>
		</AdminActivityContent>
	);
};
