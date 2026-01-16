import type { DateRange } from '@mui/lab/DateRangePicker';
import type { TextFieldProps } from '@mui/material';
import type React from 'react';
import type { ComponentType } from 'react';
import type { FIELD_VALIDATION } from '../../../types';

export interface IProps {
	fieldName?: string;
	fieldValue: DateRange<Date>;
	disableFuture?: boolean;
	disabled?: boolean;
	theme?: 'light' | 'regular';
	isValid: boolean;
	startErrorText?: string;
	endErrorText?: string;
	startLabel?: string;
	endLabel?: string;
	format: string;
	onClose: () => void;
	onChange: (value: DateRange<Date>) => void;
	shouldDisableDate?: (date: any) => boolean;
	renderDay?: (
		day: any,
		selectedDate: any,
		dayInCurrentMonth: boolean,
		dayComponent: React.ReactElement,
	) => React.ReactElement;
	required?: FIELD_VALIDATION;
	TextFieldComponent?: ComponentType<TextFieldProps>;
	open?: boolean;
	okLabel?: string;
	cancelLabel?: string;
	allowSameDateSelection?: boolean;
	calendars?: 1 | 2 | 3;
}
