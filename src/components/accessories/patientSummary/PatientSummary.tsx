import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PatientDetailsActivityContent } from '~/components/activities/patientDetailsActivityContent/PatientDetailsActivityContent';
import { useAppDispatch } from '~/libraries/hooks/redux';
import { getMedicals } from '../../../state/medicals';
import { PatientExtraData } from '../patientExtraData/patientExtraData';
import Tabs from '../tabs/Tabs';
import type { TTabConfig } from '../tabs/types';
import PatientSummaryByDate from './patientSummaryByDate/PatientSummaryByDate';
import PatientSummaryByType from './patientSummaryByType/PatientSummaryByType';
import './styles.scss';

export const PatientSummary = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	useEffect(() => {
		dispatch(getMedicals());
	}, [dispatch]);

	const patientSummaryTabs: TTabConfig = [
		{ label: t('common.orderbydate'), content: <PatientSummaryByDate /> },
		{ label: t('common.orderbytype'), content: <PatientSummaryByType /> },
	];

	return (
		<PatientDetailsActivityContent title={t('patient.summary')}>
			<div className="patientSummary">
				<PatientExtraData readOnly={true} />
				<Tabs config={patientSummaryTabs} />
			</div>
		</PatientDetailsActivityContent>
	);
};
