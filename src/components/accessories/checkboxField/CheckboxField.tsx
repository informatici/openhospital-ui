import { Checkbox, FormControlLabel } from '@mui/material';
import { type FunctionComponent, useEffect, useState } from 'react';
import './styles.scss';
import type { IProps } from './types';

const CheckboxField: FunctionComponent<IProps> = ({
	fieldName,
	checked,
	disabled,
	label,
	onChange,
	indeterminate,
}) => {
	const [value, setValue] = useState<boolean>(false);

	useEffect(() => {
		setValue(checked);
	}, [checked]);

	const handleChange = (_event: any, value: boolean) => {
		onChange(value);
		setValue(value);
	};

	return (
		<FormControlLabel
			control={
				<Checkbox
					disabled={disabled}
					checked={value}
					onChange={handleChange}
					name={fieldName}
					indeterminate={indeterminate}
				/>
			}
			label={label}
		/>
	);
};

export default CheckboxField;
