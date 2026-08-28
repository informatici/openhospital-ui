import { useMediaQuery } from '@mui/material';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { type FunctionComponent, useEffect, useRef, useState } from 'react';
import { FIELD_VALIDATION } from '../../../types';
import './styles.scss';
import type { IProps } from './types';

const DateField: FunctionComponent<IProps> = ({
	fieldName,
	fieldValue,
	preserveDraftInput = false,
	disableFuture,
	disabled,
	label,
	theme,
	errorText,
	format,
	onChange,
	onMonthChange,
	shouldDisableDate,
	views,
	required = FIELD_VALIDATION.IDLE,
	open,
	TextFieldComponent,
}) => {
	const [value, setValue] = useState<Date | null>(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const anchorElRef = useRef(null);
	const skipNextExternalSync = useRef(false);
	const matches = useMediaQuery('(min-width:768px)');

	useEffect(() => {
		setAnchorEl(anchorElRef?.current);
	}, []);

	useEffect(() => {
		if (preserveDraftInput && skipNextExternalSync.current) {
			skipNextExternalSync.current = false;
			return;
		}

		// field value comes in timestamp string (eg. 2020-03-19T14:58:00.000Z)
		if (fieldValue === '') {
			setValue(null);
			return;
		}

		const externalValue = new Date(fieldValue);
		if (!Number.isNaN(externalValue.getTime())) {
			setValue(externalValue);
		}
	}, [fieldValue, preserveDraftInput]);

	const handleDateChange = (date: Date | null) => {
		// MUI fields keep an internal draft while the user edits date sections.
		// Do not feed the same intermediate value back through the external prop.
		skipNextExternalSync.current = preserveDraftInput;
		setValue(date);
		onChange(date);
	};

	const actualClassName = theme === 'light' ? 'dateField__light' : 'dateField';

	return (
		<div ref={anchorElRef}>
			{matches ? (
				<DesktopDatePicker
					enableAccessibleFieldDOMStructure={false}
					format={format}
					label={
						required === FIELD_VALIDATION.SUGGESTED ? `${label} **` : label
					}
					disabled={disabled}
					disableFuture={disableFuture}
					onChange={(date: any) => handleDateChange(date)}
					value={value}
					onMonthChange={onMonthChange}
					shouldDisableDate={shouldDisableDate}
					slots={{ textField: TextFieldComponent }}
					slotProps={{
						popper: {
							placement: 'bottom-end',
							anchorEl: anchorEl,
						},
						textField: {
							id: fieldName,
							error: Boolean(errorText),
							disabled,
							helperText: errorText,
							variant: 'outlined',
							margin: 'dense',
							required: required === FIELD_VALIDATION.REQUIRED,
							className: actualClassName,
						},
					}}
					views={views}
					open={open}
				/>
			) : (
				<MobileDatePicker
					enableAccessibleFieldDOMStructure={false}
					format={format}
					label={
						required === FIELD_VALIDATION.SUGGESTED ? `${label} **` : label
					}
					disabled={disabled}
					disableFuture={disableFuture}
					onChange={(date: any) => handleDateChange(date)}
					value={value}
					onMonthChange={onMonthChange}
					shouldDisableDate={shouldDisableDate}
					slots={{ textField: TextFieldComponent }}
					slotProps={{
						textField: {
							id: fieldName,
							error: Boolean(errorText),
							disabled,
							helperText: errorText,
							variant: 'outlined',
							margin: 'dense',
							required: required === FIELD_VALIDATION.REQUIRED,
							className: actualClassName,
						},
					}}
					views={views}
					open={open}
				/>
			)}
		</div>
	);
};

export default DateField;
