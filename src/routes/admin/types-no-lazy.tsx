import type { RouteObject } from 'react-router';
import TypesAdmin from '~/components/accessories/admin/types/TypesAdmin';
import { Empty } from '../../components/accessories/admin/types';
import {
	AdmissionTypes,
	DeliveryResultTypes,
	DeliveryTypes,
	DischargeTypes,
	DiseaseTypes,
	EditAdmissionType,
	EditDeliveryResultType,
	EditDeliveryType,
	EditDischargeType,
	EditDiseaseType,
	EditExamType,
	EditMedicalType,
	EditOperationType,
	EditPregnantTreatmentType,
	EditVaccineType,
	ExamTypes,
	MedicalTypes,
	NewAdmissionType,
	NewDeliveryResultType,
	NewDeliveryType,
	NewDischargeType,
	NewDiseaseType,
	NewExamType,
	NewMedicalType,
	NewOperationType,
	NewPregnantTreatmentType,
	NewVaccineType,
	OperationTypes,
	PregnantTreatmentType,
	VaccineTypes,
} from '../../components/accessories/admin/types/components';
import {
	AgeTypes,
	EditAgeTypes,
} from '../../components/accessories/admin/types/components/agetypes';
import NotFound from '../../components/activities/notFound/NotFound';
import { PATHS } from '../../consts';

const getPath = (from: string) => from.replace(`${PATHS.admin}/`, '');

export const TYPES_ROUTES_NO_LAZY: RouteObject[] = [
	{
		path: getPath(PATHS.admin_types),
		Component: TypesAdmin,
		children: [
			{
				path: '',
				Component: Empty,
			},
			{
				path: 'vaccines',
				Component: VaccineTypes,
			},
			{
				path: 'vaccines/new',
				Component: NewVaccineType,
			},
			{
				path: 'vaccines/:code/edit',
				Component: EditVaccineType,
			},
			{
				path: 'exams',
				Component: ExamTypes,
			},
			{
				path: 'exams/new',
				Component: NewExamType,
			},
			{
				path: 'exams/:code/edit',
				Component: EditExamType,
			},
			{
				path: 'admissions',
				Component: AdmissionTypes,
			},
			{
				path: 'admissions/new',
				Component: NewAdmissionType,
			},
			{
				path: 'admissions/:code/edit',
				Component: EditAdmissionType,
			},
			{
				path: 'diseases',
				Component: DiseaseTypes,
			},
			{
				path: 'diseases/new',
				Component: NewDiseaseType,
			},
			{
				path: 'diseases/:code/edit',
				Component: EditDiseaseType,
			},
			{
				path: 'operations',
				Component: OperationTypes,
			},
			{
				path: 'operations/new',
				Component: NewOperationType,
			},
			{
				path: 'operations/:code/edit',
				Component: EditOperationType,
			},
			{
				path: 'discharges',
				Component: DischargeTypes,
			},
			{
				path: 'discharges/new',
				Component: NewDischargeType,
			},
			{
				path: 'discharges/:code/edit',
				Component: EditDischargeType,
			},
			{
				path: 'deliveries',
				Component: DeliveryTypes,
			},
			{
				path: 'deliveries/new',
				Component: NewDeliveryType,
			},
			{
				path: 'deliveries/:code/edit',
				Component: EditDeliveryType,
			},
			{
				path: 'medicals',
				Component: MedicalTypes,
			},
			{
				path: 'medicals/new',
				Component: NewMedicalType,
			},
			{
				path: 'medicals/:code/edit',
				Component: EditMedicalType,
			},
			{
				path: 'pregnanttreatmenttypes',
				Component: PregnantTreatmentType,
			},
			{
				path: 'pregnanttreatmenttypes/new',
				Component: NewPregnantTreatmentType,
			},
			{
				path: 'pregnanttreatmenttypes/:code/edit',
				Component: EditPregnantTreatmentType,
			},
			{
				path: 'deliveryresulttypes',
				Component: DeliveryResultTypes,
			},
			{
				path: 'deliveryresulttypes/new',
				Component: NewDeliveryResultType,
			},
			{
				path: 'deliveryresulttypes/:code/edit',
				Component: EditDeliveryResultType,
			},
			{
				path: 'ages',
				Component: AgeTypes,
			},
			{
				path: 'ages/edit',
				Component: EditAgeTypes,
			},
			{
				path: '*',
				Component: NotFound,
			},
		],
	},
];
