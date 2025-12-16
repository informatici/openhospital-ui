import type { RefObject } from 'react';
import type { CommonPropTypes } from 'react-csv/components/CommonPropTypes';

export interface IOwnProps {
	csvData: string | CommonPropTypes['data'];
	graphRef: RefObject<any>;
	title?: string;
}
