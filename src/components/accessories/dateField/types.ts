import type { TextFieldProps } from '@mui/material';
import type { DateView } from '@mui/x-date-pickers';
import type React from 'react';
import type { ComponentType } from 'react';
import type { FIELD_VALIDATION } from '../../../types';

export interface IProps {
	fieldName: string;
	fieldValue: string;
	disableFuture?: boolean;
	disabled?: boolean;
	theme?: 'light' | 'regular';
	isValid: boolean;
	errorText: string;
	label: string;
	format: string;
	onChange: (value: Date | null) => void;
	onMonthChange?: (date: any) => void | Promise<void>;
	shouldDisableDate?: (date: any) => boolean;
	renderDay?: (
		day: any,
		selectedDate: any,
		dayInCurrentMonth: boolean,
		dayComponent: React.ReactElement,
	) => React.ReactElement;
	views?: DateView[];
	required?: FIELD_VALIDATION;
	TextFieldComponent?: ComponentType<TextFieldProps>;
	open?: boolean;
	okLabel?: string;
	cancelLabel?: string;
}
