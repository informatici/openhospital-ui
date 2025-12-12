import { debounce } from '@mui/material';
import type React from 'react';
import { type FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/libraries/hooks/redux';
import type { PatientDTO } from '../../../generated';
import { searchPatient } from '../../../state/patients';
import './styles.scss';

import AutocompleteField from '../autocompleteField/AutocompleteField';
import PatientTeaserItem from './PatientTeaserItem';
import type { IProps, TValues } from './types';

const PatientAutocomplete: FC<IProps> = ({ onBlur, ...props }) => {
	const [value, setValue] = useState({} as PatientDTO | undefined);
	const [inputValue, setInputValue] = useState('');
	const dispatch = useAppDispatch();

	const getOptionSelected = (option: PatientDTO, v: PatientDTO) => {
		return option.code === v.code;
	};
	const patientSearchResults = useAppSelector(
		(state) => state.patients.searchResults.data ?? [],
	);

	const searchStatus = useAppSelector(
		(state) => state.patients.searchResults.status || 'IDLE',
	);
	const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		onBlur(e, value ?? undefined);
	};

	const onChange = (_e: object, val: PatientDTO | null) => {
		setValue(val ?? undefined);
	};

	useEffect(() => {
		dispatch(
			searchPatient({
				firstName: inputValue,
			} as TValues),
		);
	}, [dispatch, inputValue]);

	const handleOnInputChange = (_event: any, value: string) => {
		if (value === '') setValue(undefined);
		debounce(() => {
			setInputValue(value);
		}, 250);
	};

	const getOptionLabel = (option: PatientDTO | undefined) => {
		return option?.firstName ?? '';
	};

	const optionsComparator = (patient: PatientDTO, val: string | number) => {
		return patient.code === +val;
	};

	return (
		<AutocompleteField
			{...props}
			id="parent_element"
			loading={searchStatus === 'LOADING'}
			options={patientSearchResults}
			onInputChange={handleOnInputChange}
			onBlur={handleOnBlur}
			getOptionLabel={getOptionLabel}
			getOptionSelected={getOptionSelected}
			renderOption={PatientTeaserItem}
			onChange={onChange}
			optionsComparator={optionsComparator}
		/>
	);
};

export default PatientAutocomplete;
