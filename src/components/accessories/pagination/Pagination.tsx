import {
	Pagination as MaterialPagination,
	type PaginationProps,
} from '@mui/material';
import type { FunctionComponent } from 'react';
import './styles.scss';

const Pagination: FunctionComponent<PaginationProps> = ({
	...paginationProps
}) => {
	return (
		<div className={'pagination'}>
			<MaterialPagination {...paginationProps} />
		</div>
	);
};

export default Pagination;
