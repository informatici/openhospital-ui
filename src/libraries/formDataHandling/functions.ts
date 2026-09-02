import { produce } from 'immer';
import { isEmpty } from 'lodash';
import moment from 'moment';
import type {
	TAgeFieldName,
	TAgeType,
} from '../../components/accessories/patientDataForm/types';
import type { IFormCustomizationProps } from '../../customization/formCustomization/type';
import type {
	AdmissionDTO,
	AgeTypeDTO,
	DiseaseDTO,
	ExamDTO,
	LaboratoryDTO,
	OpdDTO,
	OperationDTO,
	OperationRowDTO,
	PatientDTO,
	PatientExaminationDTO,
	TherapyRowDTO,
	VisitDTO,
	WardDTO,
} from '../../generated';
import type { TFieldAddress, TFieldFormattedValue, TFields } from './types';

export const getFromFields = (
	fields: TFields,
	fieldAddress: TFieldAddress,
): Record<string, any> => {
	return Object.keys(fields).reduce((acc: Record<string, any>, key) => {
		if (fields[key].type === 'number' && fields[key][fieldAddress] === null) {
			acc[key] = '';
			return acc;
		}
		if (fieldAddress === 'value') {
			acc[key] = fields[key].isArray
				? JSON.parse(fields[key][fieldAddress])
				: fields[key][fieldAddress];
		} else {
			acc[key] = fields[key][fieldAddress];
		}
		return acc;
	}, {});
};

export const parseDate = (raw: string, withTimezone: boolean = true) => {
	if (raw) {
		const date = Number.isNaN(+raw) ? new Date(raw) : new Date(+raw);
		if (withTimezone) {
			const timezonedDate = new Date(
				date.getTime() - date.getTimezoneOffset() * 60000,
			);
			timezonedDate.setUTCHours(0);
			return timezonedDate.toISOString();
		}
		date.setUTCHours(0);
		return date.toISOString();
	} else {
		return '';
	}
};

export const fixFilterDateFrom = (date: string | Date): string => {
	if (typeof date === 'string') {
		date = new Date(date);
	}

	date.setUTCHours(0);
	date.setUTCMinutes(0);
	date.setUTCSeconds(0);

	return date.toISOString();
};

export const removeTime = (date: string | Date | null | undefined): string => {
	if (date == null) return '';

	if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

	const parsedDate = date instanceof Date ? date : new Date(date);
	if (Number.isNaN(parsedDate.getTime())) return parsedDate.toString();

	const year = parsedDate.getFullYear();
	const month = `${parsedDate.getMonth() + 1}`.padStart(2, '0');
	const day = `${parsedDate.getDate()}`.padStart(2, '0');
	return `${year}-${month}-${day}`;
};

export const fixFilterDateTo = (date: string | Date): string => {
	if (typeof date === 'string') {
		date = new Date(date);
	}

	date.setUTCHours(23);
	date.setUTCMinutes(59);
	date.setUTCSeconds(0);

	return date.toISOString();
};

export const formatAllFieldValues = (
	fields: TFields,
	values: Record<string, string>,
	withTimezone: boolean = true,
): Record<string, TFieldFormattedValue> => {
	return Object.keys(fields).reduce(
		(acc: Record<string, TFieldFormattedValue>, key) => {
			switch (fields[key].type) {
				case 'boolean':
					acc[key] = isEmpty(values[key]) ? undefined : values[key] === 'true';
					break;
				case 'number': {
					const int = parseInt(values[key], 10);
					const float = parseFloat(values[key]);
					acc[key] = int < float ? float : int;
					break;
				}
				case 'date':
					acc[key] = parseDate(values[key], withTimezone);
					break;
				default:
					acc[key] = values[key];
			}
			return acc;
		},
		{},
	);
};

export const updateFields = (
	fields: TFields,
	values: PatientDTO | undefined,
): TFields => {
	return produce(fields, (draft: Record<string, any>) => {
		Object.keys(values ?? {}).forEach((key) => {
			if (draft[key as string]) {
				draft[key as string].value = values?.[key as keyof PatientDTO];
				return;
			}
		});
	});
};

export const updateTherapyFields = (
	fields: TFields,
	values: TherapyRowDTO | undefined,
): TFields => {
	return produce(fields, (draft: Record<string, any>) => {
		Object.keys(values ?? {}).forEach((key) => {
			if (draft[key as string]) {
				draft[key as string].value = values?.[key as keyof TherapyRowDTO];
				return;
			}
		});
	});
};

export const updateLabFields = (
	fields: TFields,
	values: LaboratoryDTO | undefined,
): TFields => {
	return produce(fields, (draft: Record<string, any>) => {
		Object.keys(values ?? {}).forEach((key) => {
			const value = values?.[key as keyof LaboratoryDTO];
			if (key === 'result') {
				draft[key as string].value = value;
				return;
			}
			if (draft[key as string]) {
				draft[key as string].value =
					typeof value === 'object'
						? ((value as ExamDTO)?.code ?? '')
						: moment(value).isValid()
							? parseDate(value as string)
							: value;
			}
		});
	});
};
export const updateFilterFields = (
	fields: TFields,
	values: any,
	withTimezone: boolean = true,
): TFields => {
	return produce(fields, (draft: Record<string, any>) => {
		Object.keys(values ?? {}).forEach((key) => {
			const value = values?.[key];
			if (key === 'status') {
				draft[key as string].value = value;
				return;
			}
			if (key === 'patientCode') {
				draft[key as string].value = value;
				return;
			}
			if (draft[key as string]) {
				draft[key as string].value = moment(value).isValid()
					? parseDate(value as string, withTimezone)
					: value;
				return;
			}
		});
	});
};
export const updateTriageFields = (
	fields: TFields,
	values: PatientExaminationDTO | undefined,
): TFields => {
	return produce(fields, (draft: Record<string, any>) => {
		Object.keys(values ?? {}).forEach((key) => {
			const value = values?.[key as keyof PatientExaminationDTO];
			if (
				['pex_diuresis_desc', 'pex_bowel_desc', 'pex_auscultation'].includes(
					key,
				)
			) {
				draft[key as string].value = ((value ?? '') as string).toLowerCase();
				return;
			}
			if (draft[key as string] && typeof value === 'number') {
				draft[key as string].value = value;
				return;
			}
			if (draft[key as string]) {
				draft[key as string].value = parseFloat(value as string)
					? value
					: moment(value).isValid()
						? parseDate(value as string)
						: value;
				return;
			}
		});
	});
};
export const updateOpdFields = (
	fields: TFields,
	values: OpdDTO | undefined,
) => {
	return produce(fields, (draft: Record<string, any>) => {
		Object.keys(values ?? {}).forEach((key) => {
			if (draft[key as string]) {
				const value = values?.[key as keyof OpdDTO];
				draft[key as string].value =
					typeof value === 'object'
						? ((value as DiseaseDTO)?.code ?? '')
						: moment(value).isValid()
							? parseDate(value as string)
							: value;
				return;
			}
		});
	});
};

export const updateVisitFields = (
	fields: TFields,
	values: VisitDTO | undefined,
) => {
	return produce(fields, (draft: Record<string, any>) => {
		Object.keys(values ?? {}).forEach((key) => {
			if (draft[key as string]) {
				const value = values?.[key as keyof VisitDTO];
				if (key === 'ward') {
					draft[key as string].value =
						(value as WardDTO)?.code?.toString() ?? '';
					return;
				}

				if (key === 'patient') {
					draft[key as string].value =
						(value as PatientDTO)?.code?.toString() ?? '';
					return;
				}

				if (key === 'duration') {
					draft[key as string].value = value ?? '';
					return;
				}

				draft[key as string].value =
					typeof value === 'object'
						? ((key === 'patient'
								? (value as PatientDTO)?.code?.toString()
								: (value as WardDTO)?.code?.toString()) ?? '')
						: typeof value === 'boolean'
							? value
							: moment(value).isValid()
								? parseDate(value as string)
								: value;
				return;
			}
		});
	});
};

export const updateOperationRowFields = (
	fields: TFields,
	values: OperationRowDTO | undefined,
) => {
	return produce(fields, (draft: Record<string, any>) => {
		Object.keys(values ?? {}).forEach((key) => {
			if (draft[key as string]) {
				const value = values?.[key as keyof OperationRowDTO];

				if (key === 'admission') {
					draft[key as string].value =
						(value as AdmissionDTO)?.id?.toString() ?? '';
					return;
				}

				if (key === 'transUnit') {
					draft[key as string].value = value;
					return;
				}

				draft[key as string].value =
					typeof value === 'object'
						? ((key === 'operation'
								? (value as OperationDTO)?.code?.toString()
								: (value as OpdDTO)?.code?.toString()) ?? '')
						: typeof value === 'boolean'
							? value
							: moment(value).isValid()
								? parseDate(value as string)
								: value;
				return;
			}
		});
	});
};

export const differenceInDays = (dateFrom: Date, dateTo: Date) => {
	return moment(dateTo)
		.startOf('day')
		.diff(moment(dateFrom).startOf('day'), 'days');
};

export const differenceInSeconds = (dateFrom: Date, dateTo: Date) => {
	return moment(dateTo).diff(moment(dateFrom), 'ms');
};

export const isFieldSuggested = (
	formCustomization: IFormCustomizationProps,
	fieldName: string,
) => {
	return formCustomization.suggestedFields.includes(fieldName);
};

export const getBirthDateAndAge = (
	ageType: TAgeFieldName,
	values: TAgeType,
	allAgeTypes?: AgeTypeDTO[] | undefined,
): { birthDate: string; age: number } => {
	let ageAndBirthDate: { birthDate: string; age: number };

	switch (ageType) {
		case 'agetype': {
			const selectedAgeType = allAgeTypes?.find(
				(at, _i) => at.code === values.agetype,
			);

			if (selectedAgeType !== undefined) {
				const averageAge = Math.round(
					selectedAgeType.from && selectedAgeType.to
						? (selectedAgeType.from + selectedAgeType.to) / 2
						: 0,
				);

				const birthDate = new Date();
				birthDate.setFullYear(birthDate.getFullYear() - averageAge);

				ageAndBirthDate = {
					birthDate: birthDate.toISOString(),
					age: averageAge,
				};
			} else {
				ageAndBirthDate = { birthDate: new Date().toISOString(), age: 0 };
			}
			break;
		}

		case 'birthDate': {
			const birthDate = values.birthDate
				? new Date(values.birthDate)
				: new Date();
			const timeDiff = Math.abs(Date.now() - birthDate.getTime());
			const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);

			ageAndBirthDate = { birthDate: birthDate.toISOString(), age: age };
			break;
		}

		case 'age': {
			const birthdate = new Date();
			birthdate.setFullYear(birthdate.getFullYear() - (values.age ?? 0));

			ageAndBirthDate = {
				birthDate: birthdate.toISOString(),
				age: values.age ?? 0,
			};
			break;
		}

		default:
			// return current date if unable to determine the selected age type
			ageAndBirthDate = { birthDate: new Date().toISOString(), age: 0 };
			break;
	}

	return ageAndBirthDate;
};
