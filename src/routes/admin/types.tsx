import type { RouteObject } from 'react-router';
import TypesAdmin from '~/components/accessories/admin/types/TypesAdmin';

export const TYPES_ROUTES: RouteObject[] = [
	{
		path: '',
		lazy: async () =>
			import('../../components/accessories/admin/types').then((module) => ({
				Component: module.Empty,
			})),
	},
	{
		path: 'vaccines',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.VaccineTypes }),
			),
	},
	{
		path: 'vaccines/new',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.NewVaccineType }),
			),
	},
	{
		path: 'vaccines/:code/edit',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.EditVaccineType }),
			),
	},
	{
		path: 'exams',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.ExamTypes }),
			),
	},
	{
		path: 'exams/new',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.NewExamType }),
			),
	},
	{
		path: 'exams/:code/edit',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.EditExamType }),
			),
	},
	{
		path: 'admissions',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.AdmissionTypes }),
			),
	},
	{
		path: 'admissions/new',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.NewAdmissionType }),
			),
	},
	{
		path: 'admissions/:code/edit',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.EditAdmissionType }),
			),
	},
	{
		path: 'diseases',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.DiseaseTypes }),
			),
	},
	{
		path: 'diseases/new',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.NewDiseaseType }),
			),
	},
	{
		path: 'diseases/:code/edit',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.EditDiseaseType }),
			),
	},
	{
		path: 'operations',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.OperationTypes }),
			),
	},
	{
		path: 'operations/new',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.NewOperationType }),
			),
	},
	{
		path: 'operations/:code/edit',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.EditOperationType }),
			),
	},
	{
		path: 'discharges',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.DischargeTypes }),
			),
	},
	{
		path: 'discharges/new',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.NewDischargeType }),
			),
	},
	{
		path: 'discharges/:code/edit',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.EditDischargeType }),
			),
	},
	{
		path: 'deliveries',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.DeliveryTypes }),
			),
	},
	{
		path: 'deliveries/new',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.NewDeliveryType }),
			),
	},
	{
		path: 'deliveries/:code/edit',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.EditDeliveryType }),
			),
	},
	{
		path: 'medicals',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.MedicalTypes }),
			),
	},
	{
		path: 'medicals/new',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.NewMedicalType }),
			),
	},
	{
		path: 'medicals/:code/edit',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.EditMedicalType }),
			),
	},
	{
		path: 'pregnanttreatmenttypes',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.PregnantTreatmentType }),
			),
	},
	{
		path: 'pregnanttreatmenttypes/new',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.NewPregnantTreatmentType }),
			),
	},
	{
		path: 'pregnanttreatmenttypes/:code/edit',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.EditPregnantTreatmentType }),
			),
	},
	{
		path: 'deliveryresulttypes',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.DeliveryResultTypes }),
			),
	},
	{
		path: 'deliveryresulttypes/new',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.NewDeliveryResultType }),
			),
	},
	{
		path: 'deliveryresulttypes/:code/edit',
		lazy: async () =>
			import('../../components/accessories/admin/types/components').then(
				(module) => ({ Component: module.EditDeliveryResultType }),
			),
	},
	{
		path: 'ages',
		lazy: async () =>
			import(
				'../../components/accessories/admin/types/components/agetypes'
			).then((module) => ({ Component: module.AgeTypes })),
	},
	{
		path: 'ages/edit',
		lazy: async () =>
			import(
				'../../components/accessories/admin/types/components/agetypes'
			).then((module) => ({ Component: module.EditAgeTypes })),
	},
	{
		path: '*',
		lazy: async () =>
			import('../../components/activities/notFound/NotFound').then(
				(module) => ({ Component: module.NotFound }),
			),
	},
];

export { TypesAdmin };
