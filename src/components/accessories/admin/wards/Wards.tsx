import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { AdminActivityContent } from '~/components/activities/adminActivity';
import { useAppDispatch } from '~/libraries/hooks/redux';
import { PATHS } from '../../../../consts';
import type { WardDTO } from '../../../../generated';
import { deleteWard, deleteWardReset, getWards } from '../../../../state/wards';
import Button from '../../button/Button';
import classes from './Wards.module.scss';
import WardTable from './wardTable';

export const Wards = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	useEffect(() => {
		dispatch(getWards());

		return () => {
			dispatch(deleteWardReset());
		};
	}, [dispatch]);

	const handleEdit = (row: WardDTO) => {
		navigate(PATHS.admin_wards_edit.replace(':id', row.code ?? ''), {
			state: row,
		});
	};

	const handleDelete = (row: WardDTO) => {
		dispatch(deleteWard(row.code ?? ''));
	};

	return (
		<AdminActivityContent title={t('nav.wards')}>
			<div className={classes.wards} data-cy="wards-table">
				<WardTable
					onEdit={handleEdit}
					onDelete={handleDelete}
					headerActions={
						<Button
							onClick={() => {
								navigate(PATHS.admin_wards_new);
							}}
							type="button"
							variant="contained"
							color="primary"
							dataCy="add-new-ward"
						>
							{t('ward.addWard')}
						</Button>
					}
				/>
			</div>
		</AdminActivityContent>
	);
};
