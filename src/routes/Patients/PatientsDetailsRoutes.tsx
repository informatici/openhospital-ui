import type { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import NotFound from '~/components/activities/notFound/NotFound';
import PatientDetailsActivity from '~/components/activities/patientDetailsActivity/PatientDetailsActivity';
import DischargeDetailsActivityContent from '~/components/activities/patientDetailsActivityContent/DischargeDetailsActivityContent';
import { PatientAdmission } from '../../components/accessories/admission/PatientAdmission';
import { PatientExams } from '../../components/accessories/patientExams/PatientExams';
import { PatientOPD } from '../../components/accessories/patientOPD/patientOPD';
import { PatientOperation } from '../../components/accessories/patientOperation/PatientOperation';
import { PatientSummary } from '../../components/accessories/patientSummary/PatientSummary';
import { PatientTherapy } from '../../components/accessories/patientTherapy/PatientTherapy';
import { PatientTriage } from '../../components/accessories/patientTriage/PatientTriage';

export const PatientDetailsRoutes: FC = () => {
	return (
		<Routes>
			<Route element={<PatientDetailsActivity />}>
				<Route index element={<Navigate to="admissions" replace />} />
				<Route path="admissions" element={<PatientAdmission />} />
				<Route path="visits" element={<PatientOPD />} />
				<Route path="laboratory" element={<PatientExams />} />
				{false && <Route path="therapy" element={<PatientTherapy />} />}
				<Route path="triage" element={<PatientTriage />} />
				<Route path="discharge" element={<DischargeDetailsActivityContent />} />
				<Route path="clinic" element={<PatientSummary />} />
				<Route path="operation" element={<PatientOperation />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
