import {
	Pagination as MaterialPagination,
	type PaginationProps,
} from '@mui/lab';
import React, { type FunctionComponent } from 'react';
import './styles.scss';
import type { IProps } from './types';

const Pagination: FunctionComponent<IProps & PaginationProps> = ({
	...paginationProps
}) => {
	return (
		<div className={'pagination'}>
			<MaterialPagination {...paginationProps} />
		</div>
	);
};

export default Pagination;
