import type { PatientDTO } from '../../../generated';
import type { IForm } from '../../../libraries/formDataHandling/types';

interface IOwnProps {
	profilePicture?: any;
	shouldResetForm: boolean;
	resetFormCallback: () => void;
	mode: 'create' | 'edit';
	/** When the edited patient is anonymized (GDPR erasure) the personal-data fields are read-only. */
	anonymized?: boolean;
}

export type TAgeFieldName = 'age' | 'agetype' | 'birthDate';

export type TProps = IForm<TPatientDataFormFieldName, PatientDTO> & IOwnProps;

export type TAgeType = {
	age?: number;
	agetype?: string;
	birthDate?: string;
};

export type TPatientDataFormFieldName =
	| 'firstName'
	| 'secondName'
	| 'birthDate'
	| 'age'
	| 'agetype'
	| 'sex'
	| 'address'
	| 'city'
	| 'telephone'
	| 'note'
	| 'motherName'
	| 'mother'
	| 'fatherName'
	| 'father'
	| 'bloodType'
	| 'hasInsurance'
	| 'parentTogether'
	| 'taxCode'
	| 'blobPhoto';
