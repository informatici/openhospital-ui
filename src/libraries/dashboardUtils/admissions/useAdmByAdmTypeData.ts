import { useTranslation } from 'react-i18next';
import { useAppSelector } from '~/libraries/hooks/redux';
import { colorGen } from '../../uiUtils/colorGenerator';

const EMPTY_DATA: never[] = [];

export const useAdmByAdmTypeData = () => {
	const { t } = useTranslation();
	const admissions = useAppSelector(
		(state) => state.admissions.getAdmissions.data?.data ?? EMPTY_DATA,
	);
	const admissionTypes = useAppSelector(
		(state) => state.types.admissions.getAll.data ?? EMPTY_DATA,
	);
	const admissionTypeStatus = useAppSelector(
		(state) => state.types.admissions.getAll.status ?? 'IDLE',
	);
	const status = useAppSelector(
		(state) => state.admissions.getAdmissions.status ?? 'IDLE',
	);
	const success = useAppSelector((state) =>
		['SUCCESS', 'SUCCESS_EMPTY'].includes(
			state.admissions.getAdmissions.status ?? '',
		),
	);

	const labels = admissionTypes.map((e) => e.description ?? '');
	const data = {
		labels: labels,
		datasets: [
			{
				data: admissionTypes.map(
					(e) =>
						admissions.filter((adm) => adm.admType?.code === e.code).length,
				),
				backgroundColor: colorGen(admissionTypes.length),
			},
		],
	};

	const csvData = [
		...admissionTypes.map((e) => ({
			[t('admission.admtype')]: e.description ?? '',
			[t('common.male')]: admissions.filter(
				(adm) => adm.admType?.code === e.code && adm.patient?.sex === 'M',
			).length,
			[t('common.female')]: admissions.filter(
				(adm) => adm.admType?.code === e.code && adm.patient?.sex === 'F',
			).length,
		})),
	];

	return {
		status,
		admissionTypeStatus,
		data,
		csvData,
		success,
		total: admissions.length,
	};
};
